import { createEventSchema, deleteEventSchema, updateEventSchema } from "@/lib/validation/events";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db";
import { getEmbedding } from "@/lib/openai";
import { notesIndex } from "@/lib/pinecone";

export async function POST(req:Request) {
    try{
        const body = await req.json();
        const result = createEventSchema.safeParse(body); //our own error
        if(!result.success){
            console.error(result.error);
            return Response.json({error: "Invalid input"}, {status: 400})
        }
        const {title, description, datetime, duration, painLevel} = result.data;
        const {userId} = auth();
        if(!userId) return Response.json({error:"Unauthorized"}, {status: 401});
        
        const embedding = await getEmbeddingForNote(title, description);
        
        const event = await prisma.$transaction(async (tx) => {
        const note = await tx.event.create({
          data: {
            title,
            duration,
            datetime,
            painLevel,
            description,
            userId,
          },
        });

        await notesIndex.upsert([
          {
            id: note.id,
            values: embedding,
            metadata: { userId },
          },
        ]);

          return note;
        });
        return Response.json({event},{status:201});
    } catch(error){
        console.error(error);
        return Response.json({error:"Internal server error"}, {status:500})
    }
}

export async function PUT(req: Request) {
    try {
      const body = await req.json();
  
      const parseResult = updateEventSchema.safeParse(body);
  
      if (!parseResult.success) {
        console.error(parseResult.error);
        return Response.json({ error: "Invalid input" }, { status: 400 });
      }
  
      const { id, title, description } = parseResult.data;
  
      const note = await prisma.event.findUnique({ where: { id } });
  
      if (!note) {
        return Response.json({ error: "Note not found" }, { status: 404 });
      }
  
      const { userId } = auth();
  
      if (!userId || userId !== note.userId) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      const embedding = await getEmbeddingForNote(title, description);
  
      const updatedNote = await prisma.$transaction(async (tx) => {
        const updatedNote = await tx.event.update({
          where: { id },
          data: {
            title,
            description,
          },
        });
  
        await notesIndex.upsert([
          {
            id,
            values: embedding,
            metadata: { userId },
          },
        ]);
  
        return updatedNote;
      });
  
      return Response.json({ updatedNote }, { status: 200 });
    } catch (error) {
      console.error(error);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  }
  
  export async function DELETE(req: Request) {
    try {
      const body = await req.json();
  
      const parseResult = deleteEventSchema.safeParse(body);
  
      if (!parseResult.success) {
        console.error(parseResult.error);
        return Response.json({ error: "Invalid input" }, { status: 400 });
      }
  
      const { id } = parseResult.data;
  
      const note = await prisma.event.findUnique({ where: { id } });
  
      if (!note) {
        return Response.json({ error: "Event not found" }, { status: 404 });
      }
  
      const { userId } = auth();
  
      if (!userId || userId !== note.userId) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      await prisma.$transaction(async (tx) => {
        await tx.event.delete({ where: { id } });
        await notesIndex.deleteOne(id);
      });
  
      return Response.json({ message: "Event deleted" }, { status: 200 });
    } catch (error) {
      console.error(error);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  }
  
  async function getEmbeddingForNote(title: string, content: string | undefined) {
    return getEmbedding(title + "\n\n" + content ?? "");
  }
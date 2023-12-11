import { notesIndex } from "@/lib/pinecone";
import prisma from "@/lib/db";
import openai, { getEmbedding } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    const messagesTruncated = messages.slice(-6);

    const embedding = await getEmbedding(
      messagesTruncated.map((message) => message.content).join("\n"),
    );

    const { userId } = auth();

    const vectorQueryResponse = await notesIndex.query({
      vector: embedding,
      topK: 4,
      filter: { userId },
    });

    const relevantLogs = await prisma.event.findMany({
      where: {
        id: {
          in: vectorQueryResponse.matches.map((match) => match.id),
        },
      },
    });

    console.log("Relevant Crisis Logs were found: ", relevantLogs);

    const systemMessage: ChatCompletionMessage = {
      role: "assistant",
      content:
        "You are an intelligent health assistant app. You always answer the user's question based on their title of crisis, date and day of crisis, duration of pain, pain level and description. " +
        "The relevant notes for this query are:\n" +
        relevantLogs
          .map((event) => `Title about the crisis: ${event.title}\nDate of the crisis: ${event.dateit}\nTime or Part of the Day for crisis: ${event.timeit}\nDuration of discomfort: ${event.duration}\nPain Level: ${event.painLevel}\n\nDescription:\n${event.description}`)
          .join("\n\n"),
    };

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...messagesTruncated],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
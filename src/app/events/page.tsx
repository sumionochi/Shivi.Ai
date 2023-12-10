import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import React from 'react'
import prisma from "@/lib/db";
import Events from '@/components/Events'
import AIChatButton from "@/components/AIChatButton";
import Calendar from "@/components/Calender";

export const metadata: Metadata = {
  title: 'Shivi.Ai - Events'
}

type Props = {}

const EventsPage = async (props: Props) => {
  const {userId} = auth();
  if(!userId) throw Error("userId undefined");
  const Everyevent = await prisma.event.findMany({where:{userId}});

  return (
    <div className="flex flex-col max-w-6xl mx-auto mt-10 gap-8 p-4">
      <Calendar Everyevent={Everyevent}/>
      <AIChatButton/>
      {Everyevent.map((note) => (
        <Events note={note} key={note.id} />
      ))}
      
      {Everyevent.length === 0 && (
        <div className="col-span-full text-center">
          {"Let's start tracking down your crisis."}
        </div>
      )}
    </div>
  )
}

export default EventsPage
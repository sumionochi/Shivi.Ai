import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import React from 'react'
import prisma from "@/lib/db";
import Events from '@/components/Events'

export const metadata: Metadata = {
  title: 'Shivi.Ai - Events'
}

type Props = {}

const EventsPage = async (props: Props) => {
  const {userId} = auth();
  if(!userId) throw Error("userId undefined");
  const Everyevent = await prisma.event.findMany({where:{userId}});

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
"use client";

import { Event } from "@prisma/client";
import { useState } from "react";
import AddEvent from "./AddEvent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface NoteProps {
  note: Event;
}

export default function Note({ note }: NoteProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const wasUpdated = note.updateAt > note.createdAt;

  const createdUpdatedAtTimestamp = (
    wasUpdated ? note.updateAt : note.createdAt
  ).toDateString();

  return (
    <>
      <Card
        className="cursor-pointer bg-secondary transition-shadow hover:shadow-lg"
        onClick={() => setShowEditDialog(true)}
      >
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>
            {createdUpdatedAtTimestamp}
            {wasUpdated && " (updated)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{note.description}</p>
        </CardContent>
      </Card>
      <AddEvent
        open={showEditDialog}
        setOpen={setShowEditDialog}
        toEdit={note}
      />
    </>
  );
}
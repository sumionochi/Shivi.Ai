"use client";
import React from "react";
import dayjs from "dayjs";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import prisma from "@/lib/db";

interface Props {
	Everyevent: {
		id: string;
		title: string;
		dateit: string;
		timeit: string;
		duration: string;
		painLevel: string;
		description: string | null;
		userId: string;
		createdAt: Date;
		updateAt: Date;
	  }[];
}

export default function Calendar({ Everyevent }: Props) {

	function getDateInYear(year = dayjs().year(), month = dayjs().month()) {
		const startDate = dayjs().year(year).month(month).date(1).startOf('years');
		const endDate = dayjs().year(year).month(month).date(1).endOf("years");
        console.log(startDate, endDate);
		const datesArray = [];

		for (let currentDay = startDate.clone(); currentDay.isBefore(endDate) || currentDay.isSame(endDate); currentDay = currentDay.add(1, 'day')) {
            datesArray.push(currentDay.format("YYYY-MM-DD"));
        }
		return datesArray;
	}

	const getColor = (value: number) => {
		if (value === 0) {
			return "bg-gray-300";
		} else if (value < 5) {
			return "bg-green-100";
		} else if (value < 8) {
			return "bg-green-300";
		} else {
			return "bg-green-500";
		}
	};

	const dur = (value: number) => {
		if (value === 0) {
			return "No";
		} else if (value < 20) {
			return "Slight";
		} else if (value < 40) {
			return "";
		} else {
			return "bg-green-500";
		}
	}

	return (
		<div className="bg-secondary rounded-lg p-6 text-center space-y-4">
			<h1 className="text-4xl font-bold">Crisis Map</h1>
			<div className="flex flex-wrap gap-1 justify-center rounded-md">
			{getDateInYear().map((day, index) => {
          const matchingEvent = Everyevent.find((event) => event.dateit === day);
          const value = matchingEvent ? parseFloat(matchingEvent.painLevel) : 0;
          return (
            <HoverCard key={index}>
              <HoverCardTrigger className="">
                <div
                  className={cn(
                    "h-4 w-4 rounded-sm cursor-pointer",
                    getColor(value || 0)
                  )}
                ></div>
              </HoverCardTrigger>
              <HoverCardContent className="flex text-sm text-start flex-col">
				<p className="font-semibold">{matchingEvent?.title}</p>
				<p>Pain Level was {value || 0} on {day}</p>
				<p>Duration of Discomfort</p>
              </HoverCardContent>
            </HoverCard>
          );
        	})}
			</div>
		</div>
	);
}
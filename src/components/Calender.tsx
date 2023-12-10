"use client";
import React from "react";
import dayjs from "dayjs";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

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
			return 'bg-gray-300';
		} else if (value < 5) {
			return "bg-gradient-to-br from-violet-300 to-orange-300";
		} else if (value < 8) {
			return "bg-gradient-to-br from-violet-400 to-orange-500";
		} else {
			return "bg-gradient-to-br from-violet-700 to-orange-500";
		}
	};

	const pain = (value: number) => {
		if (value === 0) {
			return "Low";
		} else if (value < 5) {
			return "Mild";
		} else if (value < 8) {
			return "High";
		} else {
			return "Chronic";
		}
	}

	const dur = (value: number) => {
		if (value === 0) {
			return "Little";
		} 
		else if (value < 20) {
			return "Little";
		} 
		else if (value < 50) {
			return "Mild";
		}
		else if (value < 80) {
			return "A Lot";
		} 
		else {
			return "To Much";
		}
	}

	const daypartfun = (value: number) => {
		if (value >= 0 && value < 7) {
			return "Midnight";
		} 
		else if (value >= 7 && value < 12) {
			return "Early Morning";
		} 
		else if (value >= 12 && value < 17) {
			return "Afternoon";
		}
		else if (value >= 17 && value < 20) {
			return "Evening";
		} 
		else {
			return "Night";
		}
	}

	return (
		<div className="bg-secondary rounded-lg p-6 text-center space-y-4">
			<h1 className="text-4xl font-bold">Crisis Map Of {dayjs().year()}</h1>
			<div className="flex flex-wrap gap-1 justify-center rounded-md">
			{getDateInYear().map((day, index) => {
          const matchingEvent = Everyevent.find((event) => event.dateit === day);
          const value = matchingEvent ? parseFloat(matchingEvent.painLevel) : 0;
		  const durtime = matchingEvent ? parseFloat(matchingEvent.duration) : 0;	
		  const daypart = matchingEvent ? parseFloat(matchingEvent.timeit) : 0;	
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
				{matchingEvent && 
				<div>
					<p className="font-semibold">{matchingEvent?.title}</p>
					<p>On <span className="font-semibold">{day}</span></p>
					<p>At <span className="font-semibold">{matchingEvent?.timeit} {daypartfun(daypart)}</span></p>
					<p>Pain Level was <span className="font-semibold">{pain(value)}</span></p>
					<p>Duration of Discomfort was <span className="font-semibold">{dur(durtime)}</span> for <span className="font-semibold">{durtime}hr</span></p>	
				</div>}
				{!matchingEvent && 
				<div>
					<p className="">No Crisis was Logged.</p>
					<p>On <span className="font-semibold">{day}</span></p>	
				</div>}
              </HoverCardContent>
            </HoverCard>
          );
        	})}
			</div>
		</div>
	);
}
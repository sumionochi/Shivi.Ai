'use client'
import React from 'react'
import { Card } from './ui/card'
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar} from 'recharts'

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

const IssueChart = ({Everyevent}: Props) => {
    const totalDuration = Everyevent.reduce((sum, event) => sum + parseInt(event.duration, 10), 0);
  const totalPain = Everyevent.reduce((sum, event) => sum + parseInt(event.painLevel, 10), 0);
  const numoflogs = Everyevent.length;

  const avgDuration = numoflogs > 0 ? totalDuration / numoflogs : 0;
  const avgPain = numoflogs > 0 ? totalPain / numoflogs : 0;

  const data = [
    { label: 'Crisis Logs', value: numoflogs },
    { label: 'Avg Duration', value: avgDuration },
    { label: 'Avg Pain', value: avgPain },
  ];
    return (
    <Card className='w-full p-4 pt-10 pr-10'>
        <ResponsiveContainer width={'100%'} height={300}>
            <BarChart data={data}>
                <XAxis dataKey={"label"}/>
                <YAxis/>
                <Bar fill="#8884d8" dataKey={'value'} barSize={100}/>
            </BarChart>
        </ResponsiveContainer>
    </Card>
    )
}

export default IssueChart
"use client"
import {CreateEventSchema, createEventSchema } from '@/lib/validation/events'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { Dialog,DialogTitle, DialogContent, DialogFooter, DialogHeader } from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { Event } from '@prisma/client'
import LoadingButton from './ui/loading-btn'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from './ui/calendar'
import { format } from "date-fns"
import { Slider } from './ui/slider'

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void,
    toEdit?: Event, 
}

const AddEvent = ({open, setOpen, toEdit}: Props) => {
    const [deleteInProgress, setDeleteInProgress] = useState(false);

    const router = useRouter();
    const form = useForm<CreateEventSchema>({
        resolver: zodResolver(createEventSchema),
        defaultValues: {
            title: toEdit?.title || "",
            dateit: toEdit?.dateit || "",
            timeit: toEdit?.timeit || "",
            duration: toEdit?.duration || "",
            painLevel: toEdit?.painLevel || "",
            description: toEdit?.description || "",
        },
    });   
    async function onSubmit(input:CreateEventSchema) {
        try{
            if (toEdit) {
                const response = await fetch("/api/events", {
                  method: "PUT",
                  body: JSON.stringify({
                    id: toEdit.id,
                    ...input,
                  }),
                });
                if (!response.ok) throw Error("Status code: " + response.status);
              } else {
                const response = await fetch("/api/events", {
                  method: "POST",
                  body: JSON.stringify(input),
                });
                if (!response.ok) throw Error("Status code: " + response.status);
                form.reset();
              }
        router.refresh();
        setOpen(false);
        } catch (error){
            console.error(error);
            alert("Something went wrong, Please try again.");
        }
    }
    async function deleteEvent() {
        if (!toEdit) return;
        setDeleteInProgress(true);
        try {
          const response = await fetch("/api/events", {
            method: "DELETE",
            body: JSON.stringify({
              id: toEdit.id,
            }),
          });
          if (!response.ok) throw Error("Status code: " + response.status);
          router.refresh();
          setOpen(false);
        } catch (error) {
          console.error(error);
          alert("Something went wrong. Please try again.");
        } finally {
          setDeleteInProgress(false);
        }
      }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader><DialogTitle>{toEdit ? "Edit Event" : "Add Event"}</DialogTitle></DialogHeader>
                <Form {...form}>
                    <form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} name='title' render={({field})=>(
                            <FormItem>
                                <FormLabel>Title of Crisis</FormLabel>
                                <FormControl><Input placeholder='Panic Attack' {...field}/></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name='dateit' render={({field})=>(
                            <FormItem className='flex flex-col gap-0'>
                                <FormLabel>Date of Crisis</FormLabel>
                                <FormControl>
                                    <Input placeholder='Event Title' type="date" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name='timeit' render={({field})=>(
                            <FormItem className='flex flex-col gap-0'>
                                <FormLabel>Part of the Day when crisis occurred</FormLabel>
                                <FormControl>
                                    <Input placeholder='Event Title' type="time" className='' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name='duration' render={({field})=>(
                        <FormItem>
                            <FormLabel>Duration of Discomfort (1 - 100hrs)</FormLabel>
                            <FormControl>
                            <Input placeholder='In hrs approx' type="range" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        )}/>
                        <FormField control={form.control} name='painLevel' render={({field})=>(
                            <FormItem>
                                <FormLabel>Pain Levels (1 - 10)</FormLabel>
                                <FormControl>
                                <Input placeholder='Between 1 - 10' min={1} max={10} type="range" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        {/* <FormField control={form.control} name='symptom' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Symptoms</FormLabel>
                            <FormControl>
                                {health.symptomes.map((symptom, index) => (
                                    <label key={index} className='flex items-center space-x-2'>
                                        <Input
                                            type='checkbox'
                                            value={symptom}
                                            onChange={(e) => {
                                                const selectedSymptoms = e.target.checked
                                                    ? [...(field.value ?? []), e.target.value]
                                                    : field.value?.filter((s) => s !== e.target.value);
                                                field.onChange(selectedSymptoms);
                                            }}
                                            checked={field.value?.includes(symptom)}
                                        />
                                        <span>{symptom}</span>
                                    </label>
                                ))}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={form.control} name='location' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Locations</FormLabel>
                            <FormControl>
                                {health.locations.map((location, index) => (
                                    <label key={index} className='flex items-center space-x-2'>
                                        <input
                                            type='checkbox'
                                            value={location}
                                            onChange={(e) => {
                                                const selectedLocations = e.target.checked
                                                    ? [...(field.value ?? []), e.target.value]
                                                    : field.value?.filter((l) => l !== e.target.value);
                                                field.onChange(selectedLocations);
                                            }}
                                            checked={field.value?.includes(location)}
                                        />
                                        <span>{location}</span>
                                    </label>
                                ))}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={form.control} name='medication' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Medications</FormLabel>
                            <FormControl>
                                {health.medications.map((medication, index) => (
                                    <label key={index} className='flex items-center space-x-2'>
                                        <input
                                            type='checkbox'
                                            value={medication}
                                            onChange={(e) => {
                                                const selectedMedications = e.target.checked
                                                    ? [...(field.value ?? []), e.target.value]
                                                    : field.value?.filter((m) => m !== e.target.value);
                                                field.onChange(selectedMedications);
                                            }}
                                            checked={field.value?.includes(medication)}
                                        />
                                        <span>{medication}</span>
                                    </label>
                                ))}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )} /> */}
                        <FormField control={form.control} name='description' render={({field})=>(
                            <FormItem>
                                <FormLabel>Elaborate on the Crisis</FormLabel>
                                <FormControl><Textarea placeholder='It was mild' {...field}/></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <DialogFooter className='w-full gap-1 sm:gap-0'>
                            {toEdit && (<LoadingButton className='p-5 shadow-md shadow-black border-none bg-gradient-to-r text-white rounded-xl from-rose-700 to-pink-600'
                                            loading={deleteInProgress}
                                            disabled={form.formState.isSubmitting}
                                            onClick={deleteEvent}
                                            type="button">Delete Event</LoadingButton>)}
                            <Button className='p-5 shadow-md shadow-black border-none bg-gradient-to-br from-violet-500 to-orange-300 text-white rounded-xl' type='submit'>
                                {form.formState.isSubmitting && <Loader2 className='w-4 h-4 animate-spin mr-2'/>}
                                Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddEvent
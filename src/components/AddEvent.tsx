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
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from './ui/calendar'
import { format, parse } from "date-fns"
import { Slider } from './ui/slider'
import health from '../../health'
import { Event } from '@prisma/client'
import LoadingButton from './ui/loading-btn'

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
          const response = await fetch("/api/notes", {
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
                                <FormLabel>Event Title</FormLabel>
                                <FormControl><Input placeholder='Event Title' {...field}/></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        {/* <FormField control={form.control} name='datetime' render={({field})=>(
                            <FormItem className='flex flex-col gap-0'>
                                <FormLabel>Pick A Date</FormLabel>
                                <FormControl>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(selectedDate) => {
                                            if (selectedDate) {
                                                field.onChange((selectedDate));
                                            }
                                        }}
                                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/> */}
                        {/* <FormField control={form.control} name='duration' render={({field})=>(
                        <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                                <Slider
                                    value={field.value}  // Use the field value directly
                                    onChange={(newValue) => field.onChange([newValue])}  // Wrap the value in an array
                                    name='Duration'
                                    defaultValue={[33]}  // Provide as an array
                                    max={100}
                                    step={1}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        )}/>
                        <FormField control={form.control} name='pain' render={({field})=>(
                            <FormItem>
                                <FormLabel>Pain Levels</FormLabel>
                                <FormControl>
                                    <Slider
                                        value={field.value}  // Use the field value directly
                                        onChange={(newValue) => field.onChange([newValue])}  // Wrap the value in an array
                                        name='Pain Level'
                                        defaultValue={[33]}  // Provide as an array
                                        max={100}
                                        step={1}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/> */}
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
                                <FormLabel>Event Description</FormLabel>
                                <FormControl><Textarea placeholder='Event Title' {...field}/></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <DialogFooter className='w-full gap-1 sm:gap-0'>
                            {toEdit && (<LoadingButton variant="destructive"
                                            loading={deleteInProgress}
                                            disabled={form.formState.isSubmitting}
                                            onClick={deleteEvent}
                                            type="button">Delete Event</LoadingButton>)}
                            <Button className='w-full space-x-2' type='submit'>
                                {form.formState.isSubmitting && <Loader2 className='w-5 h-5 animate-spin'/>}
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
"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Star, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import React from "react";
import { use } from "react";
import Navbar from "@/components/ui/navbar";
import {coachDetails} from "@/app/user/explore/coachDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CoachDetailsPage(props: PageProps) {
  const { id } = use(props.params);
  const coachId = parseInt(id);
  const coach: any = coachDetails.find((c) => c.id === coachId);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );
  const [selectedTime, setSelectedTime] = React.useState("");

  const feedbacks = [
    {
      name: "Guy Hawkins",
      rating: 4.5,
      comment:
        "Robert helped me transform my scattered learning into a focused roadmap. His guidance on portfolio projects and resume strategy landed me multiple interviews within weeks!",
    },
    {
      name: "Dianne Russell",
      rating: 4.5,
      comment:
        "As someone transitioning from marketing into data analytics, I was overwhelmed. Robert's clear explanations and step-by-step career plan made the whole process feel achievable.",
    },
    {
      name: "Bessie Cooper",
      rating: 4.5,
      comment:
        "Robert’s mock interviews were a game-changer. His feedback was specific, constructive, and exactly what I needed to feel confident during the real thing.",
    },
    {
      name: "Eleanor Pena",
      rating: 4.5,
      comment:
        "He doesn’t just teach tools—he teaches how to think like a data professional. I finally understood how to approach real-world problems and communicate insights effectively.",
    },
    {
      name: "Ralph Edwards",
      rating: 4.5,
      comment:
        "Robert’s support helped me go from a junior data analyst to a data scientist in under a year. His career advice and industry knowledge are unmatched.",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar currentPage="coaches" />

      <div className="p-10 pl-36 pr-36">
        <div className="flex flex-row justify-between">
          <div>
            <p className="text-blue-300 text-7xl font-medium">{coach?.name}</p>
            <p className="text-white text-3xl font-bold">{coach?.expertise}</p>
            <div className="flex flex-row justify-items-start gap-44 pt-10">
              <div className="flex items-center justify-between align-middle gap-2">
                <Star className="h-3 w-3 text-yellow-400 mr-1" />
                <p className="text-white text-lg font-bold">{coach?.rating}</p>
              </div>
              <div className="flex items-center justify-between align-middle gap-2">
                <Users className="h-3 w-3 text-blue-400" />
                <p className="text-white text-lg font-bold">
                  {coach?.student_count} students
                </p>
              </div>
            </div>
            <div className="pt-10 w-96">
              <p className="text-white text-sm font-medium">
                {coach?.description}
              </p>
            </div>
          </div>
          <div>
            <Image
              src={coach?.profile_pic}
              width={500}
              height={500}
              alt="Coach profile"
              className=" object-cover rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 bg-white/5 rounded-lg p-6">
        <h2 className="text-white text-2xl font-semibold mb-4">
          Student Feedback
        </h2>
        {feedbacks.map((feedback, index) => (
          <div key={index}>
            <div className="text-white space-y-1">
              <p className="font-semibold">{feedback.name}</p>
              <div className="flex items-center justify-normal align-middle gap-2">
                <Star className="h-3 w-3 text-yellow-400 mr-1 align-middle" />
                <p className="text-white text-sm font-bold align-middle">
                  {feedback.rating}
                </p>
              </div>
              <p className="text-sm text-gray-300">{feedback.comment}</p>
            </div>
            {index !== feedbacks.length - 1 && (
              <Separator className="my-4 bg-gray-600" />
            )}
          </div>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Book Now
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book a Session with {coach?.name}</DialogTitle>
            <DialogDescription>
              Choose your preferred date and time. We’ll confirm the booking
              shortly.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex flex-row justify-between pl-20 pr-20">
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center justify-start w-auto  rounded-md text-left text-sm bg-white shadow-sm">
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="bg-slate-400"
                />
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-start w-auto  rounded-md text-left text-sm bg-white shadow-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  {selectedTime ? selectedTime : <span>Pick a time slot</span>}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-auto bg-purple-900">
                {["2.00PM", "4.00PM", "6.00PM", "8.00PM"].map((option) => (
                  <React.Fragment key={option}>
                    <DropdownMenuItem
                      onSelect={() => setSelectedTime(option)}
                      className="flex h-10 w-72 items-center rounded-md px-3 py-2 text-base text-foreground bg-slate-50 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                    >
                      {option}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

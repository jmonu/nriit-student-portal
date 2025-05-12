
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CalendarEvent {
  id: number;
  date: Date;
  title: string;
  type: 'academic' | 'exam' | 'holiday' | 'event';
  description?: string;
}

// Sample calendar events
const calendarEvents: CalendarEvent[] = [
  {
    id: 1,
    date: new Date(2023, 4, 10), // May 10, 2023
    title: 'Semester Exams Begin',
    type: 'exam',
    description: 'Final examinations for the Even Semester 2022-23 begin today.'
  },
  {
    id: 2,
    date: new Date(2023, 4, 15), // May 15, 2023
    title: 'Technical Symposium',
    type: 'event',
    description: 'Annual Technical Symposium - TechNova 2023 at Main Auditorium from 9:00 AM onwards.'
  },
  {
    id: 3,
    date: new Date(2023, 4, 20), // May 20, 2023
    title: 'Cultural Fest',
    type: 'event',
    description: 'Rhythm 2023 - Annual Cultural Festival at College Grounds.'
  },
  {
    id: 4,
    date: new Date(2023, 4, 25), // May 25, 2023
    title: 'AI/ML Workshop',
    type: 'academic',
    description: 'Workshop on Artificial Intelligence & Machine Learning conducted by Google experts.'
  },
  {
    id: 5,
    date: new Date(2023, 4, 30), // May 30, 2023
    title: 'Semester Exams End',
    type: 'exam',
    description: 'Final day of Even Semester 2022-23 examinations.'
  },
  {
    id: 6,
    date: new Date(2023, 5, 1), // June 1, 2023
    title: 'Sports Meet',
    type: 'event',
    description: 'Annual Sports Meet 2023 at College Sports Complex.'
  },
  {
    id: 7,
    date: new Date(2023, 5, 5), // June 5, 2023
    title: 'World Environment Day',
    type: 'event',
    description: 'Special activities planned for World Environment Day including tree plantation drive.'
  },
  {
    id: 8,
    date: new Date(2023, 5, 10), // June 10, 2023
    title: 'Alumni Meet',
    type: 'event',
    description: 'Annual Alumni Meet 2023 at Main Auditorium from 5:00 PM onwards.'
  },
  {
    id: 9,
    date: new Date(2023, 5, 15), // June 15, 2023
    title: 'Career Fair',
    type: 'academic',
    description: 'Annual Career Fair with over 50 companies participating.'
  },
  {
    id: 10,
    date: new Date(2023, 5, 20), // June 20, 2023
    title: 'Summer Vacation Begins',
    type: 'holiday',
    description: 'Summer vacation for all students begins. Campus will remain open for administrative work.'
  },
  {
    id: 11,
    date: new Date(2023, 6, 15), // July 15, 2023
    title: 'Faculty Development Program',
    type: 'academic',
    description: 'Week-long Faculty Development Program on "Innovative Teaching Methods".'
  },
  {
    id: 12,
    date: new Date(2023, 7, 1), // August 1, 2023
    title: 'New Academic Session Begins',
    type: 'academic',
    description: 'Classes for the Odd Semester 2023-24 begin for all students.'
  },
  {
    id: 13,
    date: new Date(2023, 7, 15), // August 15, 2023
    title: 'Independence Day',
    type: 'holiday',
    description: 'Independence Day celebrations at college grounds. Flag hoisting at 9:00 AM.'
  }
];

const CalendarListPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(getEventsForDate(new Date()));
  
  // Function to get events for a specific date
  function getEventsForDate(selectedDate: Date): CalendarEvent[] {
    return calendarEvents.filter(event => 
      event.date.getDate() === selectedDate.getDate() && 
      event.date.getMonth() === selectedDate.getMonth() && 
      event.date.getFullYear() === selectedDate.getFullYear()
    );
  }
  
  // Function to check if a date has events
  function dateHasEvents(day: Date) {
    return calendarEvents.some(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear()
    );
  }
  
  // Function to handle date change
  function handleDateChange(newDate: Date | undefined) {
    if (newDate) {
      setDate(newDate);
      setEvents(getEventsForDate(newDate));
    }
  }
  
  // Get badge color based on event type
  function getBadgeColorForEventType(type: string) {
    switch (type) {
      case 'academic':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'exam':
        return 'bg-red-500 hover:bg-red-600';
      case 'holiday':
        return 'bg-green-500 hover:bg-green-600';
      case 'event':
        return 'bg-purple-500 hover:bg-purple-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Academic Calendar</h1>
        
        <div className="max-w-6xl mx-auto mb-8 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            Stay updated with important dates, events, exams, and holidays throughout the academic year.
            Plan your activities and never miss an important event!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calendar Widget */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Click on a date to view scheduled events</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  className="rounded-md border"
                  modifiers={{
                    hasEvents: (day) => dateHasEvents(day),
                  }}
                  modifiersStyles={{
                    hasEvents: { 
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                      color: '#4f46e5'
                    }
                  }}
                />
              </CardContent>
              <CardFooter>
                <div className="w-full flex flex-wrap gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-xs">Academic</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="text-xs">Exam</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-xs">Holiday</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                    <span className="text-xs">Event</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          {/* Events List */}
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Events for {date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardTitle>
              </CardHeader>
              <CardContent>
                {events.length > 0 ? (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <Badge className={getBadgeColorForEventType(event.type)}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </div>
                        {event.description && (
                          <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No events scheduled for this date.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Upcoming Important Dates</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Event</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {calendarEvents
                  .filter(event => event.date >= new Date())
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 5)
                  .map((event) => (
                    <tr key={event.id} className="border-b dark:border-gray-700">
                      <td className="py-3 px-4">
                        {event.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="py-3 px-4 font-medium">{event.title}</td>
                      <td className="py-3 px-4">
                        <Badge className={getBadgeColorForEventType(event.type)}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{event.description}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarListPage;

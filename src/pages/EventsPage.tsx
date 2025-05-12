
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, MapPin, User } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'academic' | 'cultural' | 'sports' | 'workshop' | 'other';
  description: string;
  organizer: string;
  image?: string;
  registration_link?: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Annual Technical Symposium - TechNova 2023',
    date: '2023-05-15',
    time: '9:00 AM - 5:00 PM',
    location: 'Main Auditorium',
    category: 'academic',
    description: 'TechNova 2023 is our flagship technical symposium featuring paper presentations, project exhibitions, coding competitions, and technical quizzes. Distinguished speakers from the industry will judge the events and share their insights. Cash prizes worth Rs. 1,00,000 to be won!',
    organizer: 'Department of Computer Science',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    registration_link: 'https://nriit.edu/technova2023'
  },
  {
    id: 2,
    title: 'Cultural Fest - Rhythm 2023',
    date: '2023-05-20',
    time: '10:00 AM - 9:00 PM',
    location: 'College Grounds',
    category: 'cultural',
    description: 'Rhythm 2023 is our annual cultural extravaganza showcasing the artistic talents of our students. The event includes dance performances, musical shows, fashion shows, and theatrical acts. This year\'s theme is "Fusion of Traditions" celebrating India\'s diverse cultural heritage.',
    organizer: 'Student Cultural Committee',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    registration_link: 'https://nriit.edu/rhythm2023'
  },
  {
    id: 3,
    title: 'Workshop on Artificial Intelligence & Machine Learning',
    date: '2023-05-25',
    time: '10:00 AM - 4:00 PM',
    location: 'Seminar Hall 1',
    category: 'workshop',
    description: 'A hands-on workshop on Artificial Intelligence and Machine Learning conducted by experts from Google. Participants will learn about the fundamentals of AI/ML, work on practical projects, and receive certificates upon completion. Limited seats available!',
    organizer: 'Department of Information Technology',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    registration_link: 'https://nriit.edu/aiml-workshop'
  },
  {
    id: 4,
    title: 'Annual Sports Meet 2023',
    date: '2023-06-01',
    time: '8:00 AM - 6:00 PM',
    location: 'College Sports Complex',
    category: 'sports',
    description: 'The Annual Sports Meet features various sporting events including cricket, football, basketball, volleyball, athletics, and indoor games. Students can participate individually or as part of their department teams. Winners will be awarded trophies and certificates during the closing ceremony.',
    organizer: 'Sports Department',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 5,
    title: 'Guest Lecture: Future of Renewable Energy',
    date: '2023-05-10',
    time: '2:00 PM - 4:00 PM',
    location: 'Conference Hall',
    category: 'academic',
    description: 'Distinguished Professor Dr. Ramesh Kumar from IIT Delhi will deliver a lecture on the "Future of Renewable Energy" covering solar, wind, and hydrogen technologies. The lecture will be followed by a Q&A session. All students and faculty members are invited to attend.',
    organizer: 'Department of Electrical Engineering',
    image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 6,
    title: 'Alumni Meet 2023',
    date: '2023-06-10',
    time: '5:00 PM - 9:00 PM',
    location: 'Main Auditorium',
    category: 'other',
    description: 'The Annual Alumni Meet brings together former students of NRIIT to reconnect with their alma mater and share their professional journeys. The event includes networking sessions, cultural performances, and a gala dinner. This year, we will be honoring alumni who have made significant achievements in their careers.',
    organizer: 'Alumni Association',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
    registration_link: 'https://nriit.edu/alumni-meet-2023'
  },
  {
    id: 7,
    title: 'Hackathon: Code for Change',
    date: '2023-05-18',
    time: '9:00 AM (48 hours)',
    location: 'IT Labs',
    category: 'academic',
    description: 'A 48-hour hackathon challenging participants to develop innovative solutions for social problems. Teams of 3-4 members can participate and work on projects related to education, healthcare, environment, and accessibility. Top three teams will receive cash prizes and internship opportunities.',
    organizer: 'Coding Club',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    registration_link: 'https://nriit.edu/hackathon-2023'
  },
  {
    id: 8,
    title: 'Career Fair 2023',
    date: '2023-06-15',
    time: '10:00 AM - 4:00 PM',
    location: 'College Grounds',
    category: 'other',
    description: 'The annual Career Fair brings together recruiters from over 50 companies across various industries. Students can explore internship and job opportunities, submit resumes, and participate in on-the-spot interviews. Don\'t miss this chance to kickstart your career!',
    organizer: 'Placement Cell',
    image: 'https://images.unsplash.com/photo-1560523159-4a9692d222f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
];

const EventsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter events based on active category
  const filteredEvents = events.filter(event => {
    return activeCategory === 'all' || event.category === activeCategory;
  });
  
  // Sort events by date (most recent first)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Upcoming Events</h1>
        
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            Stay updated with the latest events, workshops, and activities happening at NRI Institute of Technology.
            Join us to expand your knowledge, showcase your talents, and make the most of your campus experience.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="max-w-6xl mx-auto" onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-6 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="cultural">Cultural</TabsTrigger>
            <TabsTrigger value="sports">Sports</TabsTrigger>
            <TabsTrigger value="workshop">Workshops</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </TabsContent>
          
          <TabsContent value="academic" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </TabsContent>
          
          <TabsContent value="cultural" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </TabsContent>
          
          <TabsContent value="sports" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </TabsContent>
          
          <TabsContent value="workshop" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </TabsContent>
          
          <TabsContent value="other" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Format date for display
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Check if the event is upcoming or past
  const isUpcoming = new Date(event.date) >= new Date();
  
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      {event.image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          <div className="absolute top-0 right-0 p-2 bg-blue-600 text-white text-xs uppercase tracking-wider">
            {event.category}
          </div>
          {!isUpcoming && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                Event Completed
              </span>
            </div>
          )}
        </div>
      )}
      
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{event.organizer}</span>
          </div>
        </div>
        
        <div className={`${expanded ? '' : 'line-clamp-3'}`}>
          <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
        </div>
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="text-blue-600 dark:text-blue-400 text-sm mt-2 hover:underline"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      </CardContent>
      
      {event.registration_link && isUpcoming && (
        <CardFooter className="pt-0">
          <a 
            href={event.registration_link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-center transition-colors"
          >
            Register Now
          </a>
        </CardFooter>
      )}
    </Card>
  );
};

export default EventsPage;

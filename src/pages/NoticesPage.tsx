
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  date: string;
  category: 'academic' | 'administrative' | 'exam' | 'events';
  content: string;
  important: boolean;
}

const notices: Notice[] = [
  {
    id: 1,
    title: 'Semester Examination Schedule for Even Semester 2023',
    date: '2023-04-15',
    category: 'exam',
    content: 'The semester examinations for the even semester 2023 will commence from May 10, 2023. The detailed schedule has been uploaded on the student portal. All students are advised to check their exam timetables and prepare accordingly.',
    important: true
  },
  {
    id: 2,
    title: 'Registration for Odd Semester 2023-24',
    date: '2023-04-10',
    category: 'academic',
    content: 'Registration for the Odd Semester 2023-24 will start from April 25, 2023. Students are requested to clear all pending dues before registration. The last date for registration is May 5, 2023.',
    important: true
  },
  {
    id: 3,
    title: 'Faculty Development Program on AI & Machine Learning',
    date: '2023-04-08',
    category: 'events',
    content: 'A one-week Faculty Development Program on "Artificial Intelligence and Machine Learning Applications" will be conducted from April 20-26, 2023. Interested faculty members can register through the faculty portal by April 15, 2023.',
    important: false
  },
  {
    id: 4,
    title: 'Change in Library Timings',
    date: '2023-04-05',
    category: 'administrative',
    content: 'Please note that the library will remain open from 8:00 AM to 8:00 PM during the examination period (May 10-30, 2023). Students are encouraged to utilize this extended timing for their exam preparation.',
    important: false
  },
  {
    id: 5,
    title: 'Guest Lecture on Blockchain Technology',
    date: '2023-04-01',
    category: 'events',
    content: 'A guest lecture on "Blockchain Technology and its Applications" will be delivered by Mr. Rahul Sharma, CTO of TechBlocks, on April 12, 2023, at 2:00 PM in Seminar Hall 1. All students of B.Tech and M.Tech are invited to attend.',
    important: false
  },
  {
    id: 6,
    title: 'Summer Internship Opportunities',
    date: '2023-03-28',
    category: 'academic',
    content: 'Multiple companies have announced summer internship opportunities for pre-final year students. Interested students can visit the placement cell and submit their applications by April 10, 2023.',
    important: true
  },
  {
    id: 7,
    title: 'Submission of Project Reports',
    date: '2023-03-25',
    category: 'academic',
    content: 'Final year students are reminded to submit their project reports by April 20, 2023. The submission should include both hard copy and soft copy (PDF) sent to the respective department email.',
    important: false
  },
  {
    id: 8,
    title: 'Results of Mid-semester Examinations',
    date: '2023-03-20',
    category: 'exam',
    content: 'The results of mid-semester examinations have been uploaded on the student portal. Students can check their results by logging in with their credentials. Any discrepancies should be reported to the examination cell within 3 days.',
    important: false
  },
];

const NoticesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter notices based on search term and active category
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || notice.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Notices & Announcements</h1>
        
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search notices..."
              className="w-full p-3 pl-10 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
        </div>
        
        <Tabs defaultValue="all" className="max-w-4xl mx-auto" onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="exam">Exams</TabsTrigger>
            <TabsTrigger value="administrative">Admin</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))
            ) : (
              <NoNoticesFound />
            )}
          </TabsContent>
          
          <TabsContent value="academic" className="space-y-4">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))
            ) : (
              <NoNoticesFound />
            )}
          </TabsContent>
          
          <TabsContent value="exam" className="space-y-4">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))
            ) : (
              <NoNoticesFound />
            )}
          </TabsContent>
          
          <TabsContent value="administrative" className="space-y-4">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))
            ) : (
              <NoNoticesFound />
            )}
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))
            ) : (
              <NoNoticesFound />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const NoticeCard: React.FC<{ notice: Notice }> = ({ notice }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className={notice.important ? "border-red-500 dark:border-red-500" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              {notice.important && (
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              )}
              {notice.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <span>{new Date(notice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs capitalize">
                {notice.category}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`${expanded ? '' : 'line-clamp-2'}`}>
          <p className="text-gray-700 dark:text-gray-300">{notice.content}</p>
        </div>
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="text-blue-600 dark:text-blue-400 text-sm mt-2 hover:underline"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      </CardContent>
    </Card>
  );
};

const NoNoticesFound: React.FC = () => (
  <div className="text-center py-8">
    <h3 className="text-lg font-medium mb-2">No notices found</h3>
    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
  </div>
);

export default NoticesPage;

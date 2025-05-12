
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface FacultyMember {
  id: number;
  name: string;
  position: string;
  department: string;
  education: string;
  experience: string;
  specialization: string;
  email: string;
  photo: string;
}

const facultyMembers: FacultyMember[] = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    position: "Professor & Head",
    department: "Computer Science",
    education: "Ph.D. in Computer Science, IIT Delhi",
    experience: "20+ years",
    specialization: "Artificial Intelligence, Machine Learning",
    email: "rajesh.kumar@nriit.edu",
    photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    position: "Associate Professor",
    department: "Information Technology",
    education: "Ph.D. in Information Systems, IIT Bombay",
    experience: "15+ years",
    specialization: "Data Science, Big Data Analytics",
    email: "priya.sharma@nriit.edu",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    id: 3,
    name: "Dr. Amit Verma",
    position: "Professor",
    department: "Electronics & Communication",
    education: "Ph.D. in Electronics, IIT Kharagpur",
    experience: "18+ years",
    specialization: "VLSI Design, Embedded Systems",
    email: "amit.verma@nriit.edu",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    id: 4,
    name: "Dr. Sunita Rao",
    position: "Associate Professor",
    department: "Electrical Engineering",
    education: "Ph.D. in Electrical Engineering, IIT Madras",
    experience: "12+ years",
    specialization: "Power Systems, Smart Grid",
    email: "sunita.rao@nriit.edu",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    id: 5,
    name: "Dr. Suresh Patel",
    position: "Professor",
    department: "Mechanical Engineering",
    education: "Ph.D. in Mechanical Engineering, IIT Kanpur",
    experience: "22+ years",
    specialization: "Thermal Engineering, Robotics",
    email: "suresh.patel@nriit.edu",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    id: 6,
    name: "Dr. Neha Singh",
    position: "Assistant Professor",
    department: "Civil Engineering",
    education: "Ph.D. in Civil Engineering, NIT Trichy",
    experience: "8+ years",
    specialization: "Structural Engineering, Smart Materials",
    email: "neha.singh@nriit.edu",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    id: 7,
    name: "Dr. Ravi Chandran",
    position: "Associate Professor",
    department: "Business Administration",
    education: "Ph.D. in Management, IIM Ahmedabad",
    experience: "14+ years",
    specialization: "Finance, Strategic Management",
    email: "ravi.chandran@nriit.edu",
    photo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    id: 8,
    name: "Dr. Meena Kumari",
    position: "Professor",
    department: "Humanities & Sciences",
    education: "Ph.D. in English Literature, JNU",
    experience: "16+ years",
    specialization: "Technical Communication, Language Skills",
    email: "meena.kumari@nriit.edu",
    photo: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
];

const FacultyList: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Distinguished Faculty</h1>
        
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            Our faculty consists of highly qualified educators and researchers who are experts in their respective fields. 
            They bring a wealth of knowledge, industry experience, and research expertise to provide students with a comprehensive learning experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyMembers.map((faculty) => (
            <Card key={faculty.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex flex-col items-center mb-4">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={faculty.photo} />
                      <AvatarFallback>{faculty.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold text-center">{faculty.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400">{faculty.position}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{faculty.department}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Education:</span> {faculty.education}</p>
                    <p><span className="font-medium">Experience:</span> {faculty.experience}</p>
                    <p><span className="font-medium">Specialization:</span> {faculty.specialization}</p>
                    <p><span className="font-medium">Email:</span> {faculty.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Join Our Faculty Team</h2>
          <p className="text-center mb-6">
            We are always looking for talented and passionate educators to join our team. 
            If you are interested in teaching at NRI Institute of Technology, please send your CV to careers@nriit.edu
          </p>
          <div className="flex justify-center">
            <button className="btn-primary">View Current Openings</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FacultyList;

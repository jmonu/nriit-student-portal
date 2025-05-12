
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Courses: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Courses</h1>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="undergraduate">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
              <TabsTrigger value="postgraduate">Postgraduate</TabsTrigger>
              <TabsTrigger value="diploma">Diploma</TabsTrigger>
            </TabsList>
            
            <TabsContent value="undergraduate" className="mt-8">
              <h2 className="text-2xl font-semibold mb-6">Undergraduate Programs</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bachelor of Technology (B.Tech)</CardTitle>
                    <CardDescription>4-Year Full-Time Program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Computer Science and Engineering</li>
                      <li>Information Technology</li>
                      <li>Electronics and Communication Engineering</li>
                      <li>Electrical and Electronics Engineering</li>
                      <li>Mechanical Engineering</li>
                      <li>Civil Engineering</li>
                      <li>Artificial Intelligence and Data Science</li>
                      <li>Internet of Things (IoT)</li>
                    </ul>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      Our B.Tech programs are designed to provide students with a strong foundation in engineering principles 
                      and advanced skills in their chosen specialization. The curriculum includes practical labs, industry visits, 
                      and project work to ensure hands-on experience.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Bachelor of Business Administration (BBA)</CardTitle>
                    <CardDescription>3-Year Full-Time Program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>BBA in Marketing</li>
                      <li>BBA in Finance</li>
                      <li>BBA in Human Resources</li>
                      <li>BBA in International Business</li>
                    </ul>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      The BBA program focuses on developing management skills, business acumen, and leadership qualities. 
                      Students participate in case studies, industry internships, and management events to gain practical experience.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="postgraduate" className="mt-8">
              <h2 className="text-2xl font-semibold mb-6">Postgraduate Programs</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Master of Technology (M.Tech)</CardTitle>
                    <CardDescription>2-Year Full-Time Program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Computer Science and Engineering</li>
                      <li>Information Security</li>
                      <li>VLSI Design</li>
                      <li>Power Systems</li>
                      <li>Structural Engineering</li>
                      <li>Machine Learning and AI</li>
                    </ul>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      M.Tech programs offer advanced specialization and research opportunities. Students engage in cutting-edge 
                      research projects with guidance from experienced faculty members and industry experts.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Master of Business Administration (MBA)</CardTitle>
                    <CardDescription>2-Year Full-Time Program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>MBA in Marketing</li>
                      <li>MBA in Finance</li>
                      <li>MBA in Human Resource Management</li>
                      <li>MBA in Operations Management</li>
                      <li>MBA in Business Analytics</li>
                      <li>MBA in International Business</li>
                    </ul>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      Our MBA program is designed to develop future business leaders with a global perspective. 
                      The curriculum includes business simulations, industry projects, international exposure, and leadership development activities.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="diploma" className="mt-8">
              <h2 className="text-2xl font-semibold mb-6">Diploma Programs</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Diploma in Engineering</CardTitle>
                    <CardDescription>3-Year Full-Time Program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Diploma in Civil Engineering</li>
                      <li>Diploma in Mechanical Engineering</li>
                      <li>Diploma in Electrical Engineering</li>
                      <li>Diploma in Computer Engineering</li>
                      <li>Diploma in Electronics & Communication</li>
                    </ul>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      Diploma programs provide practical training and technical knowledge for immediate industry employment. 
                      Students can also pursue further education through lateral entry into B.Tech programs.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Certificate Courses</CardTitle>
                    <CardDescription>Short-term courses (3-6 months)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Web Development</li>
                      <li>Digital Marketing</li>
                      <li>Cloud Computing</li>
                      <li>Data Analytics</li>
                      <li>Cyber Security</li>
                      <li>Robotics and Automation</li>
                    </ul>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      Certificate courses are designed to enhance specific skills and improve employability. 
                      These courses are taught by industry experts and focus on current industry requirements.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose Our Courses?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Industry-Aligned Curriculum</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our curriculum is regularly updated in consultation with industry experts to ensure relevance and alignment with market needs.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Experienced Faculty</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn from highly qualified professors with extensive academic and industry experience.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">State-of-the-Art Infrastructure</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access to modern labs, libraries, and research facilities to enhance your learning experience.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Industry Partnerships</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Collaborations with leading companies for internships, guest lectures, and placement opportunities.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Global Exposure</h3>
              <p className="text-gray-600 dark:text-gray-400">
                International exchange programs and global case studies to develop a worldwide perspective.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Placement Assistance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Dedicated placement cell to help students find suitable career opportunities after graduation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Courses;

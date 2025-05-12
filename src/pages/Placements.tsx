
import React from 'react';
import Layout from '@/components/layout/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const placementData = [
  { year: '2017-18', students: 450, placed: 402, percentage: 89 },
  { year: '2018-19', students: 480, placed: 437, percentage: 91 },
  { year: '2019-20', students: 520, placed: 478, percentage: 92 },
  { year: '2020-21', students: 540, placed: 486, percentage: 90 },
  { year: '2021-22', students: 570, placed: 530, percentage: 93 },
  { year: '2022-23', students: 600, placed: 564, percentage: 94 },
];

const topRecruiters = [
  { id: 1, name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png' },
  { id: 2, name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/800px-Microsoft_logo.svg.png' },
  { id: 3, name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' },
  { id: 4, name: 'Infosys', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png' },
  { id: 5, name: 'TCS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/800px-Tata_Consultancy_Services_Logo.svg.png' },
  { id: 6, name: 'Wipro', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/1280px-Wipro_Primary_Logo_Color_RGB.svg.png' },
  { id: 7, name: 'Accenture', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/1280px-Accenture.svg.png' },
  { id: 8, name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/800px-IBM_logo.svg.png' },
];

const studentTestimonials = [
  {
    id: 1,
    name: 'Priya Mehta',
    batch: '2023 - Computer Science',
    company: 'Google',
    package: '42 LPA',
    testimonial: 'The placement training and guidance from our faculty helped me crack interviews at top tech companies. I\'m grateful to NRIIT for providing such an excellent platform.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
  },
  {
    id: 2,
    name: 'Rahul Sharma',
    batch: '2023 - Information Technology',
    company: 'Microsoft',
    package: '39 LPA',
    testimonial: 'The industry exposure and internship opportunities during my course at NRIIT gave me the practical experience needed to stand out in interviews.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
  },
  {
    id: 3,
    name: 'Anjali Patel',
    batch: '2022 - Electronics',
    company: 'Amazon',
    package: '36 LPA',
    testimonial: 'The mock interviews and resume building workshops organized by the placement cell were invaluable in preparing me for the recruitment process.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
  },
];

const Placements: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Placements</h1>
        
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            At NRI Institute of Technology, we take pride in our exceptional placement record. Our dedicated placement cell 
            works tirelessly to connect students with leading companies across various industries, ensuring they find 
            rewarding career opportunities upon graduation.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-semibold mb-6">Placement Statistics</h2>
          
          <div className="h-80 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={placementData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" name="Total Students" fill="#8884d8" />
                <Bar dataKey="placed" name="Students Placed" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {placementData.slice(-3).map((data, index) => (
              <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-lg">{data.year}</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{data.percentage}%</p>
                <p className="text-gray-600 dark:text-gray-400">Placement Rate</p>
                <p className="mt-2">{data.placed} out of {data.students} students</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Top Recruiters</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {topRecruiters.map((recruiter) => (
              <div key={recruiter.id} className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <img 
                  src={recruiter.logo} 
                  alt={`${recruiter.name} logo`} 
                  className="h-12 object-contain mb-2"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <p className="text-center font-medium">{recruiter.name}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-semibold mb-6">Highest Packages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">Highest Package</h3>
              <p className="text-4xl font-bold">₹42 LPA</p>
              <p className="mt-2">Google, 2023</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">Average Package</h3>
              <p className="text-4xl font-bold">₹12.5 LPA</p>
              <p className="mt-2">Batch of 2023</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-300 to-blue-400 text-white p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">Median Package</h3>
              <p className="text-4xl font-bold">₹9.8 LPA</p>
              <p className="mt-2">Batch of 2023</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-semibold mb-6">Student Testimonials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.photo} 
                    alt={testimonial.name} 
                    className="h-14 w-14 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.batch}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">"{testimonial.testimonial}"</p>
                <div className="flex justify-between items-center text-sm">
                  <p className="font-medium">{testimonial.company}</p>
                  <p className="text-blue-600 dark:text-blue-400 font-bold">{testimonial.package}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Build Your Career?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join NRI Institute of Technology and open doors to exciting career opportunities. 
            Our placement cell is committed to helping you achieve your professional goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Apply Now</button>
            <button className="btn-outline">Download Placement Brochure</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Placements;


import React from 'react';
import Layout from '@/components/layout/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">About NRI Institute of Technology</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1786&q=80" 
              alt="NRI Institute Campus" 
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Legacy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Founded in 1995, NRI Institute of Technology has been at the forefront of technical education for over two decades. 
              Our commitment to excellence has produced thousands of successful alumni who are making significant contributions 
              across various industries globally.
            </p>
            
            <h2 className="text-2xl font-semibold">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-300">
              To be a premier institution of higher learning, recognized globally for its innovative academic programs, 
              applied research, and partnerships with industries to produce professionals who are technically competent, 
              socially responsible, and lifelong learners.
            </p>
            
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300">
              To provide quality education that transforms students into leaders who contribute to the advancement of 
              civilization by generating and preserving knowledge, applying it to solve complex problems, and engaging 
              the global community in a dynamic exchange of ideas.
            </p>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Key Statistics</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-4xl font-bold text-blue-600">2500+</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Students</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-4xl font-bold text-blue-600">150+</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Faculty Members</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-4xl font-bold text-blue-600">92%</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Placement Rate</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-4xl font-bold text-blue-600">25+</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Years of Excellence</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We pursue excellence in all our endeavors, constantly striving to improve and innovate.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We foster an environment where honesty, transparency, and ethical behavior are paramount.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We encourage creative thinking and novel approaches to solve complex problems.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We embrace diversity and provide equal opportunities for all to learn and grow.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Social Responsibility</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We are committed to making positive contributions to society and our environment.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We foster partnerships with industry and academic institutions to enhance learning and research opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

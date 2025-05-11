
import React from 'react';
import Layout from '@/components/layout/Layout';
import ImageSlider from '@/components/home/ImageSlider';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  // Slider images 
  const sliderImages = [
    'https://i.ibb.co/KcsH2ztS/c50fd3be6d8a.jpg',
    'https://i.ibb.co/Z6PF1xHh/943fc24f2976.jpg',
    'https://i.ibb.co/Tx65QwNn/1e27abec6e44.jpg',
    'https://i.ibb.co/j9jWdW1h/b6e51744087e.jpg',
    'https://i.ibb.co/3YT3qSMZ/18ae84338089.jpg',
    'https://i.ibb.co/qMxYhpqG/e4e346a8cbe5.jpg',
    'https://i.ibb.co/Q3GDs1N8/d2e709d296ce.jpg',
    'https://i.ibb.co/R4cTnKyz/8668a8797c75.jpg', 
    'https://i.ibb.co/LdpGgBcp/d65fba037fab.jpg'
  ];

  // Faculty members
  const facultyMembers = [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      designation: 'Professor, Computer Science',
      bio: 'Ph.D in Machine Learning with over 15 years of teaching and research experience.',
      photo: 'https://i.pravatar.cc/300?img=1'
    },
    {
      id: '2',
      name: 'Dr. Priya Sharma',
      designation: 'HOD, Electronics Engineering',
      bio: 'Specializes in VLSI design with multiple research publications in international journals.',
      photo: 'https://i.pravatar.cc/300?img=5'
    },
    {
      id: '3',
      name: 'Prof. Suresh Reddy',
      designation: 'Associate Professor, Mechanical Engineering',
      bio: 'Expert in Thermal Engineering with industry experience at leading automobile companies.',
      photo: 'https://i.pravatar.cc/300?img=3'
    }
  ];

  // Courses
  const courses = [
    { id: '1', name: 'Computer Science Engineering', code: 'CSE', description: 'Focus on software development, AI/ML, data science, and cloud computing.' },
    { id: '2', name: 'Electronics & Communication', code: 'ECE', description: 'Specialization in semiconductor technology, communication systems, and signal processing.' },
    { id: '3', name: 'Electrical & Electronics', code: 'EEE', description: 'Expertise in power systems, control systems, and renewable energy.' },
    { id: '4', name: 'Mechanical Engineering', code: 'MECH', description: 'Training in design, thermal engineering, manufacturing processes, and automation.' },
    { id: '5', name: 'Civil Engineering', code: 'CIVIL', description: 'Education in structural design, transportation, environmental engineering, and construction management.' }
  ];

  // Recent notices
  const recentNotices = [
    { id: '1', text: 'Mid-term examinations start from March 15th, 2025', date: '2025-02-28' },
    { id: '2', text: 'Workshop on AI and Machine Learning on April 5th, 2025', date: '2025-03-01' },
    { id: '3', text: 'Applications open for summer internship program', date: '2025-03-02' }
  ];

  // Upcoming events
  const upcomingEvents = [
    { 
      id: '1', 
      text: 'Annual Technical Symposium "TechnoVision 2025"', 
      date: '2025-04-15',
      image: 'https://i.ibb.co/KcsH2ztS/c50fd3be6d8a.jpg'
    },
    { 
      id: '2', 
      text: 'Industry-Academia Meet', 
      date: '2025-04-22' 
    }
  ];

  return (
    <Layout>
      {/* Hero Section with Image Slider */}
      <section className="relative">
        <ImageSlider images={sliderImages} />
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">About <span className="text-primary">NRIIT</span></h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-accent h-1 w-20"></div>
                <span className="font-semibold text-accent">NAAC A+ Accredited</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                NRI Institute of Technology (NRIIT) is a premier engineering institution established with the vision of providing quality technical education. 
                Our institution is recognized for its academic excellence, innovative research, and industry collaborations.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                With state-of-the-art infrastructure, experienced faculty, and comprehensive curriculum, we prepare our students 
                to become industry-ready professionals equipped with technical knowledge and practical skills.
              </p>
              <Link to="/about" className="btn-primary">Learn More</Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://i.ibb.co/Tx65QwNn/1e27abec6e44.jpg" 
                alt="NRIIT Campus" 
                className="rounded-lg shadow-lg w-full h-auto"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/placeholder.svg';
                  console.error('Failed to load about image');
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Our Programs</h2>
          <div className="flex justify-center mb-8">
            <div className="bg-accent h-1 w-20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
              <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 card-hover">
                <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                <div className="bg-gray-100 dark:bg-gray-700 text-primary dark:text-primary-200 text-sm font-medium px-2 py-1 rounded inline-block mb-4">
                  {course.code}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {course.description}
                </p>
                <a href="#" className="mt-4 inline-block text-primary hover:underline glitch-effect">
                  View Program Details
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/courses" className="btn-primary">Browse All Courses</Link>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Our Faculty</h2>
          <div className="flex justify-center mb-8">
            <div className="bg-accent h-1 w-20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyMembers.map(faculty => (
              <div key={faculty.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden card-hover">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={faculty.photo} 
                    alt={faculty.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/placeholder.svg';
                      console.error(`Failed to load faculty image for ${faculty.name}`);
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{faculty.name}</h3>
                  <p className="text-primary dark:text-primary-200 text-sm mb-3">{faculty.designation}</p>
                  <p className="text-gray-600 dark:text-gray-300">{faculty.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/faculty" className="btn-primary">View All Faculty</Link>
          </div>
        </div>
      </section>

      {/* Placements Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <img 
            src="https://i.ibb.co/Z6PF1xHh/943fc24f2976.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              console.error('Failed to load placement background image');
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-2">Placements</h2>
          <div className="flex justify-center mb-8">
            <div className="bg-accent h-1 w-20"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <p className="text-gray-600 dark:text-gray-300">Placement Rate</p>
                </div>
                <div className="p-4">
                  <div className="text-4xl font-bold text-primary mb-2">150+</div>
                  <p className="text-gray-600 dark:text-gray-300">Recruiting Companies</p>
                </div>
                <div className="p-4">
                  <div className="text-4xl font-bold text-primary mb-2">₹18L</div>
                  <p className="text-gray-600 dark:text-gray-300">Highest Package</p>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-center text-gray-700 dark:text-gray-300">
                  Our industry connections and placement cell work tirelessly to secure excellent career opportunities for our graduating students.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link to="/placements" className="btn-primary">Placement Details</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events & Notices Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Events */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Upcoming Events</h2>
              <div className="bg-accent h-1 w-20 mb-6"></div>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row card-hover">
                    {event.image && (
                      <div className="md:w-1/3">
                        <img 
                          src={event.image} 
                          alt={event.text} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            console.error(`Failed to load event image for ${event.text}`);
                          }}
                        />
                      </div>
                    )}
                    <div className={`p-4 ${event.image ? 'md:w-2/3' : 'w-full'}`}>
                      <div className="text-sm text-primary dark:text-primary-200 mb-1">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <h3 className="font-semibold mb-1">{event.text}</h3>
                      <a href="#" className="text-sm text-primary hover:underline glitch-effect">
                        View Details
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/events" className="text-primary hover:underline glitch-effect">
                  View All Events &rarr;
                </Link>
              </div>
            </div>

            {/* Notices */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Latest Notices</h2>
              <div className="bg-accent h-1 w-20 mb-6"></div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentNotices.map(notice => (
                    <li key={notice.id} className="py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {new Date(notice.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{notice.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <Link to="/notices" className="text-primary hover:underline glitch-effect">
                  View All Notices &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
              <div className="bg-accent h-1 w-20 mb-6"></div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
                    ></textarea>
                  </div>
                  <div>
                    <button type="submit" className="btn-primary w-full">Send Message</button>
                  </div>
                </form>
              </div>
            </div>

            {/* Newsletter & Location */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Subscribe to Newsletter</h2>
                <div className="bg-accent h-1 w-20 mb-6"></div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Stay updated with the latest news, events, and announcements.
                  </p>
                  <form className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <button type="submit" className="btn-primary">Subscribe</button>
                  </form>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-2">Our Location</h2>
                <div className="bg-accent h-1 w-20 mb-6"></div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded mb-4">
                    {/* Placeholder for map */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                      Map View
                    </div>
                  </div>
                  <address className="not-italic text-gray-700 dark:text-gray-300">
                    <p>123 College Road, City, State 500001</p>
                    <p className="mt-2">
                      <span className="font-medium">Phone:</span> +91 1234567890
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> info@nriit.edu
                    </p>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

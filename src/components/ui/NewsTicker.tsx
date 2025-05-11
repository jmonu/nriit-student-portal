
import React from 'react';

const NewsTicker: React.FC = () => {
  const newsItems = [
    'Admissions open for 2025-26 academic year! Apply now.',
    'Congratulations to our students for securing top positions in placements.',
    'NAAC A+ accreditation achieved! NRI Institute of Technology recognized for educational excellence.',
    'National level technical symposium scheduled for next month.',
    'New research grants awarded to our faculty members.',
  ];

  return (
    <div className="news-ticker-container">
      <div className="news-ticker-content">
        {newsItems.map((item, index) => (
          <React.Fragment key={index}>
            <span>{item}</span>
            <span className="mx-8">•</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;

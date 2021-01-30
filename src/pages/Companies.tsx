import React from 'react';
import Card from '../components/companies/Card';
import { companies } from '../data/company.json';

const Companies: React.FC = () => (
  <div className="max-w-6xl mx-auto mt-8 px-4 md:px-0">
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
      {companies && companies.map((item) => (
        <Card companyName={item.name} description={item.description} key={item.name} />
      ))}
    </div>
  </div>
);

export default Companies;

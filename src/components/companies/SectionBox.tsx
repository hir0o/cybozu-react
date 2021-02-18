import React from 'react';

type Prop = {
  children: React.ReactNode;
  title?: string;
};

const SectionBox: React.FC<Prop> = ({ children, title }) => (
  <div className="max-w-4xl mx-auto mt-8 px-4 shadow-sm bg-white p-4 rounded-md border-t-4 border-blue-400 border-solid">
    {title && (
      <h2 className="text-xl border-b-2 border-blue-300 border-solid pb-4">
        {title}
      </h2>
    )}
    {children}
  </div>
);

export default SectionBox;

import React from 'react';

type Props = {
  companyName: string,
  description: string,
};

const Card: React.FC<Props> = ({ companyName, description }: Props) => (
  <section>
    <div className="flex shadow-md rounded-md p-4 hover:bg-gray-50 cursor-pointer">
      <p>画像</p>
      <div>
        <h3>{companyName}</h3>
        <p>
          {description}
        </p>
      </div>
    </div>
  </section>
);

export default Card;

import React from 'react';

import { footerList1, footerList2, footerList3 } from '../utils/constants';

const List = ({ items, mt }: { items: string[], mt?: boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {items.map((item) => (
      <p
        key={item}
        className="text-gray-400 text-sm hover:underline cursor-pointer"
      >
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => {
  return (
    <footer className="hidden mt-6 xl:block">
      <List items={footerList1} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />
      <p className="text-gray-400 mt-5 text-sm font-bold">
        2023 Made with
        <span className="animate-pulse"> ❤ </span>by Codepantha{' '}
      </p>
    </footer>
  );
};

export default Footer;

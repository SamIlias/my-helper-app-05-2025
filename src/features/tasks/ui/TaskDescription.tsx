import React, { useEffect, useState } from 'react';

type Props = {
  position: { top: number; left: number };
  description?: string;
};

export const TaskDescription: React.FC<Props> = ({ position, description }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // turn on animation after mounting
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute w-[250px] h-fit wrap-break-word bg-stone-700 text-md p-3 rounded-lg shadow-lg z-50 transition-all duration-700 ease-out transform 
        ${visible ? 'opacity-100 translate-x-2' : 'opacity-0 translate-x-0'} ${description ? 'text-amber-400' : 'text-stone-500'}`}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {description ? description : 'there is no description'}
    </div>
  );
};

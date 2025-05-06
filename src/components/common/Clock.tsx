import * as React from 'react';
import { useEffect, useState } from 'react';

export const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const internalId = setInterval(() => {
      const newCurrentTime = new Date().toLocaleTimeString();
      console.log(newCurrentTime);
      setCurrentTime(newCurrentTime);
    }, 1000);

    return () => {
      clearInterval(internalId);
    };
  }, []);

  return <p>{currentTime}</p>;
};

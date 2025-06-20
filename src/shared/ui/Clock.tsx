import * as React from 'react';
import { useEffect, useState } from 'react';

export const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newCurrentTime = new Date().toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTime(newCurrentTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <p>{currentTime}</p>;
};

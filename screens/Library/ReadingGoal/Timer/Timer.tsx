import React, { useState, useEffect } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { Arc } from './Arc';

type TimerProps = {
  start?: boolean;
  duration?: number;
};

export const Timer = ({ start = false, duration = 0 }: TimerProps) => {
  const progress = useSharedValue(1);
  const [remainingTime, setRemainingTime] = useState('00 : 02');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (start && duration > 0) {
      progress.value = 1;
      const totalTime = duration;
      progress.value = withTiming(0, { duration: totalTime * 1000 });

      let currentTime = totalTime;
      let previousMinutes = Math.floor((currentTime % 3600) / 60);

      interval = setInterval(() => {
        currentTime -= 1;
        const hours = Math.floor(currentTime / 3600);
        const minutes = Math.floor((currentTime % 3600) / 60);

        if (minutes !== previousMinutes) {
          setRemainingTime(`${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')}`);
          previousMinutes = minutes;
        }

        if (currentTime <= 0) {
          clearInterval(interval);
          setRemainingTime('00 : 00');
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [start, duration]);

  return <Arc progress={progress} remainingTime={remainingTime} />;
};

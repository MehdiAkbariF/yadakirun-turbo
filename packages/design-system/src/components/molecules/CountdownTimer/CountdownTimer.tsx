import React from 'react';
import { Label } from '../../atoms/Label/Label';
import './CountdownTimer.scss';

interface TimeValue {
  value: number;
  label: string;
}

export const CountdownTimer = ({ days, hours, minutes, seconds }: { days: number, hours: number, minutes: number, seconds: number }) => {
  const times: TimeValue[] = [
    { value: days, label: 'روز' },
    { value: hours, label: 'ساعت' },
    { value: minutes, label: 'دقیقه' },
    { value: seconds, label: 'ثانیه' },
  ];
  
  const format = (val: number) => String(val).padStart(2, '0');

  return (
    <div className="countdown-timer">
      {times.map(time => (
        <div key={time.label} className="countdown-timer__block">
          <Label as="div" size="2x" weight="bold">{format(time.value)}</Label>
          <Label as="div" size="xs">{time.label}</Label>
        </div>
      ))}
    </div>
  );
};
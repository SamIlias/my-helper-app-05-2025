import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { setAddForm } from '@/features/tasks/model/tasksSlice';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type Props = {
  locale: string;
  onDayClick: (day: Date) => void;
};

export const CustomCalendar: React.FC<Props> = ({ locale }) => {
  const [value, setValue] = useState<Value>(new Date());
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Calendar
      onClickDay={(day) => dispatch(setAddForm({ active: true, date: day }))}
      onChange={setValue}
      value={value}
      locale={locale}
    />
  );
};

import React, { useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CustomCalendar: React.FC<{ locale: string }> = ({ locale }) => {
  const [value, setValue] = useState<Value>(new Date());
  return <Calendar onChange={setValue} value={value} locale={locale} />;
};

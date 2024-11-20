import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { reservationData } from '@/data/data';
import { Reservation } from '@/types/interface';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ICalendarBar {
  currentMonth: { year: number, month: number },
  setCurrentMonth: React.Dispatch<React.SetStateAction<{ year: number, month: number }>>,
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>,
}

function CalendarBar(props: ICalendarBar) {
  useEffect(() => {
    // 년도와 월이 변경될 때마다 데이터를 가져오는 함수 호출
    const currentMonthReservations = reservationData.filter((data) => {
      const { year, month } = props.currentMonth;
      return data.time.getFullYear() === year && data.time.getMonth() + 1 === month;
    });
    props.setReservations(currentMonthReservations);
  }, [props.currentMonth]);

  // const fetchData = (selectedYear, selectedMonth) => {
  //   // DB에서 데이터를 요청하는 로직 추가
  //   console.log(`Fetching data for ${selectedYear}-${selectedMonth}`);
  // };
  const currentMonth = props.currentMonth.month;
  const currentYear = props.currentMonth.year;

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      props.setCurrentMonth({ year: currentYear - 1, month: 12 });
    } else {
      props.setCurrentMonth({ year: currentYear, month: currentMonth - 1 });
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      props.setCurrentMonth({ year: currentYear + 1, month: 1 });
    } else {
      props.setCurrentMonth({ year: currentYear, month: currentMonth + 1 });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Button onClick={handlePrevMonth} variant="outline" size="icon" className="mr-4">
        <ChevronLeft />
      </Button>
      <span className="text-xl text-">{`${currentYear}년 ${String(currentMonth).padStart(2, "0")}월`}</span>

      <Button onClick={handleNextMonth} variant="outline" size="icon" className="ml-4">
        <ChevronRight />
      </Button>
    </div>
  );
}

export default CalendarBar;

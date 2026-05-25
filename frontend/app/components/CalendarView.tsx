'use client';

import { useState } from "react";

type Event = {
  id: number;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  calenderId: number;
};

type CalendarViewProps = {
  events: Event[];
  viewMode: 'week' | 'month';
};

export default function CalendarView({ events, viewMode }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getWeekDates = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date);
    monday.setDate(diff);

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const getMonthDates = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDay = firstDay.getDay();
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - (startDay === 0 ? 6 : startDay - 1));

    const dates = [];
    const current = new Date(startDate);

    while (current <= lastDay || dates.length % 7 !== 0) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => {
      const eventStart = new Date(event.startDate).toISOString().split('T')[0];
      const eventEnd = new Date(event.endDate).toISOString().split('T')[0];
      return dateStr >= eventStart && dateStr <= eventEnd;
    });
  };

  const formatDateHeader = () => {
    if (viewMode === 'week') {
      const weekDates = getWeekDates(currentDate);
      const start = weekDates[0];
      const end = weekDates[6];
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const renderWeekView = () => {
    const weekDates = getWeekDates(currentDate);
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200">
        {dayNames.map((day, idx) => (
          <div key={day} className="bg-gray-50 p-2 text-center font-semibold text-sm">
            {day} {weekDates[idx].getDate()}
          </div>
        ))}
        {weekDates.map((date, idx) => {
          const dayEvents = getEventsForDate(date);
          return (
            <div
              key={idx}
              className={`bg-white p-2 min-h-[120px] ${isToday(date) ? 'bg-blue-50' : ''}`}
            >
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  className="bg-green-100 border-l-4 border-green-600 p-1 mb-1 text-xs rounded"
                >
                  <div className="font-semibold truncate">{event.title}</div>
                  <div className="text-gray-600 truncate">{new Date(event.startDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  const renderMonthView = () => {
    const monthDates = getMonthDates(currentDate);
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200">
        {dayNames.map(day => (
          <div key={day} className="bg-gray-50 p-2 text-center font-semibold text-sm">
            {day}
          </div>
        ))}
        {monthDates.map((date, idx) => {
          const dayEvents = getEventsForDate(date);
          return (
            <div
              key={idx}
              className={`bg-white p-2 min-h-[100px] ${isToday(date) ? 'bg-blue-50' : ''} ${!isCurrentMonth(date) ? 'text-gray-400' : ''}`}
            >
              <div className="font-semibold text-sm mb-1">{date.getDate()}</div>
              {dayEvents.slice(0, 3).map(event => (
                <div
                  key={event.id}
                  className="bg-green-100 border-l-2 border-green-600 p-1 mb-1 text-xs rounded truncate"
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-gray-500">+{dayEvents.length - 3} more</div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{formatDateHeader()}</h2>
        <div className="flex gap-2">
          <button
            onClick={goToPrevious}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Today
          </button>
          <button
            onClick={goToNext}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {viewMode === 'week' ? renderWeekView() : renderMonthView()}
    </div>
  );
}

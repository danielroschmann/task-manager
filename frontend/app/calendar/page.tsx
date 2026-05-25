'use client';

import { useEffect, useState } from "react";
import CreateCalendarForm from "../components/CreateCalendarForm";
import CalendarView from "../components/CalendarView";
import CalendarSelector from "../components/CalendarSelector";

type Calendar = {
  id: number;
  name: string;
  isMain: boolean;
  createdAt: string;
};

type Event = {
  id: number;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  calenderId: number;
};

export default function CalendarPage() {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState<number | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [viewMode, setViewMode] = useState<'week' | 'month'>('month');
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchCalendars();
  }, []);

  useEffect(() => {
    if (selectedCalendarId) {
      fetchEvents(selectedCalendarId);
    }
  }, [selectedCalendarId]);

  async function fetchCalendars() {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/calender`);
      const data = await response.json();
      setCalendars(data);

      if (data.length > 0) {
        const mainCalendar = data.find((cal: Calendar) => cal.isMain);
        setSelectedCalendarId(mainCalendar ? mainCalendar.id : data[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch calendars:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchEvents(calendarId: number) {
    try {
      const response = await fetch(`${apiUrl}/calender/${calendarId}/events`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  }

  const handleCalendarSelect = (id: number) => {
    setSelectedCalendarId(id);
  };

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Calendar</h1>
        <p className="text-gray-600 mb-8">Loading calendars...</p>
      </div>
    );
  }

  if (calendars.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Calendar</h1>
        <p className="text-gray-600 mb-8">Create your first calendar to get started</p>

        <div className="bg-white rounded-lg shadow p-6">
          <CreateCalendarForm />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Calendar</h1>
          <p className="text-gray-600">Manage your events and schedules</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {showCreateForm ? 'Hide Form' : 'New Calendar'}
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <CreateCalendarForm />
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          {selectedCalendarId && (
            <CalendarSelector
              calendars={calendars}
              selectedId={selectedCalendarId}
              onSelect={handleCalendarSelect}
            />
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'week'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'month'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        {selectedCalendarId && (
          <CalendarView events={events} viewMode={viewMode} />
        )}
      </div>
    </div>
  );
}


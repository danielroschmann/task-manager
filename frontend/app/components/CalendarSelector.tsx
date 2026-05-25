'use client';

type Calendar = {
  id: number;
  name: string;
  isMain: boolean;
};

type CalendarSelectorProps = {
  calendars: Calendar[];
  selectedId: number;
  onSelect: (id: number) => void;
};

export default function CalendarSelector({ calendars, selectedId, onSelect }: CalendarSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="calendar-select" className="text-sm font-medium text-gray-700">
        Calendar:
      </label>
      <select
        id="calendar-select"
        value={selectedId}
        onChange={(e) => onSelect(Number(e.target.value))}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
      >
        {calendars.map((calendar) => (
          <option key={calendar.id} value={calendar.id}>
            {calendar.name} {calendar.isMain ? '(Main)' : ''}
          </option>
        ))}
      </select>
    </div>
  );
}

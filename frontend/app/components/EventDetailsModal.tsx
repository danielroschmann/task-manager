'use client';

type Event = {
  id: number;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  calenderId: number;
};

type EventDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
};

export default function EventDetailsModal({
  isOpen,
  onClose,
  event,
}: EventDetailsModalProps) {
  if (!isOpen || !event) return null;

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const start = formatDateTime(event.startDate);
  const end = formatDateTime(event.endDate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Date
            </label>
            <p className="text-gray-800">{start.date}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Start Time
              </label>
              <p className="text-gray-800">{start.time}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                End Time
              </label>
              <p className="text-gray-800">{end.time}</p>
            </div>
          </div>

          {event.description && (
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Description
              </label>
              <p className="text-gray-800 whitespace-pre-wrap">{event.description}</p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

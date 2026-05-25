'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCalendarForm() {
  const [ name, setName ] = useState("");
  const [ isMain, setIsMain ] = useState(false);
  const router = useRouter();
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    await fetch (`${apiUrl}/calender`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        isMain
      })
    });
    setName("");
    setIsMain(false);
    setIsSubmitting(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Calendar title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          disabled={isSubmitting}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isMain"
            checked={isMain}
            onChange={(e) => setIsMain(e.target.checked)}
            disabled={isSubmitting}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label htmlFor="isMain" className="text-sm text-gray-700">
            Set as main calendar
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font medium"
          >
            {isSubmitting ? "Adding..." : "Add Calendar"}
           </button>
        </div>
      </div>
    </form>
  );
}

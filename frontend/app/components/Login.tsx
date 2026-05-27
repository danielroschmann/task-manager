'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Login() {
  const pathname = usePathname();
  return (
    <button
      className="relative w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5"
    >Login
    </button>
  );
}

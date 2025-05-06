import { FiShield } from "react-icons/fi";
import Link from "next/link";

export default function HeaderCard() {
  return (
    <div className="rounded-lg p-6 flex flex-col items-center relative">
      <Link href="/admin" passHref>
        <button
          className="absolute top-4 right-4 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          title="Go to Admin Panel"
        >
          <FiShield className="text-lg" />
          <span className="hidden sm:inline">Admin</span>
        </button>
      </Link>

      <p className="mt-2 text-gray-600 dark:text-gray-300 text-center text-lg font-medium">
        Share your thoughts instantly and see others' feedback live!
      </p>
    </div>
  );
}

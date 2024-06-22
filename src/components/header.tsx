import Link from "next/link";
import UserProfile from "./profile/user-profile";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold" prefetch={false}>
        Note
      </Link>
      <UserProfile />
    </header>
  );
}

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <SignIn />
    </div>
  );
}

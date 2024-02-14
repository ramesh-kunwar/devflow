import { UserButton } from "@clerk/nextjs";

export default function Home() {
  // console.log("object");
  return (
    <div className="h-screen">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

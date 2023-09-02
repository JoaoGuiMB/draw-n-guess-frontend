import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-center items-center h-[8vh] p-2 w-full bg-nord-4">
      <Image src="/logo.png" alt="logo" width={128} height={128} />
    </header>
  );
}

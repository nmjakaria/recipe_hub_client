import Navbar from "@/components/Navbar";
import { Toast } from "@heroui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Toast.Provider placement="top end"
        width={380}
        gap={12}
        maxVisibleToasts={4}
        className="top-6 right-6" />
    </div>
  );
}

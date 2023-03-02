import React from "react";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center mt-20">
      <Image
        src="/logo.png"
        width={70}
        height={70}
        className="bg-gray-800 rounded-2xl"
      ></Image>
      <h1 className="text-6xl my-5">Whoops</h1>
      <h2 className="text-5xl my-5">The page does't exists.</h2>
    </div>
  );
}

NotFoundPage.layout = "Front";

"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}
const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  return (
    <div
      className={`relative flex min-h-[56px] grow items-center gap-4 rounded-[10px]  px-4 ${otherClasses} background-light800_darkgradient`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        value={""}
        onChange={(e) => {
          // setSearch(e.target.value);
        }}
        placeholder={placeholder}
        className="paragraph-regular no-focus 
          placeholder text-dark400_light700  border-none bg-transparent shadow-none outline-none "
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};
export default LocalSearchbar;

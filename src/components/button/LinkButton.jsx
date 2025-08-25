"use client";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

const LinkButton = ({ className, color, size, children, route }) => {
  const router = useRouter();
  return (
    <Button
      className={className}
      onClick={() => router.push(route)}
      color={color}
      size={size}
      pill
    >
      {children}
    </Button>
  );
};

export default LinkButton;

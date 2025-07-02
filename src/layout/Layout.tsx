import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className }: Props) => {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-background">
      <div
        className={cn(
          className,
          "flex flex-col justify-start mt-10 items-center gap-4 border-x border-gray-200 p-4",
          "mx-auto min-h-screen w-full lg:max-w-screen-2xl"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;

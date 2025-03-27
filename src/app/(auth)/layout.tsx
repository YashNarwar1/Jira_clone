"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: AuthLayoutProps) => {
  const pathName = usePathname();

  const isSignedIn = pathName === "/sign-in";

  return (
    <main className="min-h-screen bg-neutral-100 ">
      <div className="max-w-screen-2xl mx-auto p-4">
        <nav className="flex justify-between items-center ">
          <Image src="/logo.svg" alt="logo" width={152} height={56} />
          <div className="flex items-center gap-2">
            <Button asChild variant="secondary">
              <Link href={isSignedIn ? "/sign-up" : "/sign-in"}>
                {isSignedIn ? "Sign Up" : "Sign In"}
              </Link>
            </Button>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;

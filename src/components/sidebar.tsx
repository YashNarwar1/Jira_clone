import Image from "next/image";
import Link from "next/link";
import { DottedSeprator } from "./dottedSeprator";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspaceSwitcher";
import { Projects } from "./projects";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={164} height={48} />
      </Link>

      <DottedSeprator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeprator className="my-4" />
      <Navigation />

      <DottedSeprator className="my-4" />
      <Projects />
    </aside>
  );
};

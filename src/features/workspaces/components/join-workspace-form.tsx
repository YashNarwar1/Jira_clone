"use client";

import { DottedSeprator } from "@/components/dottedSeprator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import Router from "next/router";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}

export const JoinWorkspaceForm = ({
  initialValues,
}: JoinWorkspaceFormProps) => {
  const workspaceId = useWorkspaceId();
  const inviteCode = useInviteCode();
  const { mutate, isPending } = useJoinWorkspace();

  const router = useRouter();
  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>{initialValues.name}</strong>{" "}
          workspace.
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeprator />
        <CardContent className="p-7">
          <div className="flex flex-col gap-2 lg:flex-row items-center justify-between">
            <Button
              variant="secondary"
              type="button"
              asChild
              size="lg"
              disabled={isPending}
              className="w-full lg:w-fit">
              <Link href="/">Cancel</Link>
            </Button>
            <Button
              size="lg"
              type="button"
              className="w-full lg:w-fit"
              onClick={onSubmit}
              disabled={isPending}>
              Join workspace
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateWorkspaceSchema } from "../scehma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeprator } from "@/components/dottedSeprator";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConfirm } from "@/hooks/use-confirm";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeftIcon, CopyIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "../types";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { toast } from "sonner";
import { useResetInviteCode } from "../api/use-reset-invite-code";

interface EditWorkspaceFormProps {
  onClose?: () => void;
  initialValues: Workspace;
}

export const EditWorkspaceForm = ({
  onClose,
  initialValues,
}: EditWorkspaceFormProps) => {
  const { mutate, isPending } = useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useDeleteWorkspace();

  const { mutate: resetInviteCode, isPending: isResettingInviteCode } =
    useResetInviteCode();

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Workspace",
    "This action cannot be undone",
    "destructive"
  );

  const [ResetDialog, confirmReset] = useConfirm(
    "Reset invite link",
    "This will invalidate current invite link",
    "destructive"
  );

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;
    deleteWorkspace(
      { param: { workspaceId: initialValues.$id } },
      {
        onSuccess: () => {
          window.location.href = "/";
        },
      }
    );
  };

  const handleResetInviteCode = async () => {
    const ok = await confirmReset();

    if (!ok) return;
    resetInviteCode({ param: { workspaceId: initialValues.$id } });
  };

  const fullInviteLink = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;

  const handleCopyInviteLink = () => {
    navigator.clipboard
      .writeText(fullInviteLink)
      .then(() => toast.success("Invite link copied to clipboard"));
  };

  const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    mutate({
      form: finalValues,
      param: { workspaceId: initialValues.$id },
    });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <ResetDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={
              onClose
                ? onClose
                : () => router.push(`/workspaces/${initialValues.$id}`)
            }>
            <ArrowLeftIcon className="size-4 mr-2" />
            Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeprator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter workspace name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              alt="avatar"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm"> Workspace-Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG, SVG, JPEG, max 1MB
                          </p>
                          <input
                            className="hidden"
                            type="file"
                            accept=".jpg, .png, .svg, .jpeg"
                            ref={inputRef}
                            disabled={isPending}
                            onChange={handleImageChange}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant="destructive"
                              size="sm"
                              className="w-fit mt-2"
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }} // very curious
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant="teritary"
                              size="sm"
                              className="w-fit mt-2"
                              onClick={() => inputRef.current?.click()} // very curious
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <DottedSeprator className="py-7" />
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  onClick={onClose}
                  size="lg"
                  variant="secondary"
                  disabled={isPending}
                  className={cn(!onClose && "invisible")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending} size="lg">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold"> Invite Members</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite link to add members to your workspace
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2 ">
                <Input disabled value={fullInviteLink} />
                <Button
                  onClick={handleCopyInviteLink}
                  variant="secondary"
                  className="size-12">
                  <CopyIcon className="size-6" />
                </Button>
              </div>
            </div>
            <DottedSeprator className="py-7" />
            <Button
              className="mt-6 w-full ml-auto"
              size="sm"
              variant="destructive"
              type="button"
              disabled={isPending || isResettingInviteCode}
              onClick={handleResetInviteCode}>
              Reset invite link
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold"> Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is a irreversible and will remove all
              associated data.
            </p>
            <DottedSeprator className="py-7" />

            <Button
              className="mt-6 w-full ml-auto"
              size="sm"
              variant="destructive"
              type="button"
              disabled={isPending || isDeletingWorkspace}
              onClick={handleDelete}>
              Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

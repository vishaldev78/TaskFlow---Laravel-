import * as AvatarPrimitive from "@radix-ui/react-avatar"
import * as React from "react"

import { cn } from "@/lib/utils"

const PROFILE_PLACEHOLDER_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnztI62VBiN4B7isTX3yjwcV2yf8MhSoqKaudnVDrSMA&s=10"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-6 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

function ProfileAvatar({
  firstName,
  className,
}: {
  firstName: string
  className?: string
}) {
  return (
    <Avatar className={cn("size-32.5 bg-yellow-400", className)}>
      <AvatarImage
        src={PROFILE_PLACEHOLDER_URL}
        alt="Profile placeholder"
        className="size-full object-cover object-center"
      />
      <AvatarFallback className="bg-yellow-400 px-2 text-center text-sm font-bold text-yellow-950">
        {firstName}
      </AvatarFallback>
    </Avatar>
  )
}

export { Avatar, AvatarImage, AvatarFallback, ProfileAvatar }

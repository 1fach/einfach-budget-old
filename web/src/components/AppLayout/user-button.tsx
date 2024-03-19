import {
  Muted,
  Small,
  Skeleton,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@einfach-ui/react'
import { css } from '@einfach-ui/styled/css'
import { HStack } from '@einfach-ui/styled/jsx'
import { ChevronRight } from 'lucide-react'

export type UserButtonProps = {
  readonly name: string
  readonly email: string
}

export function UserButton({ name, email }: UserButtonProps) {
  return (
    <button>
      <HStack>
        <Avatar>
          <AvatarImage
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            borderRadius="xl"
            alt="@nanopx"
          />
          <AvatarFallback>NP</AvatarFallback>
        </Avatar>

        <div style={{ flex: 1 }}>
          <Small className={css({ fontWeight: 'medium' })}>{name}</Small>

          <Muted>{email}</Muted>
        </div>

        <ChevronRight
          className={css({ height: '3.5', width: '3.5' })}
          stroke="1.5"
        />
      </HStack>
    </button>
  )
}

export function UserButtonSkeleton() {
  return (
    <button>
      <HStack>
        <Skeleton borderRadius="full" height="9" />
        <div className={css({ flex: 1 })}>
          <Skeleton height="4" width="24" borderRadius="xl" />
          <Skeleton height="3" width="36" mt="6px" borderRadius="xl" />
        </div>
      </HStack>
    </button>
  )
}

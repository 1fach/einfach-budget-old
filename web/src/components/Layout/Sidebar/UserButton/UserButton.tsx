import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Skeleton,
  rem,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'

type UserButtonProps = {
  name: string
  email: string
}

export function UserButton({ name, email }: UserButtonProps) {
  return (
    <UnstyledButton className="one-UserButton">
      <Group>
        <Avatar
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  )
}

export function UserButtonSkeleton() {
  return (
    <UnstyledButton className="one-UserButton">
      <Group>
        <Skeleton circle height={38} />
        <div style={{ flex: 1 }}>
          <Skeleton height={15} width={100} radius="xl" />
          <Skeleton height={12} width={150} mt={6} radius="xl" />
        </div>
      </Group>
    </UnstyledButton>
  )
}

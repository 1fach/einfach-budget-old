import {
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  rem,
} from '@mantine/core'
import {
  IconBulb,
  IconUser,
  IconCheckbox,
  IconSearch,
  IconPlus,
} from '@tabler/icons-react'

import { useAuth } from 'src/auth'
import UserCell from 'src/components/UserCell'

const links = [
  { icon: IconBulb, label: 'Activity', notifications: 3 },
  { icon: IconCheckbox, label: 'Tasks', notifications: 4 },
  { icon: IconUser, label: 'Contacts' },
]

const collections = [
  { emoji: '👍', label: 'Sales' },
  { emoji: '🚚', label: 'Deliveries' },
  { emoji: '💸', label: 'Discounts' },
  { emoji: '💰', label: 'Profits' },
  { emoji: '✨', label: 'Reports' },
  { emoji: '🛒', label: 'Orders' },
  { emoji: '📅', label: 'Events' },
  { emoji: '🙈', label: 'Debts' },
  { emoji: '💁‍♀️', label: 'Customers' },
]

export function Sidebar() {
  const { currentUser } = useAuth()

  console.log(useAuth())
  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className="one-Sidebar-mainLink">
      <div className="one-Sidebar-mainLinkInner">
        <link.icon
          size={20}
          className="one-Sidebar-mainLinkIcon"
          stroke={1.5}
        />
        <span>{link.label}</span>
      </div>
      {link.notifications > 0 && (
        <Badge size="sm" variant="filled" className="one-Sidebar-mainLinkBadge">
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ))

  const collectionLinks = collections.map((collection) => (
    <UnstyledButton
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className="one-Sidebar-collectionLink"
    >
      <span style={{ marginRight: rem(9), fontSize: rem(16) }}>
        {collection.emoji}
      </span>{' '}
      {collection.label}
    </UnstyledButton>
  ))

  return (
    <>
      <div className="one-Sidebar-section">
        <UserCell id={currentUser?.id} />
      </div>

      <TextInput
        placeholder="Search"
        size="xs"
        leftSection={
          <IconSearch
            style={{ width: rem(12), height: rem(12) }}
            stroke={1.5}
          />
        }
        rightSectionWidth={70}
        rightSection={<Code className="one-Sidebar-searchCode">Ctrl + K</Code>}
        styles={{ section: { pointerEvents: 'none' } }}
        mb="sm"
      />

      <div className="one-Sidebar-section">
        <div className="one-Sidebar-mainLinks">{mainLinks}</div>
      </div>

      <div className="one-Sidebar-section">
        <Group
          className="one-Sidebar-collectionsHeader"
          justify="space-between"
        >
          <Text size="xs" fw={500} c="dimmed">
            Collections
          </Text>
          <Tooltip label="Create collection" withArrow position="right">
            <ActionIcon variant="default" size={18}>
              <IconPlus
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>
        </Group>
        <div className="one-Sidebar-collections">{collectionLinks}</div>
      </div>
    </>
  )
}

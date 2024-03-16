import { Menubar, useTheme } from '@einfach-ui/react'

import { navigate, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

export const NavigationMenu = () => {
  const { isAuthenticated, logOut } = useAuth()
  const onLogin = () => navigate(routes.login())
  const { theme, setTheme } = useTheme()

  return (
    <Menubar.Root
      borderRadius="0"
      borderX="none"
      borderTop="none"
      borderBottomWidth="thin"
    >
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>
            New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item>
            New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item disabled>New Incognito Window</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Sub>
            <Menubar.SubTrigger>Share</Menubar.SubTrigger>
            <Menubar.SubContent>
              <Menubar.Item>Email link</Menubar.Item>
              <Menubar.Item>Messages</Menubar.Item>
              <Menubar.Item>Notes</Menubar.Item>
            </Menubar.SubContent>
          </Menubar.Sub>
          <Menubar.Separator />
          {isAuthenticated ? (
            <Menubar.Item onSelect={logOut}>Logout</Menubar.Item>
          ) : (
            <Menubar.Item onSelect={onLogin}>Sign in</Menubar.Item>
          )}
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>
            Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item>
            Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Separator />
          <Menubar.Sub>
            <Menubar.SubTrigger>Find</Menubar.SubTrigger>
            <Menubar.SubContent>
              <Menubar.Item>Search the web</Menubar.Item>
              <Menubar.Separator />
              <Menubar.Item>Find...</Menubar.Item>
              <Menubar.Item>Find Next</Menubar.Item>
              <Menubar.Item>Find Previous</Menubar.Item>
            </Menubar.SubContent>
          </Menubar.Sub>
          <Menubar.Separator />
          <Menubar.Item>Cut</Menubar.Item>
          <Menubar.Item>Copy</Menubar.Item>
          <Menubar.Item>Paste</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>View</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.CheckboxItem>Always Show Bookmarks Bar</Menubar.CheckboxItem>
          <Menubar.CheckboxItem checked>
            Always Show Full URLs
          </Menubar.CheckboxItem>
          <Menubar.Separator />
          <Menubar.Item insetLeft>
            Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item disabled insetLeft>
            Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item insetLeft>Toggle Fullscreen</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item insetLeft>Hide Sidebar</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Themes</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.RadioGroup value={theme} onValueChange={setTheme}>
            <Menubar.RadioItem value="system">System</Menubar.RadioItem>
            <Menubar.RadioItem value="light">Light</Menubar.RadioItem>
            <Menubar.RadioItem value="dark">Dark</Menubar.RadioItem>
          </Menubar.RadioGroup>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  )
}

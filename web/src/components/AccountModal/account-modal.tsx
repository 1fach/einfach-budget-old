import { Button, Input, Label, Dialog, Select } from '@einfach-ui/react'
import { Grid } from '@einfach-ui/styled/jsx'

export const AccountModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Add Account</Button>
      </Dialog.Trigger>
      <Dialog.Content sm={{ maxW: '425px' }}>
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you&apos;re done.
          </Dialog.Description>
        </Dialog.Header>
        <Grid gap="4" py="4">
          <Grid gridTemplateColumns="4" alignItems="center" gap="4">
            <Label htmlFor="name" textAlign="right">
              Nickname
            </Label>
            <Input id="name" gridColumn="3" onChange={() => {}} />
          </Grid>
          <Grid gridTemplateColumns="4" alignItems="center" gap="4">
            <Label htmlFor="current-balance" textAlign="right">
              Current Balance
            </Label>
            <Input
              id="current-balance"
              placeholder="0.00"
              gridColumn="3"
              onChange={() => {}}
            />
          </Grid>
          <Grid gridTemplateColumns="4" alignItems="center" gap="4">
            <Label htmlFor="account-type" textAlign="right">
              Account Type
            </Label>
            <AccountTypeDropdown />
          </Grid>
        </Grid>
        <Dialog.Footer>
          <Button type="submit">Save changes</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

const accountTypes = [
  {
    value: 'checking',
    label: 'Checking',
  },
  {
    value: 'credit',
    label: 'Credit',
  },
]

const AccountTypeDropdown = () => {
  return (
    <Select.Root>
      <Select.Trigger w="180px">
        <Select.Value placeholder="Type" />
      </Select.Trigger>
      <Select.Content>
        {accountTypes.map((type) => (
          <Select.Item key={type.value} value={type.value}>
            {type.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

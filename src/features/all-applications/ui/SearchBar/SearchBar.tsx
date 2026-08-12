import { TextInput } from '@mantine/core'
import { Icon } from '@iconify/react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <TextInput
      placeholder="Поиск по заявкам"
      value={value}
      h={42}
      onChange={(e) => onChange(e.currentTarget.value)}
      leftSection={<Icon icon="mdi:magnify" width={20} />}
      maw={300}
      error={undefined}
      style={{ marginBottom: 0 }}
    />
  )
}

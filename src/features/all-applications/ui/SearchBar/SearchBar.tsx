import { TextInput, Button, Group } from '@mantine/core'
import { Icon } from '@iconify/react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onFilterClick: () => void
}

export const SearchBar = ({
  value,
  onChange,
  onFilterClick,
}: SearchBarProps) => {
  return (
    <Group gap="md" wrap="nowrap">
      <TextInput
        placeholder="Поиск по заявкам"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        leftSection={<Icon icon="mdi:magnify" width={20} />}
        maw={300}
      />

      <Button
        variant="outline"
        leftSection={<Icon icon="line-md:filter" width={20} />}
        onClick={onFilterClick}
        ml="auto"
      >
        Настроить фильтрацию
      </Button>
    </Group>
  )
}

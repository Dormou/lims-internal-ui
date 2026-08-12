import { Group, Badge } from '@mantine/core'
import { Icon } from '@iconify/react'
import type { Filters } from '../../hooks/useFilters'
import { filterLabels } from '../../hooks/useFilters'

interface FilterChipsProps {
  filters: Filters
  onRemove: (key: keyof Filters, value: string) => void
  onClearAll: () => void
}

export const FilterChips = ({ filters, onRemove }: FilterChipsProps) => {
  const chips: { key: keyof Filters; value: string }[] = []

  Object.entries(filters).forEach(([key, values]) => {
    if (Array.isArray(values)) {
      values.forEach((value) => {
        chips.push({ key: key as keyof Filters, value })
      })
    } else if (values) {
      chips.push({ key: key as keyof Filters, value: values })
    }
  })

  if (chips.length === 0) return null

  return (
    <Group gap={8}>
      {chips.map((chip, idx) => (
        <Badge
          key={idx}
          variant="light"
          color="primaryBlue"
          rightSection={
            <Icon
              icon="mdi:close"
              width={14}
              style={{ cursor: 'pointer' }}
              onClick={() => onRemove(chip.key, chip.value)}
            />
          }
        >
          {filterLabels[chip.key]}: {chip.value}
        </Badge>
      ))}
    </Group>
  )
}
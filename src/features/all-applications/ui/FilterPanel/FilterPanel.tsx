import { useState } from 'react'
import { Drawer, Stack, MultiSelect, Button, Group, Text } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { Icon } from '@iconify/react'

import '@mantine/dates/styles.css'
import type { Filters } from '../../hooks/useFilters'
import { mockApplications } from '../../model/mockData'

interface FilterPanelProps {
  opened: boolean
  onClose: () => void
  filters: Filters
  onApply: (filters: Filters) => void
}

export const FilterPanel = ({
  opened,
  onClose,
  filters,
  onApply,
}: FilterPanelProps) => {
  const [tempFilters, setTempFilters] = useState<Filters>({ ...filters })

  const unique = (key: keyof (typeof mockApplications)[0]) =>
    [...new Set(mockApplications.map((a) => a[key]))]
      .filter(Boolean)
      .map((v) => ({ value: v as string, label: v as string }))

  const allTestTypes = [
    ...new Set(mockApplications.flatMap((a) => a.testTypes)),
  ].map((v) => ({ value: v, label: v }))

  return (
    <Drawer opened={opened} onClose={onClose} position="right" size="lg">
      <Stack gap="md">
        <Group gap={8}>
          <Icon
            icon="line-md:filter"
            width={24}
            color="var(--mantine-color-primaryBlue-6)"
          />
          <Text size="lg" fw={500}>
            Настройки фильтрации заявок
          </Text>
        </Group>
        <Group grow>
          <DateInput
            label="Дата создания (начало периода)"
            labelProps={{ fw: 300 }}
            value={
              tempFilters.createdAtFrom
                ? new Date(tempFilters.createdAtFrom)
                : null
            }
            onChange={(v) =>
              setTempFilters({
                ...tempFilters,
                createdAtFrom: v || undefined,
              })
            }
            clearable
            valueFormat="DD.MM.YYYY"
          />
          <DateInput
            label="Дата создания (конец периода)"
            labelProps={{ fw: 300 }}
            value={
              tempFilters.createdAtTo ? new Date(tempFilters.createdAtTo) : null
            }
            onChange={(v) =>
              setTempFilters({ ...tempFilters, createdAtTo: v || undefined })
            }
            clearable
            valueFormat="DD.MM.YYYY"
          />
        </Group>

        <Group grow>
          <DateInput
            label="Дата изменения (начало периода)"
            labelProps={{ fw: 300 }}
            value={
              tempFilters.updatedAtFrom
                ? new Date(tempFilters.updatedAtFrom)
                : null
            }
            onChange={(v) =>
              setTempFilters({
                ...tempFilters,
                updatedAtFrom: v || undefined,
              })
            }
            clearable
            valueFormat="DD.MM.YYYY"
          />
          <DateInput
            label="Дата изменения (конец периода)"
            labelProps={{ fw: 300 }}
            value={
              tempFilters.updatedAtTo ? new Date(tempFilters.updatedAtTo) : null
            }
            onChange={(v) =>
              setTempFilters({ ...tempFilters, updatedAtTo: v || undefined })
            }
            clearable
            valueFormat="DD.MM.YYYY"
          />
        </Group>
        <MultiSelect
          label="Заказчик"
          labelProps={{ fw: 300 }}
          data={unique('customer')}
          value={tempFilters.customer || []}
          onChange={(v) => setTempFilters({ ...tempFilters, customer: v })}
        />
        <MultiSelect
          label="Изготовитель"
          labelProps={{ fw: 300 }}
          data={unique('manufacturer')}
          value={tempFilters.manufacturer || []}
          onChange={(v) => setTempFilters({ ...tempFilters, manufacturer: v })}
        />
        <MultiSelect
          label="Тип оборудования"
          labelProps={{ fw: 300 }}
          data={unique('equipmentType')}
          value={tempFilters.equipmentType || []}
          onChange={(v) => setTempFilters({ ...tempFilters, equipmentType: v })}
        />
        <MultiSelect
          label="Вид испытаний"
          labelProps={{ fw: 300 }}
          data={allTestTypes}
          value={tempFilters.testTypes || []}
          onChange={(v) => setTempFilters({ ...tempFilters, testTypes: v })}
        />
        <MultiSelect
          label="Статус"
          labelProps={{ fw: 300 }}
          data={['Черновик', 'Сформирована', 'Отправлена'].map((v) => ({
            value: v,
            label: v,
          }))}
          value={tempFilters.status || []}
          onChange={(v) => setTempFilters({ ...tempFilters, status: v })}
        />
        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={() => setTempFilters({})}>
            Сбросить фильтры
          </Button>
          <Button
            onClick={() => {
              onApply(tempFilters)
              onClose()
            }}
          >
            Применить фильтры
          </Button>
        </Group>
      </Stack>
    </Drawer>
  )
}

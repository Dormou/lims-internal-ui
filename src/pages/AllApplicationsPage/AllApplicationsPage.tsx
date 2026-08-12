import { Box, Stack, Title, Group } from '@mantine/core'
import { StatsCards } from '@/features/all-applications/ui/StatsCards/StatsCards'
import { ApplicationsTable } from '@/features/all-applications/ui/ApplicationsTable/ApplicationsTable'
import { SearchBar } from '@/features/all-applications/ui/SearchBar/SearchBar'
import { FilterPanel } from '@/features/all-applications/ui/FilterPanel/FilterPanel'
import { FilterChips } from '@/features/all-applications/ui/FilterChips/FilterChips'
import { useFilters } from '@/features/all-applications/hooks/useFilters'
import { mockApplications } from '@/features/all-applications/model/mockData'

export const AllApplicationsPage = () => {
  const {
    search,
    setSearch,
    filters,
    setFilters,
    opened,
    setOpened,
    filtered,
    removeFilter,
    clearAllFilters,
  } = useFilters(mockApplications)

  return (
    <Box p="xl">
      <Stack gap="lg">
        <Title order={2} ta="center">
          Заявки на испытания
        </Title>

        <StatsCards />

        <Group gap="md" wrap="nowrap">
          <SearchBar
            value={search}
            onChange={setSearch}
            onFilterClick={() => setOpened(true)}
          />
          <FilterChips
            filters={filters}
            onRemove={removeFilter}
            onClearAll={clearAllFilters}
          />
        </Group>

        <FilterChips
          filters={filters}
          onRemove={removeFilter}
          onClearAll={clearAllFilters}
        />

        <ApplicationsTable applications={filtered} />

        <FilterPanel
          key={JSON.stringify(filters)}
          opened={opened}
          onClose={() => setOpened(false)}
          filters={filters}
          onApply={(newFilters) => {
            setFilters(newFilters)
            setOpened(false)
          }}
        />
      </Stack>
    </Box>
  )
}

import { Box, Stack, Title, Group, Button, Center, Loader, Text } from '@mantine/core'
import { Icon } from '@iconify/react'
import { StatsCards } from '@/features/all-applications/ui/StatsCards/StatsCards'
import { ApplicationsTable } from '@/features/all-applications/ui/ApplicationsTable/ApplicationsTable'
import { SearchBar } from '@/features/all-applications/ui/SearchBar/SearchBar'
import { FilterPanel } from '@/features/all-applications/ui/FilterPanel/FilterPanel'
import { FilterChips } from '@/features/all-applications/ui/FilterChips/FilterChips'
import { useFilters } from '@/features/all-applications/hooks/useFilters'
import { useGetAllApplicationsQuery } from '@/features/all-applications/api/AllApplicationsApi'

export const AllApplicationsPage = () => {
  const { data: applications = [], isLoading, error } = useGetAllApplicationsQuery()

  const {
    search,
    setSearch,
    filters,
    setFilters,
    opened,
    setOpened,
    filtered,
    removeFilter,
  } = useFilters(applications)

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="xl" />
      </Center>
    )
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text c="errorRed">Ошибка загрузки данных</Text>
      </Center>
    )
  }

  return (
    <Box p="xl">
      <Stack gap="lg">
        <Title order={2} ta="center">
          Заявки на испытания
        </Title>

        <StatsCards />

        <Group gap="md" wrap="nowrap" align="center">
          <SearchBar value={search} onChange={setSearch} />
          <FilterChips filters={filters} onRemove={removeFilter} />
          <Button
            variant="outline"
            leftSection={<Icon icon="line-md:filter" width={20} />}
            onClick={() => setOpened(true)}
            ml="auto"
            style={{ flexShrink: 0 }}
          >
            Настроить фильтрацию
          </Button>
        </Group>

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
          applications={applications}
        />
      </Stack>
    </Box>
  )
}
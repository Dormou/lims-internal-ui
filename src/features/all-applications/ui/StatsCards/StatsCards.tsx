// features/allApplications/ui/StatsCards/StatsCards.tsx
import { Group } from '@mantine/core'
import { mockStats } from '../../model/mockData'
import { StatsCard } from '../StatsCard/StatsCard'

export const StatsCards = () => {
  return (
    <Group grow>
      {mockStats.map((stat) => (
        <StatsCard
          key={stat.id}
          title={stat.title}
          value={'currentMonthValue' in stat ? stat.currentMonthValue : stat.value}
          unit={stat.unit}
          lastMonthValue={'lastMonthValue' in stat ? stat.lastMonthValue : undefined}
          badge={'badge' in stat ? stat.badge : undefined}
        />
      ))}
    </Group>
  )
}
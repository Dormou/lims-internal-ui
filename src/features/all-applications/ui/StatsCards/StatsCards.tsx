import { StatsCard } from '../StatsCard/StatsCard'
import { useGetApplicationsStatsQuery } from '../../api/AllApplicationsApi'

export const StatsCards = () => {
  const { data: stats } = useGetApplicationsStatsQuery()

  const totalApplications = stats?.[0]

  if (!totalApplications) return null

  return (
    <StatsCard
      title={totalApplications.title}
      value={totalApplications.currentMonthValue}
      unit={totalApplications.unit}
      lastMonthValue={totalApplications.lastMonthValue}
    />
  )
}
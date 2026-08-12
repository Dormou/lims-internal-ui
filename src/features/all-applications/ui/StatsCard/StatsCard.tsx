import { Paper, Text, Group, Stack, Badge, Box } from '@mantine/core'
import { Icon } from '@iconify/react'

interface StatsCardProps {
  title: string
  value: number
  unit: string
  lastMonthValue?: number
  badge?: {
    text: string
    type: 'neutral' | 'positive' | 'negative'
  }
}

export const StatsCard = ({ title, value, unit, lastMonthValue, badge }: StatsCardProps) => {
  return (
    <Paper radius="md" bg="lightGray" p="xs" maw={240}>
      {/* Белая внутренняя часть */}
      <Box
        bg="white"
        p="md"
        ta="center"
        style={{ borderRadius: 'calc(var(--mantine-radius-md) - 4px)' }}
      >
        <Stack gap="xs" align="center">
          <Text size="md" fw={400} c="primaryBlue">
            {title}
          </Text>

          <Group gap={4} justify="center" align="baseline">
            <Text size="xxl" fw={700} c="primaryBlue">
              {value}
            </Text>
            <Text size="xxl" fw={700} c="primaryBlue">
              {unit}
            </Text>
          </Group>
        </Stack>
      </Box>

      {/* Нижняя серая часть */}
      <Box p="sm" ta="center">
        <Group gap={8} justify="center">
          {lastMonthValue !== undefined && (
            <Badge
              color="dimmed"
              fw={300}
              rightSection={
                <Icon
                  icon="lucide:chevron-up"
                  width={14}
                  color="var(--mantine-color-primaryBlue-6)"
                />
              }
              styles={{
                label: { color: 'var(--mantine-color-black-6)', textTransform: 'none' },
              }}
            >
              {value > lastMonthValue
                ? `на ${value - lastMonthValue} больше`
                : `на ${lastMonthValue - value} меньше`}
              , чем в прошлом месяце
            </Badge>
          )}

          {badge && (
            <Badge
              color="dimmed"
              fw={300}
              rightSection={
                badge.type !== 'neutral' ? (
                  <Icon
                    icon={badge.type === 'positive' ? 'lucide:chevron-up' : 'lucide:chevron-down'}
                    width={14}
                    color="var(--mantine-color-primaryBlue-6)"
                  />
                ) : undefined
              }
              styles={{
                label: { color: 'var(--mantine-color-black-6)', textTransform: 'none' },
              }}
            >
              {badge.text}
            </Badge>
          )}
        </Group>
      </Box>
    </Paper>
  )
}
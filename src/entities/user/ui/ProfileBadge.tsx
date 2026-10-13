import { Avatar, Group, Stack, Title, Text } from '@mantine/core'
import { Icon } from '@iconify/react'
import { formatDate } from '@/shared/lib'
import { useGetProfileQuery } from '../api/userApi'

export const ProfileBadge = () => {
  const { data } = useGetProfileQuery()

  if (!data) return null

  return (
    <Group gap={24}>
      <Avatar size={80} radius="xl" color="primaryBlue">
        <Icon icon="mdi:user" width={40} />
      </Avatar>
      <Stack gap={4}>
        <Title order={1}>
          {`${data.profile.fullName.lastName} ${data.profile.fullName.firstName} ${data.profile.fullName.patronymic || ''}`}
        </Title>
        <Text c="dimmed" size="sm">
          Дата регистрации:
          {data.profile.registrationDate
            ? formatDate(data.profile.registrationDate)
            : ''}
        </Text>
      </Stack>
    </Group>
  )
}

// features/all-applications/ui/ApplicationsTable/ApplicationsTable.tsx
import { ScrollArea, Table, Text, Stack } from '@mantine/core'
import type { Application } from '../../api/types'
import { formatDate } from '@/shared/lib/formatDate'
import { FileCard } from '@/shared/ui/file-card/FileCard'

interface ApplicationsTableProps {
  applications: Application[]
}

export const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
  return (
    <ScrollArea mt="xl">
      <Table variant="simple" withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr bg="complementaryBlue">
            <Table.Th>Дата создания</Table.Th>
            <Table.Th>Последнее изменение</Table.Th>
            <Table.Th>Заказчик</Table.Th>
            <Table.Th>Изготовитель</Table.Th>
            <Table.Th>Контактное лицо по техническим вопросам</Table.Th>
            <Table.Th>Тип оборудования</Table.Th>
            <Table.Th>Виды испытаний</Table.Th>
            <Table.Th>Статус</Table.Th>
            <Table.Th>Документы по заявке</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {applications.map((app) => (
            <Table.Tr key={app.applicationId}>
              <Table.Td>
                <Text size="sm" c="black">
                  {formatDate(app.createdAt)}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="black">
                  {formatDate(app.updatedAt)}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="black">
                  {app.applicant}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="black">
                  {app.producer || '—'}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="black">
                  {app.techContact || '—'}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="black">
                  {app.equipmentType || '—'}
                </Text>
              </Table.Td>
              <Table.Td>
                <Stack gap={2}>
                  {app.tests.map((test, idx) => (
                    <Text key={idx} size="sm" c="black">
                      {test}
                    </Text>
                  ))}
                </Stack>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="black">
                  {app.status}
                </Text>
              </Table.Td>
              <Table.Td>
                {app.document ? (
                  <FileCard
                    key={app.document.documentId}
                    fileName={app.document.fileName}
                    fileSize={Number(app.document.fileSize)}
                    fileType={app.document.fileExtension}
                    showMeta
                    onPreview={() =>
                      console.log('Открыть', app.document?.fileName)
                    }
                    onDownload={() =>
                      console.log('Скачать', app.document?.fileName)
                    }
                  />
                ) : (
                  <Text size="sm" c="dimmed">
                    —
                  </Text>
                )}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  )
}

// features/allApplications/ui/ApplicationsTable/ApplicationsTable.tsx
import { ScrollArea, Table, Text, Stack } from '@mantine/core'
import { type Application } from '../../model/mockData'
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
            <Table.Tr key={app.id}>
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
                  {app.customer}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="black">
                  {app.manufacturer}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="black">
                  {app.contactPerson}
                </Text>
                <Text size="xs" c="black">
                  {app.contactEmail}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="black">
                  {app.equipmentType}
                </Text>
              </Table.Td>
              <Table.Td>
                <Stack gap={2}>
                  {app.testTypes.map((test, idx) => (
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
                <Stack gap={8}>
                  {app.documents.map((doc) => (
                    <FileCard
                      key={doc.id}
                      fileName={doc.fileName}
                      fileSize={doc.fileSize}
                      fileType={doc.fileType}
                      showMeta={doc.type !== 'draft'}
                      onPreview={
                        doc.type === 'draft' || doc.type === 'signed'
                          ? () => console.log('Открыть', doc.fileName)
                          : undefined
                      }
                      onDownload={
                        doc.type !== 'draft'
                          ? () => console.log('Скачать', doc.fileName)
                          : undefined
                      }
                    />
                  ))}
                </Stack>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  )
}

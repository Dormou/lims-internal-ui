import { ScrollArea, Table, Text, Stack } from '@mantine/core'
import type { Application } from '../../api/types'
import { formatDate } from '@/shared/lib/formatDate'
import { FileCard } from '@/shared/ui/file-card/FileCard'
import {
  downloadRawFile,
  downloadSignedFile,
  downloadDocumentsArchive,
  previewSignedFile,
} from '../../api/AllApplicationsApi'

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
                  <Stack gap={8}>
                    <FileCard
                      key={app.document.documentId}
                      fileName={app.document.fileName}
                      fileSize={Number(app.document.fileSize)}
                      fileType={app.document.fileExtension}
                      showMeta
                      onPreview={() => {
                        if (app.status === 'Черновик') {
                          console.log('Просмотр черновика')
                        } else if (app.status === 'Отправлена') {
                          previewSignedFile(app.applicationId)
                        }
                      }}
                      onDownload={
                        app.status === 'Сформирована'
                          ? () =>
                              downloadRawFile(
                                app.applicationId,
                                app.document!.fileName
                              )
                          : app.status === 'Отправлена'
                            ? () =>
                                downloadSignedFile(
                                  app.applicationId,
                                  app.document!.fileName
                                )
                            : undefined
                      }
                    />

                    {/* Архив — только для статуса "Отправлена" */}
                    {app.status === 'Отправлена' && (
                      <FileCard
                        fileName="Архив документов"
                        fileSize={0}
                        fileType="zip"
                        showMeta={false}
                        onDownload={() =>
                          downloadDocumentsArchive(app.applicationId)
                        }
                      />
                    )}
                  </Stack>
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

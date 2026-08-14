import { useState } from 'react'
import { ScrollArea, Table, Text, Stack } from '@mantine/core'
import type { Application, ApplicationDraftResponse } from '../../api/types'
import { formatDate } from '@/shared/lib/formatDate'
import { FileCard } from '@/shared/ui/file-card/FileCard'
import {
  downloadRawFile,
  downloadSignedFile,
  downloadDocumentsArchive,
  previewSignedFile,
  previewRawFile,
  useLazyGetApplicationDraftQuery,
} from '../../api/AllApplicationsApi'
import { DraftModal } from '../DraftModal/DraftModat'

interface ApplicationsTableProps {
  applications: Application[]
}

export const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
  const [getDraft, { isLoading: isDraftLoading }] =
    useLazyGetApplicationDraftQuery()
  const [draftData, setDraftData] = useState<ApplicationDraftResponse | null>(
    null
  )
  const [draftOpened, setDraftOpened] = useState(false)

  const handlePreviewDraft = async (applicationId: string) => {
    try {
      const draft = await getDraft(applicationId).unwrap()
      setDraftData(draft)
      setDraftOpened(true)
    } catch (e) {
      console.error('Ошибка загрузки черновика:', e)
    }
  }

  return (
    <>
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
            {applications.map((app) => {
              const isPdf =
                app.document?.fileExtension.toLowerCase() === '.pdf'

              return (
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
                          {typeof test === 'string' ? test : test.name}
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
                    {app.status === 'Черновик' ? (
                      <FileCard
                        fileName="Черновик заявки"
                        fileSize={0}
                        fileType="draft"
                        showMeta={false}
                        onPreview={() => handlePreviewDraft(app.applicationId)}
                      />
                    ) : app.document ? (
                      <Stack gap={8}>
                        <FileCard
                          key={app.document.documentId}
                          fileName={app.document.fileName}
                          fileSize={Number(app.document.fileSize)}
                          fileType={app.document.fileExtension}
                          showMeta
                          onPreview={
                            isPdf
                              ? app.status === 'Отправлена'
                                ? () => previewSignedFile(app.applicationId)
                                : () => previewRawFile(app.applicationId)
                              : undefined
                          }
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
              )
            })}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <DraftModal
        opened={draftOpened}
        onClose={() => setDraftOpened(false)}
        draft={draftData}
        isLoading={isDraftLoading}
      />
    </>
  )
}
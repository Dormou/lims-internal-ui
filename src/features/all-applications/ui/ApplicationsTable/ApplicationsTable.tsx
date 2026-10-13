import { useState } from 'react'
import { ScrollArea, Table, Text, Stack, Button } from '@mantine/core'
import type { Application, ApplicationDraftResponse } from '../../api/types'
import { formatDate } from '@/shared/lib/formatDate'
import { FileCard } from '@/shared/ui/file-card/FileCard'
import {
  downloadAnyFile,
  downloadDocumentsArchive,
  previewAnyFile,
  previewRawFile,
  useLazyGetApplicationDraftQuery,
} from '../../api/AllApplicationsApi'
import { DraftModal } from '../DraftModal/DraftModat'
import { LaboratoryDocumentsModal } from '../LaboratoryDocumentsModal/LaboratoryDocumentsModal'

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

  const [selectedApp, setSelectedApp] = useState<Application | null>(null)

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
              <Table.Th>Исходящие документы</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {applications.map((app) => {
              const isPdf =
                app.rawDocument?.fileExtension.toLowerCase() === '.pdf'

              return (
                <Table.Tr key={app.orderId}>
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
                        onPreview={() => handlePreviewDraft(app.orderId)}
                      />
                    ) : app.rawDocument ? (
                      <Stack gap={8}>
                        <FileCard
                          key={app.rawDocument.documentId}
                          fileName={app.rawDocument.fileName}
                          fileSize={Number(app.rawDocument.fileSize)}
                          fileType={app.rawDocument.fileExtension}
                          showMeta
                          onPreview={
                            isPdf
                              ? app.status === 'Отправлена'
                                ? () =>
                                    previewAnyFile(
                                      app.orderId,
                                      app.signedDocument!.documentId
                                    )
                                : () =>
                                    previewRawFile(
                                      app.orderId,
                                      app.rawDocument!.documentId
                                    )
                              : undefined
                          }
                          onDownload={
                            app.status === 'Сформирована'
                              ? () =>
                                  downloadAnyFile(
                                    app.orderId,
                                    app.rawDocument!.documentId,
                                    app.rawDocument!.fileName
                                  )
                              : app.status === 'Отправлена'
                                ? () =>
                                    downloadAnyFile(
                                      app.orderId,
                                      app.rawDocument!.documentId,
                                      app.rawDocument!.fileName
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
                              downloadDocumentsArchive(app.orderId)
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
                  <Table.Td>
                    <Stack>
                      <Text ta="center">
                        Всего направлено:{' '}
                        <Text span>{app.laboratoryDocuments.length}</Text>
                      </Text>
                      <Button
                        size="sm"
                        variant="outline"
                        m="auto"
                        onClick={() => setSelectedApp(app)}
                      >
                        Список документов
                      </Button>
                    </Stack>
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

      <LaboratoryDocumentsModal
        opened={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        application={selectedApp}
      />
    </>
  )
}

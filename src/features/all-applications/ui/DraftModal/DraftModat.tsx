import { Modal, Tabs, Stack, Text, Group } from '@mantine/core'
import type { ApplicationDraftResponse } from '../../api/types'
import { formatDate } from '@/shared/lib/formatDate'
import { FileCard } from '@/shared/ui/file-card/FileCard'

interface DraftModalProps {
  opened: boolean
  onClose: () => void
  draft: ApplicationDraftResponse | null
  isLoading?: boolean
}

export const DraftModal = ({ opened, onClose, draft }: DraftModalProps) => {
  if (!draft) return null

  const draftData = draft.draft

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      title={`Заявка от ${formatDate(draft.updatedAt)}`}
      styles={{
        title: { fontSize: '24px', fontWeight: 500 },
        body: { maxHeight: '80vh', overflow: 'auto' },
      }}
    >
      <Tabs defaultValue="general">
        <Tabs.List>
          <Tabs.Tab value="general">Общая информация</Tabs.Tab>
          <Tabs.Tab value="samples">Испытания</Tabs.Tab>
          <Tabs.Tab value="documents">Документы</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general" pt="xl">
          <Stack gap="md">
            <Group>
              <Text fw={500} w={250}>
                Статус:
              </Text>
              <Text>{draft.status}</Text>
            </Group>
            <Group>
              <Text fw={500} w={250}>
                Изготовитель:
              </Text>
              <Text>{draftData?.producerName || '—'}</Text>
            </Group>
            <Group>
              <Text fw={500} w={250}>
                Адрес изготовителя:
              </Text>
              <Text>{draftData?.producerAddress || '—'}</Text>
            </Group>
            <Group>
              <Text fw={500} w={250}>
                Технический документ:
              </Text>
              <Text>{draftData?.techDocumentName || '—'}</Text>
            </Group>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="documents" pt="xl">
          <Stack gap="sm">
            {/* Регламентирующий документ */}
            {draft.regulatoryDocument ? (
              <FileCard
                fileName={draft.regulatoryDocument.fileName}
                fileSize={Number(draft.regulatoryDocument.fileSize)}
                fileType={draft.regulatoryDocument.fileExtension}
                showMeta
                onPreview={() =>
                  console.log('Просмотр', draft.regulatoryDocument?.fileName)
                }
                onDownload={() =>
                  console.log('Скачать', draft.regulatoryDocument?.fileName)
                }
              />
            ) : (
              <Text c="dimmed">Регламентирующий документ отсутствует</Text>
            )}

            {/* Дополнительные документы */}
            {draft.additionalDocuments.length > 0 ? (
              draft.additionalDocuments.map((doc) => (
                <FileCard
                  key={doc.documentId}
                  fileName={doc.fileName}
                  fileSize={Number(doc.fileSize)}
                  fileType={doc.fileExtension}
                  showMeta
                  onPreview={() => console.log('Просмотр', doc.fileName)}
                  onDownload={() => console.log('Скачать', doc.fileName)}
                />
              ))
            ) : (
              <Text c="dimmed">Дополнительных документов нет</Text>
            )}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="samples" pt="xl">
          <Stack gap="sm">
            {draftData?.samples?.length ? (
              draftData.samples.map((sample, idx) => (
                <Text key={idx}>
                  {typeof sample === 'string' ? sample : sample.name}
                </Text>
              ))
            ) : (
              <Text c="dimmed">Испытаний нет</Text>
            )}
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  )
}

import {
  Button,
  Group,
  Modal,
  ScrollArea,
  Table,
  Text,
  TextInput,
} from '@mantine/core'
import type { Application } from '../../api/types'
import { formatDate } from '@/shared/lib'
import { FileCard } from '@/shared/ui'
import { useState } from 'react'
import { FileUploader } from '@/shared/ui/file-uploader/FileUploader'

export const LaboratoryDocumentsModal = ({
  opened,
  onClose,
  application,
}: {
  opened: boolean
  onClose: () => void
  application: Application | null
}) => {
  const downloadDocument = (documentId: string) => {
    console.log('Скачивание документа')
  }

  const handlePreview = (documentId: string) => {
    console.log('Просмотр документа')
  }

  const handleDelete = (documentId: string) => {
    console.log('Удаление документа')
  }

  const [comment, setComment] = useState('')
  const [documentFile, setDocumentFile] = useState<File | null>(null)

  if (!application) return null

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="70%"
      title="Исходящие документы"
      styles={{
        title: {
          fontSize: '24px',
          fontWeight: 500,
          textAlign: 'center',
          flex: 1,
        },
        body: { maxHeight: '80vh', overflow: 'auto' },
      }}
      scrollAreaComponent={ScrollArea.Autosize}
      centered
    >
      <Table horizontalSpacing="lg" verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr bg="lightGray">
            <Table.Th ta="center" w={100} style={{ borderTopLeftRadius: 8 }}>
              <Text size="sm" fw={400}>
                Дата загрузки
              </Text>
            </Table.Th>
            <Table.Th ta="center">
              <Text size="sm" fw={400}>
                Комментарий
              </Text>
            </Table.Th>
            <Table.Th ta="center" w={450} style={{ borderTopRightRadius: 8 }}>
              <Text size="sm" fw={400}>
                Документ
              </Text>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {application.laboratoryDocuments.length <= 0 && (
            <Table.Tr>Не направлено ни одного документа</Table.Tr>
          )}
          {application.laboratoryDocuments.length > 0 &&
            application.laboratoryDocuments.map((doc, index) => (
              <Table.Tr key={`lab-doc-${index}`}>
                <Table.Td>
                  <Text size="sm" fw={500} ta="center">
                    {formatDate(doc.document.createdAt) || 'Дата неизвестна'}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={500}>
                    {doc.comment}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <FileCard
                    fileName={doc.document.fileName}
                    fileSize={
                      parseInt(doc.document.fileSize.split(' ')[0]) * 1024
                    }
                    fileType={doc.document.fileExtension}
                    onDownload={() => downloadDocument(doc.document.documentId)}
                    onPreview={() => handlePreview(doc.document.documentId)}
                    onDelete={() => handleDelete(doc.document.documentId)}
                  />
                </Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>

      <TextInput
        label="Комментарий"
        placeholder="Введите комментарий"
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {documentFile ? (
        <FileCard
          fileName={documentFile.name}
          fileSize={documentFile.size}
          fileType={documentFile.name.split('.').pop() || ''}
          onDelete={() => setDocumentFile(null)}
        />
      ) : (
        <FileUploader
          filesCountLimit={1}
          maxFileSize={10 * 1024 * 1024}
          allowedFileTypes={['.pdf', '.doc']}
          orientation="vertical"
          onFilesSelected={(files) =>
            setDocumentFile(files.length > 0 ? files[0] : null)
          }
        />
      )}

      <Group gap="md" mt="xl" justify="center">
        <Button variant="outline" size="lg" onClick={() => onClose()}>
          Отмена
        </Button>
        <Button
          variant="filled"
          size="lg"
          disabled={comment.trim() === '' || !documentFile}
        >
          Направить документ
        </Button>
      </Group>
    </Modal>
  )
}

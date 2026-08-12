import { Box, Text, Group, ActionIcon } from '@mantine/core'
import { Icon } from '@iconify/react'

import { formatFileSize } from '@/shared/lib/formatFileSize'
import styles from './FileCard.module.css'

interface FileCardProps {
  fileName: string
  fileSize?: number
  fileType?: string
  showMeta?: boolean
  onPreview?: () => void
  onDownload?: () => void
  onDelete?: () => void
}

/**
 * Карточка файла с иконками действий
 *
 * @description
 * Отображает информацию о файле и кнопки действий.
 * Кнопка показывается только если передан соответствующий колбэк.
 *
 * @param fileName - Имя файла
 * @param fileSize - Размер файла в байтах (необязательно для черновика)
 * @param fileType - Расширение файла (необязательно для черновика)
 * @param showMeta - Показывать размер и расширение (true по умолчанию)
 * @param onPreview - Колбэк для просмотра файла
 * @param onDownload - Колбэк для скачивания файла
 * @param onDelete - Колбэк для удаления файла
 *
 * @example
 * ```tsx
 * // Черновик — без размера и расширения
 * <FileCard
 *   fileName="Черновик заявки"
 *   showMeta={false}
 *   onPreview={() => console.log('Открыть')}
 * />
 *
 * // Обычный файл
 * <FileCard
 *   fileName="Документация.pdf"
 *   fileSize={2048000}
 *   fileType="pdf"
 *   onPreview={() => console.log('Открыть')}
 *   onDownload={() => console.log('Скачать')}
 * />
 * ```
 */
export const FileCard = ({
  fileName,
  fileSize,
  fileType,
  showMeta = true,
  onPreview,
  onDownload,
  onDelete,
}: FileCardProps) => {
  return (
    <Box display="flex" px={16} py={12} className={styles.fileCard}>
      <Group gap={12} wrap="nowrap">
        <Icon
          icon="mdi:file-multiple-outline"
          width={24}
          color="var(--mantine-color-primaryBlue-6)"
        />

        <Box>
          <Text size="sm" fw={400} lineClamp={1}>
            {fileName}
          </Text>
          {showMeta && fileType && (
            <Text size="xs" c="dimmed">
              {fileType.toUpperCase()}
              {fileSize ? ` • ${formatFileSize(fileSize)}` : ''}
            </Text>
          )}
        </Box>
      </Group>
      <Group gap={4} wrap="nowrap">
        {onPreview && (
          <ActionIcon variant="outline" size="lg" onClick={onPreview}>
            <Icon icon="mdi:eye-outline" width={20} />
          </ActionIcon>
        )}

        {onDownload && (
          <ActionIcon variant="outline" size="lg" onClick={onDownload}>
            <Icon icon="mdi:download-outline" width={20} />
          </ActionIcon>
        )}

        {onDelete && (
          <ActionIcon variant="outline" size="lg" onClick={onDelete}>
            <Icon icon="mdi:delete-outline" width={20} />
          </ActionIcon>
        )}
      </Group>
    </Box>
  )
}
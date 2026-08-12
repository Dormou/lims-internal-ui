/** Маппинг расширений файлов в MIME-типы */
export const EXTENSION_TO_MIME: Record<string, string[]> = {
  '.pdf': ['application/pdf'],
  '.doc': ['application/msword'],
  '.docx': [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  '.xls': ['application/vnd.ms-excel'],
  '.xlsx': [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
  '.csv': ['text/csv'],
  '.txt': ['text/plain'],
  '.zip': ['application/zip'],
}

/**
 * Конвертирует расширения файлов в массив MIME-типов для Dropzone
 * @param extensions - массив расширений (['.pdf', '.docx'])
 * @returns массив MIME-типов (['application/pdf', 'application/vnd...'])
 */
export const extensionsToMime = (extensions: string[]): string[] =>
  extensions.flatMap((ext) => EXTENSION_TO_MIME[ext] || [])

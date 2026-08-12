export const mockStats = [
  {
    id: 'total_applications',
    title: 'Количество заявок',
    currentMonthValue: 31,
    lastMonthValue: 28,
    unit: 'заявка',
  },
  {
    id: 'in_progress',
    title: 'Заявки в работе',
    value: 12,
    unit: 'шт.',
    badge: {
      text: 'актуально на сегодня',
      type: 'neutral' as const,
    },
  },
  {
    id: 'average_time',
    title: 'Ср. время обработки',
    value: 4.2,
    unit: 'дня',
    badge: {
      text: '-15% со ср. скорости',
      type: 'positive' as const,
    },
  },
] as const

export interface Application {
  id: string
  createdAt: string
  updatedAt: string
  customer: string
  manufacturer: string
  contactPerson: string
  contactEmail: string
  equipmentType: string
  testTypes: string[]
  status: 'Черновик' | 'Сформирована' | 'Отправлена'
  documents: ApplicationDocument[]
}

export interface ApplicationDocument {
  id: string
  fileName: string
  fileSize?: number
  fileType?: string
  type: 'draft' | 'formed' | 'signed' | 'archive'
}

export const mockApplications: Application[] = [
  {
    id: '1',
    createdAt: '2026-01-15T10:30:00',
    updatedAt: '2026-01-20T14:00:00',
    customer: 'Заказчик 1',
    manufacturer: 'Изготовитель 1',
    contactPerson: 'Васильев Василий Васильевич',
    contactEmail: 'test@test.ru',
    equipmentType: 'Силовые трансформаторы',
    testTypes: ['Вид испытаний 1', 'Вид испытаний 2'],
    status: 'Черновик',
    documents: [{ id: 'd1', fileName: 'Черновик заявки', type: 'draft' }],
  },
  {
    id: '2',
    createdAt: '2026-02-10T09:15:00',
    updatedAt: '2026-02-12T16:45:00',
    customer: 'Заказчик 2',
    manufacturer: 'Изготовитель 2',
    contactPerson: 'Васильев Василий Васильевич',
    contactEmail: 'test@test.ru',
    equipmentType: 'Силовые трансформаторы',
    testTypes: ['Вид испытаний 1'],
    status: 'Сформирована',
    documents: [
      {
        id: 'd2',
        fileName: 'Сформированная_заявка_2.pdf',
        fileSize: 2048000,
        fileType: 'pdf',
        type: 'formed',
      },
    ],
  },
  {
    id: '3',
    createdAt: '2026-03-05T11:00:00',
    updatedAt: '2026-03-10T08:30:00',
    customer: 'Заказчик 3',
    manufacturer: 'Изготовитель 1',
    contactPerson: 'Васильев Василий Васильевич',
    contactEmail: 'test@test.ru',
    equipmentType: 'Силовые трансформаторы',
    testTypes: ['Вид испытаний 1', 'Вид испытаний 2', 'Вид испытаний 3'],
    status: 'Отправлена',
    documents: [
      {
        id: 'd3',
        fileName: 'Подписанная_заявка_3.pdf',
        fileSize: 3072000,
        fileType: 'pdf',
        type: 'signed',
      },
      {
        id: 'd4',
        fileName: 'Архив_документов_3.zip',
        fileSize: 5120000,
        fileType: 'zip',
        type: 'archive',
      },
    ],
  },
  {
    id: '4',
    createdAt: '2026-04-01T13:45:00',
    updatedAt: '2026-04-01T13:45:00',
    customer: 'Заказчик 1',
    manufacturer: 'Изготовитель 3',
    contactPerson: 'Васильев Василий Васильевич',
    contactEmail: 'test@test.ru',
    equipmentType: 'Силовые трансформаторы',
    testTypes: ['Вид испытаний 2', 'Вид испытаний 3'],
    status: 'Черновик',
    documents: [{ id: 'd5', fileName: 'Черновик заявки', type: 'draft' }],
  },
  {
    id: '5',
    createdAt: '2026-04-15T10:00:00',
    updatedAt: '2026-04-18T12:30:00',
    customer: 'Заказчик 2',
    manufacturer: 'Изготовитель 2',
    contactPerson: 'Васильев Василий Васильевич',
    contactEmail: 'test@test.ru',
    equipmentType: 'Силовые трансформаторы',
    testTypes: ['Вид испытаний 1'],
    status: 'Сформирована',
    documents: [
      {
        id: 'd6',
        fileName: 'Сформированная_заявка_5.pdf',
        fileSize: 1024000,
        fileType: 'pdf',
        type: 'formed',
      },
    ],
  },
  {
    id: '6',
    createdAt: '2026-05-10T09:30:00',
    updatedAt: '2026-05-15T17:00:00',
    customer: 'Заказчик 3',
    manufacturer: 'Изготовитель 1',
    contactPerson: 'Васильев Василий Васильевич',
    contactEmail: 'test@test.ru',
    equipmentType: 'Силовые трансформаторы',
    testTypes: ['Вид испытаний 1', 'Вид испытаний 3'],
    status: 'Отправлена',
    documents: [
      {
        id: 'd7',
        fileName: 'Подписанная_заявка_6.pdf',
        fileSize: 4096000,
        fileType: 'pdf',
        type: 'signed',
      },
      {
        id: 'd8',
        fileName: 'Архив_документов_6.zip',
        fileSize: 8192000,
        fileType: 'zip',
        type: 'archive',
      },
    ],
  },
]

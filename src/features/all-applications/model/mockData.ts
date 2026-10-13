import type { Application, StatsResponse } from '../api/types'

export const mockStats: StatsResponse[] = [
  {
    name: 'total_applications',
    title: 'Количество заявок',
    currentMonthValue: 31,
    lastMonthValue: 28,
    unit: 'заявка',
  },
]

export const mockApplications: Application[] = [
  {
    applicationId: '1',
    createdAt: '2026-01-15T10:30:00',
    updatedAt: '2026-01-20T14:00:00',
    applicant: 'Заказчик 1',
    producer: 'Изготовитель 1',
    techContact: 'Васильев Василий Васильевич test@test.ru',
    equipmentType: 'Силовые трансформаторы',
    tests: [],
    status: 'Отправлена',
    document: null,
    laboratoryDocuments: [
      {
        comment: 'Комментарий к исходному документу',
        document: {
          documentId: 'doc1',
          applicationId: '1',
          fileName: 'Ответ на заявку от Наименование организации Дата',
          fileExtension: '.pdf',
          fileSize: '3.2 KB',
          createdAt: '2026-01-20T14:00:00',
        },
      },
    ],
  },
]

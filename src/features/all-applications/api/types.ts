export interface StatsResponse {
  id: string
  title: string
  value: number
  unit: string
  lastMonthValue?: number
  badge?: {
    text: string
    type: 'neutral' | 'positive' | 'negative'
  }
}

// Ответ — массив
export type StatsResponseData = StatsResponse[]
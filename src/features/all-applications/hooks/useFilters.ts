import { useState, useMemo } from 'react'
import type { Application } from '../api/types'

export interface Filters {
  applicant?: string[]
  producer?: string[]
  equipmentType?: string[]
  testTypes?: string[]
  status?: string[]
  createdAtFrom?: string
  createdAtTo?: string
  updatedAtFrom?: string
  updatedAtTo?: string
}

export const filterLabels: Record<keyof Filters, string> = {
  applicant: 'Заказчик',
  producer: 'Изготовитель',
  equipmentType: 'Тип оборудования',
  testTypes: 'Вид испытаний',
  status: 'Статус',
  createdAtFrom: 'Создана с',
  createdAtTo: 'Создана по',
  updatedAtFrom: 'Обновлена с',
  updatedAtTo: 'Обновлена по',
}

export const useFilters = (applications: Application[]) => {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<Filters>({})
  const [opened, setOpened] = useState(false)

  const filtered = useMemo(() => {
    let result = [...applications]

    // Поиск по текстовым полям (от 3 символов)
    if (search.length >= 3) {
      const lower = search.toLowerCase()
      result = result.filter(
        (app) =>
          app.applicant.toLowerCase().includes(lower) ||
          (app.producer || '').toLowerCase().includes(lower) ||
          (app.techContact || '').toLowerCase().includes(lower) ||
          (app.equipmentType || '').toLowerCase().includes(lower) ||
          app.tests.some((t) => {
            const testName = typeof t === 'string' ? t : t.name
            return testName.toLowerCase().includes(lower)
          })
      )
    }

    // Фильтры
    if (filters.applicant?.length) {
      result = result.filter((app) =>
        filters.applicant!.includes(app.applicant)
      )
    }
    if (filters.producer?.length) {
      result = result.filter(
        (app) => app.producer && filters.producer!.includes(app.producer)
      )
    }
    if (filters.equipmentType?.length) {
      result = result.filter(
        (app) =>
          app.equipmentType &&
          filters.equipmentType!.includes(app.equipmentType)
      )
    }
    if (filters.testTypes?.length) {
      result = result.filter((app) =>
        app.tests.some((t) => {
          const testName = typeof t === 'string' ? t : t.name
          return filters.testTypes!.includes(testName)
        })
      )
    }
    if (filters.status?.length) {
      result = result.filter((app) => filters.status!.includes(app.status))
    }

    // Фильтры по датам
    if (filters.createdAtFrom) {
      result = result.filter(
        (app) => new Date(app.createdAt) >= new Date(filters.createdAtFrom!)
      )
    }
    if (filters.createdAtTo) {
      result = result.filter(
        (app) => new Date(app.createdAt) <= new Date(filters.createdAtTo!)
      )
    }
    if (filters.updatedAtFrom) {
      result = result.filter(
        (app) => new Date(app.updatedAt) >= new Date(filters.updatedAtFrom!)
      )
    }
    if (filters.updatedAtTo) {
      result = result.filter(
        (app) => new Date(app.updatedAt) <= new Date(filters.updatedAtTo!)
      )
    }

    return result
  }, [applications, search, filters])

  const removeFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => {
      const current = prev[key]
      if (Array.isArray(current)) {
        return {
          ...prev,
          [key]: current.filter((v) => v !== value),
        }
      }
      return {
        ...prev,
        [key]: undefined,
      }
    })
  }

  const clearAllFilters = () => setFilters({})

  return {
    search,
    setSearch,
    filters,
    setFilters,
    opened,
    setOpened,
    filtered,
    removeFilter,
    clearAllFilters,
    filterLabels,
  }
}

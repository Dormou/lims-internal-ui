import { useState, useMemo } from 'react'
import type { Application } from '../model/mockData'

export interface Filters {
  customer?: string[]
  manufacturer?: string[]
  equipmentType?: string[]
  testTypes?: string[]
  status?: string[]
  createdAtFrom?: string
  createdAtTo?: string
  updatedAtFrom?: string
  updatedAtTo?: string
}

export const filterLabels: Record<keyof Filters, string> = {
  customer: 'Заказчик',
  manufacturer: 'Изготовитель',
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
          app.customer.toLowerCase().includes(lower) ||
          app.manufacturer.toLowerCase().includes(lower) ||
          app.contactPerson.toLowerCase().includes(lower) ||
          app.contactEmail.toLowerCase().includes(lower) ||
          app.equipmentType.toLowerCase().includes(lower) ||
          app.testTypes.some((t) => t.toLowerCase().includes(lower))
      )
    }

    // Фильтры
    if (filters.customer?.length) {
      result = result.filter((app) => filters.customer!.includes(app.customer))
    }
    if (filters.manufacturer?.length) {
      result = result.filter((app) => filters.manufacturer!.includes(app.manufacturer))
    }
    if (filters.equipmentType?.length) {
      result = result.filter((app) => filters.equipmentType!.includes(app.equipmentType))
    }
    if (filters.testTypes?.length) {
      result = result.filter((app) => app.testTypes.some((t) => filters.testTypes!.includes(t)))
    }
    if (filters.status?.length) {
      result = result.filter((app) => filters.status!.includes(app.status))
    }

    // Фильтры по датам
    if (filters.createdAtFrom) {
      result = result.filter((app) => new Date(app.createdAt) >= new Date(filters.createdAtFrom!))
    }
    if (filters.createdAtTo) {
      result = result.filter((app) => new Date(app.createdAt) <= new Date(filters.createdAtTo!))
    }
    if (filters.updatedAtFrom) {
      result = result.filter((app) => new Date(app.updatedAt) >= new Date(filters.updatedAtFrom!))
    }
    if (filters.updatedAtTo) {
      result = result.filter((app) => new Date(app.updatedAt) <= new Date(filters.updatedAtTo!))
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
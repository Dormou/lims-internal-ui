import type { UserInfo } from '../../model/types/userInfo'

// Функция для кодирования строки в Base64URL
const toBase64Url = (obj: object): string => {
  const str = JSON.stringify(obj)
  // Используем btoa для кодирования в Base64 и приводим к стандарту URL
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

export const generateMockJwt = (claims: UserInfo): string => {
  // 1. Стандартный заголовок JWT
  const header = { alg: 'HS256', typ: 'JWT' }

  const encodedHeader = toBase64Url(header)

  // 2. Клеймсы
  const encodedPayload = toBase64Url(claims)

  // 3. Фейковая подпись
  const mockSignature = 'fake_signature'

  // Собираем токен: Header.Payload.Signature
  return `${encodedHeader}.${encodedPayload}.${mockSignature}`
}

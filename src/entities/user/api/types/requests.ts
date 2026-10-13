export type RegisterUserRequest = {
  firstName: string
  lastName: string
  patronymic: string | null
  email: string
  organizationFullName: string
  organizationShortName: string | null
  innKpp: string | null
}

export type UpdateUserRequest = {
  firstName: string
  lastName: string
  patronymic: string | null
  phoneNumber: string | null
  iAmTechContact: boolean
}

export type UpdateOrganizationRequest = {
  organizationFullName: string
  organizationShortName: string | null
  organizationLegalAddress: string | null
  organizationPostalAddress: string | null
  innKpp: string
  ogrn: string | null
  organizationEmail: string | null
  organizationPhoneNumber: string | null
}

export type UpdateHeadRequest = {
  firstName: string | null
  lastName: string | null
  patronymic: string | null
  headPosition: string | null
  headDocument: string | null
}

export type AddTechContactRequest = {
  firstName: string
  lastName: string
  patronymic: string | null
  email: string
  phoneNumber: string | null
}

export type UpdateTechContactRequest = {
  techContactId: string
  firstName: string
  lastName: string
  patronymic: string | null
  email: string
  phoneNumber: string | null
}

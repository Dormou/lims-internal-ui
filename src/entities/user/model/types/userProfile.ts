export type UserProfile = {
  id: string
  fullName: {
    firstName: string
    lastName: string
    patronymic: string | null
  }
  registrationDate: string
  email: string
  phoneNumber: string | null

  organization: {
    fullName: string
    shortName: string | null
    legalAddress: string | null
    postalAddress: string | null
    innKpp: string
    ogrn: string | null
    email: string | null
    phoneNumber: string | null
  }

  headPerson: {
    firstName: string
    lastName: string
    patronymic: string | null
    position: string
    document: string | null
  } | null

  techContacts: TechContact[]
  iAmTechContact: boolean
}

export type TechContact = {
  techContactId: string
  fullName: {
    firstName: string
    lastName: string
    patronymic: string | null
  }
  email: string
  phoneNumber: string
  isAccountOwner: boolean
}

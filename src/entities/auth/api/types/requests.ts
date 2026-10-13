export type LoginRequest = {
  email: string
  password: string
}

export type RecoverPasswordRequest = {
  email: string
}

export type ChangePasswordRequest = {
  oldPassword: string
  newPassword: string
}

export type SetupPasswordRequest = {
  token: string
  password: string
}

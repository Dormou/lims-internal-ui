import type { UserProfile } from '../../model/types/userProfile'

export type GetProfileResponse = {
  profile: UserProfile
  passwordMetadata: {
    passwordSettingDate: string
  }
}

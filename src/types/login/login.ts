export interface baseType<T> {
  name: string
  age: number
  judge: boolean
  unset: T
}

export interface baseType2<T> {
  name?: string
  age?: number
  judge?: boolean
  unset?: T
}

export interface loginReq {
  account?: string
  password?: string
  verifyCode?: string
}

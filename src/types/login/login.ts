export interface baseType<T> {
  name: String
  age: Number
  judge: boolean
  unset: T
}

export interface baseType2<T> {
  name?: String
  age?: Number
  judge?: boolean
  unset?: T
}
export interface axiosConfig {
  url: string
  method: string
  data?: object
}

export interface loadingOptions {
  target?: object | string
  body?: boolean
  fullscreen?: boolean
  lock?: boolean
  text?: string
  spinner?: string
  background?: string
  customClass?: string
}

export type DefaultResponse = {
  message: string
}

export type ErrorResponse = {
  message: string
  errors?: { [key: string]: string }
}

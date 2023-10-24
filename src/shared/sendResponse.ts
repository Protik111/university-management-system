import { Response } from 'express'

type IApiReponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null //message is optional
  data?: T | null //data is optional
}

/**
 *
 * @returns - void
 */
const sendResponse = <T>(res: Response, data: IApiReponse<T>): void => {
  const responseData: IApiReponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null || undefined,
  }

  res.status(data.statusCode).json(responseData)
}

export default sendResponse

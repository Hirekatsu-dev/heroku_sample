import axios, { AxiosResponse, AxiosRequestConfig, CancelTokenSource } from 'axios'
import isPlainObject from 'is-plain-object'
import * as convertKeys from 'convert-keys'

const csrfToken = document.getElementsByName('csrf-token')[0]
const { location } = document

const enum HttpMethod {
  Get = 'Get',
  Post = 'Post',
  Patch = 'Patch',
  Delete = 'Delete',
}

interface Request {
  method: HttpMethod,
  path: string,
  data?: [string: any],
}

interface Response {
  resultCode: string,
  data: any
}

const defaultConfig: AxiosRequestConfig = {
  baseURL: process.env.VUE_APP_API_BASE_URL + '/api/' + location.pathname.split('/')[1],
  headers: {
    common: {
      'X-CSRF-Token': csrfToken
        ? csrfToken.getAttribute('content')
        : undefined,
      Accept: 'application/json'
    },
    'Content-Type': 'application/json',
    timeout: 5 * 1000 // 5s
  },
  responseType: 'json'
}

const appAxios = axios.create(defaultConfig)

appAxios.interceptors.request.use(request => {
  const { data } = request
  console.log({
    ...request,
    data: isPlainObject(data) ? convertKeys.toSnake(data) : data
  })
  return {
    ...request,
    data: isPlainObject(data) ? convertKeys.toSnake(data) : data
  }
})

// 受け取るレスポンスのキーをcamelCaseに変える
appAxios.interceptors.response.use(response => ({
  ...response,
  data: convertKeys.toCamel(response.data)
}))

export class Api {
  async fetchResponse (request: Request, cancelTokenSource?: CancelTokenSource): Promise<Response> {
    try {
      const axiosResponse = await this.fetchAxiosResponse(request, cancelTokenSource)

      if (axiosResponse.status < 200 || axiosResponse.status >= 400) {
        throw Error
      }

      const data = axiosResponse.data

      return data
    } catch (error) {
      // nop
      console.log(error)
      throw error
    }
  }

  fetchAxiosResponse (request: Request, cancelTokenSource ?: CancelTokenSource): Promise<AxiosResponse> {
    const { method, path, data } = request
    const config: AxiosRequestConfig = {}
    if (cancelTokenSource) {
      config.cancelToken = cancelTokenSource.token
    }
    console.log(request)
    switch (method) {
      case HttpMethod.Get:
        return appAxios.get(path, config)
      case HttpMethod.Post:
        return appAxios.post(path, data, config)
      case HttpMethod.Patch:
        return appAxios.patch(path, data, config)
      case HttpMethod.Delete:
        return appAxios.delete(path, config)
      default:
        throw new TypeError('Invalid HTTP method')
    }
  }

  async hello () {
    return await this.fetchResponse({
      method: HttpMethod.Get,
      path: 'hello'
    })
  }
}

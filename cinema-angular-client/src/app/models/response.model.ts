export interface ResponseModel<T> {
  data: T
  errors: string[]
}

export interface PageModel<T>{
 content: T[]
 totalElements: number
 totalPages: number

}

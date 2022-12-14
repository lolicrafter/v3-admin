import { request } from '@/utils/service'

export function Add(data: any) {
  return request({
    url: 'movie/add',
    method: 'post',
    data
  })
}
export function Update(data: any) {
  return request({
    url: 'movie/update',
    method: 'post',
    data
  })
}
export function Del(data: any) {
  return request({
    url: 'movie/del',
    method: 'post',
    data
  })
}

export function List(params: any) {
  return request({
    url: 'movie/list',
    method: 'get',
    params
  })
}
export function Detail(params: object) {
  return request({
    url: 'movie/detail',
    method: 'get',
    params
  })
}

import { request } from '@/utils/service'

export function Add(data: any) {
  return request({
    url: 'article/add',
    method: 'post',
    data
  })
}
export function Update(data: any) {
  return request({
    url: 'article/update',
    method: 'post',
    data
  })
}
export function Del(data: any) {
  return request({
    url: 'article/del',
    method: 'post',
    data
  })
}

export function List(params: any) {
  return request({
    url: 'article/list',
    method: 'get',
    params
  })
}
export function Detail(params: object) {
  return request({
    url: 'article/detail',
    method: 'get',
    params
  })
}

import { request } from '@/utils/service'

export function Add(data: any) {
  return request({
    url: 'novel/add',
    method: 'post',
    data
  })
}
export function Update(data: any) {
  return request({
    url: 'novel/update',
    method: 'post',
    data
  })
}
export function Del(data: any) {
  return request({
    url: 'novel/del',
    method: 'post',
    data
  })
}

export function List(params: any) {
  return request({
    url: 'novel/list',
    method: 'get',
    params
  })
}
export function Detail(params: object) {
  return request({
    url: 'novel/detail',
    method: 'get',
    params
  })
}

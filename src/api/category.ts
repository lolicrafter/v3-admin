import { request } from '@/utils/service'

export function Add(data: any) {
  return request({
    url: 'category/add',
    method: 'post',
    data
  })
}
export function Update(data: any) {
  return request({
    url: 'category/update',
    method: 'post',
    data
  })
}
export function Del(data: any) {
  return request({
    url: 'category/del',
    method: 'post',
    data
  })
}

export function List() {
  return request({
    url: 'category/list',
    method: 'get'
  })
}

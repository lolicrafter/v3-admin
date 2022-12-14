import { request } from '@/utils/service'

export function tagAdd(data: any) {
  return request({
    url: 'tags/add',
    method: 'post',
    data
  })
}
export function tagUpdate(data: any) {
  return request({
    url: 'tags/update',
    method: 'post',
    data
  })
}
export function tagDel(data: any) {
  return request({
    url: 'tags/del',
    method: 'post',
    data
  })
}

export function tagList() {
  return request({
    url: 'tags/list',
    method: 'get'
  })
}

import { axios } from '@/utils/request'

const api = {
  upload: '/serve/upload',
  remove: '/serve/removefile'
}

export function upload (data) {
  return axios({
    url: api.upload,
    method: 'post',
    data,
    heardes: { 'Content-Type': 'multipart/form-data' }
  })
}

export function remove (params) {
  return axios({
    url: api.remove,
    method: 'delete',
    data: params
  })
}

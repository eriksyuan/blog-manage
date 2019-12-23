import { axios } from '@/utils/request'

const api = {
  getArticles: '/serve/article/getArticles',
  getClassifies: '/serve/classify/getAll',
  creatNewClassify: '/serve/classify/addArCy',
  creatNewArticle: '/serve/article/createNew',
  change: '/serve/article/change',
  remove: '/serve/article/remove',
  getDetail: '/serve/article/getDetail',
  removeClassify: '/serve/classify/removeArCy'
}

export function getArticles (params) {
  return axios({
    url: api.getArticles,
    method: 'get',
    params
  })
}

export function getClassifies () {
  return axios({
    url: api.getClassifies,
    method: 'get'
  })
}

export function creatNewClassify (name) {
  return axios({
    url: api.creatNewClassify,
    method: 'post',
    data: {
      name
    }
  })
}

export function creatNewArticle (data) {
  return axios({
    url: api.creatNewArticle,
    method: 'post',
    data: data
  })
}

export function change (params) {
  return axios({
    url: api.change,
    method: 'put',
    data: params
  })
}

export function removeArticle (params) {
  return axios({
    url: api.remove,
    method: 'delete',
    data: params
  })
}

export function getDetailById (id) {
  return axios({
    url: api.getDetail,
    method: 'get',
    params: {
      id
    }
  })
}

export function removeClassify (id) {
  return axios({
    url: api.removeClassify,
    method: 'delete',
    data: {
      id
    }
  })
}

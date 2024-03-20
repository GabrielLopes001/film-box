import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '4f958b4d36263ee2bb2a8ac3493d52a3',
    language: 'pt-BR',
    include_adult: false,
    page: 1,
  },
})

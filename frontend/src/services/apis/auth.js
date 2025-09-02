import http from '@/services/http'

export const authApi = {
  // API cho đăng nhập
  login: async (data) => {
    const response = await http.post('/auth/login', data)
    return response.data
  },

  // API cho lấy thông tin tài khoản hiện tại
  me: async () => {
    const response = await http.get('/auth/me')
    return response.data
  },

  // API cho đăng xuất
  logout: async () => {
    const response = await http.post('/auth/logout')
    return response.data
  },
}
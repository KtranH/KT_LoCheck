import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { authApi } from '@/services/apis/auth'

export function useAuth() {
  const router = useRouter()
  const isLoading = ref(false)
  const errorMessage = ref('')

  // Đăng nhập
  const login = async ({ email, password, remember = false }) => {
    isLoading.value = true
    errorMessage.value = ''
    try {
      const res = await authApi.login({ email, password, remember })
      const token = res?.accessToken
      if (!token) throw new Error('Token không hợp lệ')

      if (remember) {
        localStorage.setItem('token', token)
      } else {
        sessionStorage.setItem('token', token)
        // Đồng bộ với axios interceptor: vẫn dùng localStorage để header hoạt động
        localStorage.setItem('token', token)
      }
      await router.push('/dashboard')
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Đăng nhập thất bại')
      errorMessage.value = err?.response?.data?.message || err.message || 'Đăng nhập thất bại'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Đăng xuất
  const logout = async () => {
    try{
      await authApi.logout()
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      await router.push('/login')
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Đăng xuất thất bại')
      errorMessage.value = err?.response?.data?.message || err.message || 'Đăng xuất thất bại'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    errorMessage,
    login,
    logout,
  }
}



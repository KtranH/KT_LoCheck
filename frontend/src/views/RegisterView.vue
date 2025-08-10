<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo và tiêu đề -->
      <div class="text-center mb-8" data-aos="fade-down">
        <div class="flex justify-center mb-4">
          <LogoIcon :size="64" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          KT CheckPoints
        </h1>
        <p class="text-gray-600">
          Quản lý CheckPoints và Lora cho Stable Diffusion
        </p>
      </div>

      <!-- Form đăng ký -->
      <div class="card" data-aos="fade-up" data-aos-delay="200">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Đăng ký tài khoản
        </h2>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Họ và tên -->
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="fullName"
                v-model="form.fullName"
                type="text"
                required
                class="input-field pl-10"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="input-field pl-10"
                placeholder="Nhập email của bạn"
              />
            </div>
          </div>

          <!-- Mật khẩu -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="input-field pl-10 pr-10"
                placeholder="Tạo mật khẩu mới"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon 
                  class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" 
                />
              </button>
            </div>
          </div>

          <!-- Xác nhận mật khẩu -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              Xác nhận mật khẩu
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="input-field pl-10 pr-10"
                placeholder="Nhập lại mật khẩu"
              />
              <button
                type="button"
                @click="toggleConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon 
                  class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" 
                />
              </button>
            </div>
          </div>

          <!-- Điều khoản -->
          <div class="flex items-start">
            <input
              v-model="form.agreeTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
            />
            <label class="ml-2 text-sm text-gray-700">
              Tôi đồng ý với
              <a href="#" class="text-primary-600 hover:text-primary-500">
                điều khoản sử dụng
              </a>
              và
              <a href="#" class="text-primary-600 hover:text-primary-500">
                chính sách bảo mật
              </a>
            </label>
          </div>

          <!-- Nút đăng ký -->
          <button
            type="submit"
            :disabled="loading || !form.agreeTerms"
            class="btn-primary w-full py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang đăng ký...
            </span>
            <span v-else>Đăng ký</span>
          </button>
        </form>

        <!-- Đăng nhập -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Đã có tài khoản?
            <router-link
              to="/login"
              class="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              Đăng nhập ngay
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import LogoIcon from '@/assets/icons/LogoIcon.vue'
import UserIcon from '@/assets/icons/UserIcon.vue'
import LockIcon from '@/assets/icons/LockIcon.vue'
import EyeIcon from '@/assets/icons/EyeIcon.vue'

const router = useRouter()
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    alert('Mật khẩu xác nhận không khớp!')
    return
  }

  loading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Store token (in real app, this would come from API)
    localStorage.setItem('token', 'dummy-token')
    
    // Redirect to dashboard
    router.push('/dashboard')
  } catch (error) {
    console.error('Register error:', error)
  } finally {
    loading.value = false
  }
}
</script>

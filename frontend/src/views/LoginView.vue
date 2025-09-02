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

      <!-- Form đăng nhập -->
      <div class="card" data-aos="fade-up" data-aos-delay="200">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Đăng nhập
        </h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon class="h-5 w-5 text-gray-400" />
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
                placeholder="Nhập mật khẩu"
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

          <!-- Ghi nhớ đăng nhập -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="form.remember"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700">Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" class="text-sm text-primary-600 hover:text-primary-500">
              Quên mật khẩu?
            </a>
          </div>

          <!-- Nút đăng nhập -->
          <button
            type="submit"
            :disabled="loading"
            class="btn-primary w-full py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang đăng nhập...
            </span>
            <span v-else>Đăng nhập</span>
          </button>
        </form>

        <!-- Đăng ký -->
        <div class="mt-6 text-center">
          <div v-if="errorMessage" class="mb-2 flex justify-center">
            <div class="flex items-center bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">
              <CircleAlert class="w-5 h-5 mr-2 text-red-500" />
              <span class="text-sm font-medium">{{ errorMessage }}</span>
            </div>
          </div>
          <p class="text-sm text-gray-600">
            Chưa có tài khoản?
            <router-link
              to="/register"
              class="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              Đăng ký ngay
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { CircleAlert } from 'lucide-vue-next'
import LogoIcon from '@/assets/icons/LogoIcon.vue'
import UserIcon from '@/assets/icons/UserIcon.vue'
import LockIcon from '@/assets/icons/LockIcon.vue'
import EyeIcon from '@/assets/icons/EyeIcon.vue'

const { login, isLoading, errorMessage } = useAuth()
const loading = isLoading
const showPassword = ref(false)

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  try {
    await login({ email: form.email, password: form.password, remember: form.remember })
  } catch (error) {
    // đã set errorMessage trong composable
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <LogoIcon :size="32" />
            <h1 class="ml-3 text-xl font-semibold text-gray-900">
              KT CheckPoints
            </h1>
          </div>
          
          <!-- User menu -->
          <div class="flex items-center space-x-4">
            <button
              @click="logout"
              class="btn-secondary"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="text-center" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Chào mừng bạn đến với Dashboard
          </h2>
          <p class="text-gray-600 mb-8">
            Hệ thống quản lý CheckPoints và Lora cho Stable Diffusion
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div class="card text-center" data-aos="fade-up" data-aos-delay="100">
              <div class="text-4xl font-bold text-primary-600 mb-2">0</div>
              <div class="text-gray-600">Models</div>
            </div>
            
            <div class="card text-center" data-aos="fade-up" data-aos-delay="200">
              <div class="text-4xl font-bold text-primary-600 mb-2">0</div>
              <div class="text-gray-600">CheckPoints</div>
            </div>
            
            <div class="card text-center" data-aos="fade-up" data-aos-delay="300">
              <div class="text-4xl font-bold text-primary-600 mb-2">0</div>
              <div class="text-gray-600">Lora</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import LogoIcon from '@/assets/icons/LogoIcon.vue'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="12" fill="url(#gradient)" />
    <path
      d="M12 16C12 13.7909 13.7909 12 16 12H32C34.2091 12 36 13.7909 36 16V32C36 34.2091 34.2091 36 32 36H16C13.7909 36 12 34.2091 12 32V16Z"
      fill="white"
      fill-opacity="0.1"
    />
    <path
      d="M20 18L28 24L20 30V18Z"
      fill="white"
    />
    <path
      d="M16 20C16 18.8954 16.8954 18 18 18H30C31.1046 18 32 18.8954 32 20V28C32 29.1046 31.1046 30 30 30H18C16.8954 30 16 29.1046 16 28V20Z"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stop-color="#1e293b" />
        <stop offset="1" stop-color="#334155" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 48
  }
})
</script>

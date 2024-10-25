<template>
  <div class="flex flex-col">
    <div class="flex flex-col p-4">
      <!-- Header Section -->
      <div class="mb-6">
        <h1 class="text-xl sm:text-2xl font-bold">ยินดีต้อนรับ, {{ user?.username }}</h1>
        <p class="mt-2 text-sm sm:text-base">พอยต์คงเหลือ: {{ user?.points }}</p>
      </div>

      <!-- Products Container with Auto Scroll -->
      <div class="relative w-full" @mouseenter="pauseAutoScroll" @mouseleave="resumeAutoScroll">
        <!-- Control Buttons -->
        <button @click="scrollToPrev" class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
          <span class="sr-only">Previous</span>
          ◀
        </button>
        <button @click="scrollToNext" class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
          <span class="sr-only">Next</span>
          ▶
        </button>
        <!-- Products Grid -->
        <div ref="scrollContainer"
          class="grid grid-flow-col auto-cols-[300px] gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth">
          <div v-for="product in availableProducts" :key="product.id" class="w-[300px] snap-start cursor-pointer">
            <div @click="goToDetail(product.id)" class="bg-white p-4 shadow-lg rounded-md h-full">
              <!-- Product Image -->
              <div class="w-full h-[200px] overflow-hidden rounded-md mb-3">
                <img :src="product?.image" :alt="product.name" class="w-full h-full object-cover" />
              </div>
              <!-- Product Info -->
              <div class="flex flex-col h-[calc(100%-200px)]">
                <h3 class="text-lg font-semibold line-clamp-2">
                  {{ product.name }}
                </h3>
                <div class="mt-3">
                  <p class="font-thin text-md">ต้องการ {{ product.pointsRequired }} พอยต์</p>
                  <p class="text-xs text-gray-500">หมดเขต {{ dayjs(product.expirationDate).locale('th').format('D/MM/YYYY') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Pagination Dots -->
        <div class="flex justify-center gap-2 mt-4">
          <button v-for="(_, index) in availableProducts" :key="index" @click="scrollToIndex(index)" class="w-2 h-2 rounded-full transition-all"
            :class="[currentIndex === index ? 'bg-primary w-4' : 'bg-gray-300']">
            <span class="sr-only">Slide {{ index + 1 }}</span>
          </button>
        </div>
      </div>
    </div>

    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../store/product'
import { useUserStore } from '../store/user'
import dayjs from 'dayjs'
import BottomNavigation from '~/components/BottomNavigation.vue'

const router = useRouter()
const productsStore = useProductsStore()
const userStore = useUserStore()
const scrollContainer = ref<HTMLElement | null>(null)
const autoScrollInterval = ref<number | null>(null)
const currentIndex = ref(0)

// check isAuthenticated
onBeforeMount(async () => {
  if (!userStore.isChecked) {
    await userStore.checkAuth();
  }

  if (!userStore.isAuthenticated) {
    router.push("/login");
  }
});

onMounted(async () => {
  await productsStore.fetchProducts()
  startAutoScroll()
})

onUnmounted(() => {
  stopAutoScroll()
})

const redeemedProductsId = computed(() => productsStore.redeemedProducts.map(item => item.id))
const availableProducts = computed(() => productsStore.products.filter(p => !redeemedProductsId.value.includes(p.id)))
const user = computed(() => userStore.user)

// Navigation Functions
const scrollToNext = () => {
  if (!scrollContainer.value) return

  currentIndex.value = (currentIndex.value + 1) % availableProducts.value.length
  const nextScroll = 304 * currentIndex.value // 300px width + 4px gap
  scrollContainer.value.scrollLeft = nextScroll
}

const scrollToPrev = () => {
  if (!scrollContainer.value) return

  currentIndex.value = currentIndex.value === 0
    ? availableProducts.value.length - 1
    : currentIndex.value - 1

  const prevScroll = 304 * currentIndex.value // 300px width + 4px gap
  scrollContainer.value.scrollLeft = prevScroll
}

const scrollToIndex = (index: number) => {
  if (!scrollContainer.value) return

  currentIndex.value = index
  const targetScroll = 304 * index // 300px width + 4px gap
  scrollContainer.value.scrollLeft = targetScroll
}

// Auto Scroll Functions
const startAutoScroll = () => {
  if (autoScrollInterval.value) return
  autoScrollInterval.value = window.setInterval(scrollToNext, 2000)
}

const stopAutoScroll = () => {
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value)
    autoScrollInterval.value = null
  }
}

const pauseAutoScroll = () => {
  stopAutoScroll()
}

const resumeAutoScroll = () => {
  startAutoScroll()
}

const goToDetail = (productId: number) => {
  router.push(`/product/${productId}`)
}
</script>

<style>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
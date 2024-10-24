<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="mx-auto bg-white p-4">
      <AuthCheck :is-authenticated="isAuthenticated" />
      <template v-if="isAuthenticated">
        <UserHeader :user="user" @logout="logout" />
        <ProductSelection title="Available Products" :products="availableProducts" :user-points="user?.points" @redeem="redeem" />
        <ProductSelection title="Redeemed Products" :products="redeemedProducts" :user-points="user?.points" is-redeemed />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

// Components
import UserHeader from '../components/user/UserHeader.vue';
import ProductSelection from '../components/product/ProductSelection.vue';

definePageMeta({
  middleware: ['auth']
})

const store = useStore()
const router = useRouter()

const isAuthenticated = computed(() => store.getters['user/isAuthenticated'])
const user = computed(() => store.getters['user/getUser'])
const availableProducts = computed(() => store.getters['products/availableProducts'])
const redeemedProducts = computed(() => store.getters['products/redeemedProducts'])

const redeem = async (productId: number) => {
  try {
    await store.dispatch('products/redeemProduct', productId)
    alert('Redeemed successfully!')
  } catch (error) {
    alert(error.message)
  }
}

const logout = () => {
  store.dispatch('user/logout')
  router.push('/login')
}

onMounted(() => {
  store.dispatch('products/fetchProducts')
})
</script>
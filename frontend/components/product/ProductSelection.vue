<!-- components/product/ProductSection.vue -->
<template>
    <section :class="{ 'mb-12': !isRedeemed }">
        <h2 class="mb-6 text-xl font-bold text-secondary">{{ title }}</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard v-for="product in products" :key="product.id" :product="product" :is-redeemed="isRedeemed" :user-points="userPoints"
                @redeem="$emit('redeem', $event)" />
        </div>
    </section>
</template>

<script setup lang="ts">
interface Product {
    id: number
    name: string
    description: string
    imageUrl: string
    pointsRequired?: number
}

defineProps<{
    title: string
    products: Product[]
    isRedeemed?: boolean
    userPoints: number
}>()

defineEmits<{
    redeem: [productId: number]
}>()
</script>
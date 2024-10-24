<!-- components/product/ProductCard.vue -->
<template>
    <div class="overflow-hidden rounded-lg bg-white shadow-md" :class="{ 'opacity-75': isRedeemed }">
        <img :src="product.imageUrl" :alt="product.name" class="h-48 w-full object-cover" />
        <div class="p-4">
            <h3 class="mb-2 text-lg font-semibold text-secondary">{{ product.name }}</h3>
            <p class="mb-4 text-sm text-gray-600">{{ product.description }}</p>
            <div class="flex items-center justify-between">
                <template v-if="!isRedeemed">
                    <span class="text-sm font-medium text-primary">
                        {{ product.pointsRequired }} Points
                    </span>
                    <button @click="$emit('redeem', product.id)"
                        class="mx-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:bg-gray-300"
                        :disabled="userPoints < (product?.pointsRequired ?? 0)">
                        {{ userPoints > (product?.pointsRequired ?? 0) ? "Redeem" : "Point Not Enought" }} </button>
                </template>
                <template v-else>
                    <span class="text-sm font-medium text-gray-500">Redeemed</span>
                </template>
            </div>
        </div>
    </div>
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
    product: Product
    isRedeemed?: boolean
    userPoints: number
}>()

defineEmits<{
    redeem: [productId: number]
}>()
</script>
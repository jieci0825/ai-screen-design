<script setup lang="ts">
import { computed, ref } from 'vue'
import { getMaterialsByCategory, getCategorys } from '@/materials'
import CategoryList from './components/category-list.vue'
import MaterialList from './components/material-list.vue'

// 当前分类类型
const currentCategoryType = ref('chart')
// 所有分类
const categories = getCategorys()

const selectCategory = (type: string) => {
    currentCategoryType.value = type
}

const materials = computed(() => {
    return getMaterialsByCategory(currentCategoryType.value)
})

const currentCategoryName = computed(() => categories.find((c) => c.type === currentCategoryType.value)?.name ?? '')
</script>

<template>
    <div class="material-panel flex h-full">
        <CategoryList
            :categories="categories"
            :current-category-type="currentCategoryType"
            @select="selectCategory"
        />
        <MaterialList
            :title="currentCategoryName"
            :materials="materials"
        />
    </div>
</template>

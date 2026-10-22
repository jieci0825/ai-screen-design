<script setup lang="ts">
import CategoryList from './components/category-list.vue'
import MaterialList from './components/material-list.vue'
import { useMaterialPanel } from './hooks'

defineOptions({ name: 'MaterialPanel' })

const { categories, currentCategoryType, materials, currentCategoryName, handleSelectCategory } = useMaterialPanel()
</script>

<template>
    <div class="material-panel">
        <CategoryList
            :categories="categories"
            :current-category-type="currentCategoryType"
            @select="handleSelectCategory"
        />
        <MaterialList
            :title="currentCategoryName"
            :materials="materials"
        />
    </div>
</template>

<style scoped lang="scss">
.material-panel {
    display: flex;
    height: 100%;
    min-width: 0;
    min-height: 0;
}
</style>

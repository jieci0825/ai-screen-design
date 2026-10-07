<script setup lang="ts">
import { computed, ref } from 'vue'
import CategoryList from './components/category-list.vue'
import MaterialList from './components/material-list.vue'

const currentCategoryType = ref('chart')
const categories = ref([
    { type: 'chart', name: '图表', icon: 'basil:chart-pie-outline' },
    { type: 'form', name: '表单', icon: 'ant-design:form-outlined' },
    { type: 'other', name: '其他', icon: 'bi:grid' },
])

const selectCategory = (type: string) => {
    currentCategoryType.value = type
}

const materialList = computed(() => {
    switch (currentCategoryType.value) {
        case 'chart':
            return [
                { name: '柱状图', key: 'bar', icon: 'bi:bar-chart-fill' },
                { name: '折线图', key: 'line', icon: 'boxicons:chart-sine-filled' },
                { name: '饼图', key: 'pie', icon: 'boxicons:pie-chart-filled' },
            ]
        case 'form':
            return [
                { name: '表单1', key: 'form1', icon: 'ant-design:form-outlined' },
                { name: '表单2', key: 'form2', icon: 'ant-design:form-outlined' },
                { name: '表单3', key: 'form3', icon: 'ant-design:form-outlined' },
            ]
        case 'other':
            return [
                { name: '其他1', key: 'other1', icon: 'hugeicons:status' },
                { name: '其他2', key: 'other2', icon: 'hugeicons:status' },
                { name: '其他3', key: 'other3', icon: 'hugeicons:status' },
            ]
        default:
            return []
    }
})

const currentCategoryName = computed(
    () => categories.value.find((c) => c.type === currentCategoryType.value)?.name ?? '',
)
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
            :material-list="materialList"
        />
    </div>
</template>

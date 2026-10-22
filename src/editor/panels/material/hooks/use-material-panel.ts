import { computed, ref } from 'vue'

import { getCategories, getMaterialsByCategory } from '@/materials'

import type { MaterialCategoryType } from '@/materials'

/** 管理分类选择及其对应的物料列表。 */
export function useMaterialPanel() {
    // 当前分类类型
    const currentCategoryType = ref<MaterialCategoryType>('chart')
    // 所有分类
    const categories = getCategories()

    /** 切换当前物料分类。 */
    const handleSelectCategory = (type: MaterialCategoryType) => {
        currentCategoryType.value = type
    }

    const materials = computed(() => {
        return getMaterialsByCategory(currentCategoryType.value)
    })

    const currentCategoryName = computed(() => categories.find((c) => c.type === currentCategoryType.value)?.name ?? '')

    return { categories, currentCategoryType, materials, currentCategoryName, handleSelectCategory }
}

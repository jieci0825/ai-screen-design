import type {
    MaterialCategory,
    MaterialCategoryType,
    MaterialContext,
    MaterialDefinition,
    MaterialPlugin,
} from './types'

const categories: readonly MaterialCategory[] = [
    { type: 'chart', name: '图表', icon: 'basil:chart-pie-outline' },
    { type: 'info', name: '信息', icon: 'ant-design:info-circle-outlined' },
]

const registry = new Map<string, MaterialDefinition>()

const context: MaterialContext = {
    register(material) {
        if (registry.has(material.key)) {
            throw new Error(`物料 key 重复：${material.key}`)
        }

        registry.set(material.key, material)
    },
}

// 每个物料入口默认导出插件，由这里统一安装。
const plugins = import.meta.glob<MaterialPlugin>('./components/*/index.ts', {
    eager: true,
    import: 'default',
})

for (const plugin of Object.values(plugins)) {
    plugin.install(context)
}

/**
 * 获取所有分类
 */
export function getCategories(): readonly MaterialCategory[] {
    return categories
}

/**
 * 获取指定分类下的物料列表
 */
export function getMaterialsByCategory(type: MaterialCategoryType): readonly MaterialDefinition[] {
    return [...registry.values()].filter((material) => {
        return material.category === type
    })
}

export type * from './types'

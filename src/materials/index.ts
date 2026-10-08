import { randomUtils } from '@/utils'
import type {
    MaterialCategory,
    MaterialCategoryType,
    MaterialContext,
    MaterialDefinition,
    MaterialPlugin,
    MaterialSchema,
} from './types'
import type { Component } from 'vue'

const categories: readonly MaterialCategory[] = [
    { type: 'chart', name: '图表', icon: 'basil:chart-pie-outline' },
    { type: 'info', name: '信息', icon: 'ant-design:info-circle-outlined' },
]

// 存储所有物料定义的注册表
const registry = new Map<string, MaterialDefinition>()
// 存储物料组件
const componentRegistry = new Map<string, Component>()

const context: MaterialContext = {
    register(material, component) {
        if (registry.has(material.key)) {
            throw new Error(`物料 key 重复：${material.key}`)
        }

        registry.set(material.key, material)
        componentRegistry.set(material.schema.type, component)
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

/**
 * 获取指定物料的组件
 */
export function getMaterialComponent(type: string): Component | undefined {
    return componentRegistry.get(type)
}

/**
 * 创建物料在画布里面的节点
 */
export function createMaterialNode(schema: MaterialSchema): MaterialSchema {
    return {
        id: randomUtils.generateUUID(),
        ...schema,
    }
}

export type * from './types'

import type { Component, CSSProperties } from 'vue'
export type MaterialCategoryType = 'chart' | 'info'

export interface MaterialCategory {
    readonly type: MaterialCategoryType
    readonly name: string
    readonly icon: string
}

export interface Layout {
    x: number
    y: number
    w: number
    h: number
}

export interface MaterialSchema {
    id: string
    type: string
    name: string
    layout: Layout
    props?: Record<string, any>
    style?: CSSProperties
}

export interface MaterialNode {
    id: string
}

export interface MaterialDefinition {
    // 物料元数据
    readonly key: string
    readonly name: string
    readonly icon: string
    readonly category: MaterialCategoryType
    // 物料专属的拖拽缩略图，由编辑器提供公共外框
    readonly preview?: Component

    // 物料 schema(DSL)
    readonly schema: Omit<MaterialSchema, 'id'>
}

export interface MaterialContext {
    register: (material: MaterialDefinition, component?: Component) => void
}

export interface MaterialPlugin {
    install: (context: MaterialContext) => void
}

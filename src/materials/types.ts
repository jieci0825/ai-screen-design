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
    style?: Partial<CSSStyleDeclaration>
}

export interface MaterialDefinition {
    // 物料元数据
    readonly key: string
    readonly name: string
    readonly icon: string
    readonly category: MaterialCategoryType

    // 物料 schema(DSL)
    readonly schema: Omit<MaterialSchema, 'id'>
}

export interface MaterialContext {
    register: (material: MaterialDefinition) => void
}

export interface MaterialPlugin {
    install: (context: MaterialContext) => void
}

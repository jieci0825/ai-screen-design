export type MaterialCategoryType = 'chart' | 'info'

export interface MaterialCategory {
    readonly type: MaterialCategoryType
    readonly name: string
    readonly icon: string
}

export interface MaterialDefinition {
    readonly key: string
    readonly name: string
    readonly icon: string
    readonly category: MaterialCategoryType
}

export interface MaterialContext {
    register: (material: MaterialDefinition) => void
}

export interface MaterialPlugin {
    install: (context: MaterialContext) => void
}

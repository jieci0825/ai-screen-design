import type { MaterialPlugin, MaterialDefinition } from '../../types'

const pieMaterial: MaterialDefinition = {
    name: '饼图',
    key: 'pie',
    icon: 'boxicons:pie-chart-filled',
    category: 'chart',
}

export default {
    install(context) {
        context.register(pieMaterial)
    },
} satisfies MaterialPlugin

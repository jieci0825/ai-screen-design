import type { MaterialPlugin, MaterialDefinition } from '../../types'

const barMaterial: MaterialDefinition = {
    name: '柱状图',
    key: 'bar',
    icon: 'bi:bar-chart-fill',
    category: 'chart',
}

export default {
    install(context) {
        context.register(barMaterial)
    },
} satisfies MaterialPlugin

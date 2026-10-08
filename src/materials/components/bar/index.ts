import type { MaterialPlugin, MaterialDefinition } from '../../types'

const barMaterial: MaterialDefinition = {
    name: '柱状图',
    key: 'bar',
    icon: 'bi:bar-chart-fill',
    category: 'chart',
    schema: {
        type: 'bar',
        name: '柱状图',
        layout: {
            x: 0,
            y: 0,
            w: 400,
            h: 300,
        },
        props: {},
        style: {},
    },
}

export default {
    install(context) {
        context.register(barMaterial)
    },
} satisfies MaterialPlugin

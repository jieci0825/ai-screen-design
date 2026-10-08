import type { MaterialPlugin, MaterialDefinition } from '../../types'

const pieMaterial: MaterialDefinition = {
    name: '饼图',
    key: 'pie',
    icon: 'boxicons:pie-chart-filled',
    category: 'chart',
    schema: {
        type: 'pie',
        name: '饼图',
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
        context.register(pieMaterial)
    },
} satisfies MaterialPlugin

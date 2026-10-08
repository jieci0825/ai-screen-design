import type { MaterialPlugin, MaterialDefinition } from '../../types'

const lineMaterial: MaterialDefinition = {
    name: '折线图',
    key: 'line',
    icon: 'boxicons:chart-sine-filled',
    category: 'chart',
    schema: {
        type: 'line',
        name: '折线图',
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
        context.register(lineMaterial)
    },
} satisfies MaterialPlugin

import type { MaterialPlugin, MaterialDefinition } from '../../types'

const lineMaterial: MaterialDefinition = {
    name: '折线图',
    key: 'line',
    icon: 'boxicons:chart-sine-filled',
    category: 'chart',
}

export default {
    install(context) {
        context.register(lineMaterial)
    },
} satisfies MaterialPlugin

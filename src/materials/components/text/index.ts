import type { MaterialPlugin, MaterialDefinition } from '../../types'

const textMaterial: MaterialDefinition = {
    name: '文本',
    key: 'text',
    icon: 'ant-design:font-size-outlined',
    category: 'info',
    schema: {
        type: 'text',
        name: '文本',
        layout: {
            x: 0,
            y: 0,
            w: 120,
            h: 35,
        },
        props: {
            text: '一段文本',
        },
        style: {
            fontSize: '14px',
        },
    },
}

export default {
    install(context) {
        context.register(textMaterial)
    },
} satisfies MaterialPlugin

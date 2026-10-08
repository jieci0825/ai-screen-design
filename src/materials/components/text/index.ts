import type { MaterialPlugin, MaterialDefinition } from '../../types'

const textMaterial: MaterialDefinition = {
    name: '文本',
    key: 'text',
    icon: 'ant-design:font-size-outlined',
    category: 'info',
}

export default {
    install(context) {
        context.register(textMaterial)
    },
} satisfies MaterialPlugin

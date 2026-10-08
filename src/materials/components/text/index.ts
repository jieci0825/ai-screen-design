import TextMaterialComp from './component.vue'
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
            x: 50,
            y: 100,
            w: 120,
            h: 35,
        },
        props: {
            content: '一段普通文本',
        },
        style: {
            fontSize: '14px',
            color: 'red',
        },
    },
}

export default {
    install(context) {
        context.register(textMaterial, TextMaterialComp)
    },
} satisfies MaterialPlugin

import type { MaterialSchema } from '@/materials'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useEditorStore = defineStore('editor', () => {
    const panelVisible = reactive({
        material: true,
        layer: true,
        property: true,
    })

    const nodes = ref<MaterialSchema[]>([])

    // 当前选中节点 id
    const currentSelectNodeId = ref('')
    // 当前选中节点
    const currentSelectNode = computed(() => {
        return nodes.value.find((node) => node.id === currentSelectNodeId.value)
    })

    /** 添加节点 */
    const addNode = (node: MaterialSchema) => {
        nodes.value.push(node)
    }

    /** 选中节点 */
    const selectNode = (nodeId: string) => {
        currentSelectNodeId.value = nodeId
    }

    /** 清空选中节点 */
    const clearSelectNode = () => {
        currentSelectNodeId.value = ''
    }

    return {
        panelVisible,
        nodes,
        currentSelectNode,
        currentSelectNodeId,
        addNode,
        selectNode,
        clearSelectNode,
    }
})

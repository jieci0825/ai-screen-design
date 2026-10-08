<script setup lang="ts">
import { ref } from 'vue'
import { createMaterialNode, getMaterialComponent, type MaterialSchema } from '@/materials'

const nodes = ref<MaterialSchema[]>([])

/** 元素拖拽到画布时触发 */
const onDrop = (e: DragEvent) => {
    const schema = JSON.parse(e.dataTransfer.getData('schema'))
    if (!schema) return
    const node = createMaterialNode(schema)
    nodes.value.push(node)
}

/** 将节点布局转换为带像素单位的定位和尺寸样式 */
const getNodeStyle = (node: MaterialSchema) => {
    return {
        width: `${node.layout.w ?? 0}px`,
        height: `${node.layout.h ?? 0}px`,
        left: `${node.layout.x ?? 0}px`,
        top: `${node.layout.y ?? 0}px`,
    }
}
</script>

<template>
    <div class="canvas flex-1 min-w-0 flex flex-col justify-center items-center">
        <!-- 编辑区域 -->
        <div
            class="canvas-editor w-[70%] h-[60%] border border-border"
            @dragover.prevent
            @drop="onDrop"
        >
            <div
                class="node-wrapper"
                v-for="node in nodes"
                :key="node.id"
                :style="getNodeStyle(node)"
            >
                <Component
                    :is="getMaterialComponent(node.type)"
                    :schema="node"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.canvas {
    .canvas-editor {
        position: relative;

        .node-wrapper {
            position: absolute;
            top: 0;
            left: 0;
        }
    }
}
</style>

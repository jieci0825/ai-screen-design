<script setup lang="ts">
import Moveable from 'vue3-moveable'
import { ref, shallowRef, computed, useTemplateRef } from 'vue'
import { createMaterialNode, getMaterialComponent, type MaterialSchema } from '@/materials'

const canvasRef = useTemplateRef('canvas-ref')

const nodes = ref<MaterialSchema[]>([])

// 当前选中节点 id
const currentSelectNodeId = ref('')
// 当前选中节点
const currentSelectNode = computed(() => {
    return nodes.value.find((node) => node.id === currentSelectNodeId.value)
})
// 当前选中节点 dom 元素
const currentSelectNodeElement = shallowRef<HTMLElement | null>(null)

/** 选中节点 */
const handleSelectNode = (e: MouseEvent, node: MaterialSchema) => {
    currentSelectNodeElement.value = e.currentTarget as HTMLElement
    currentSelectNodeId.value = node.id
}

/** 元素拖拽到画布时触发 */
const onDrop = (e: DragEvent) => {
    const schema = JSON.parse(e.dataTransfer.getData('schema'))
    if (!schema) return
    const node = createMaterialNode(schema)
    nodes.value.push(node)
}

/**
 * 拖拽移动
 */
const onDrag = ({ target, transform, top, left }) => {
    target.style.transform = transform

    // 更新节点中的 layout 数据，在保存的时候保证坐标数据的正确
    currentSelectNode.value.layout.x = left
    currentSelectNode.value.layout.y = top
}

/**
 * 拖拽缩放（调整宽高）
 */
const onResize = ({ target, width, height, drag }) => {
    target.style.width = `${width}px`
    target.style.height = `${height}px`

    // 更新节点 layout 信息
    currentSelectNode.value.layout.w = width
    currentSelectNode.value.layout.h = height

    // 拖动左侧或顶部控制点时，同步更新元素位置
    //  - 如果这里不更新元素位置，就会导致元素只会改变宽高，无法保持另一侧边缘的位置不变，从而出现向左拖拽，元素盒子预计应该往左移动并加宽，实际就会变成，左侧不动，右侧边缘移动
    target.style.transform = drag.transform
}

/** 将节点布局转换为带像素单位的定位和尺寸样式 */
const getNodeStyle = (node: MaterialSchema) => {
    return {
        width: `${node.layout.w}px`,
        height: `${node.layout.h}px`,
    }
}
</script>

<template>
    <div class="canvas flex-1 min-w-0 flex flex-col justify-center items-center">
        <!-- 编辑区域 -->
        <div
            class="canvas-editor w-[80%] h-[90%] border border-border"
            ref="canvas-ref"
            @dragover.prevent
            @drop="onDrop"
        >
            <div
                class="node-wrapper"
                v-for="node in nodes"
                :key="node.id"
                :style="getNodeStyle(node)"
                @mousedown="handleSelectNode($event, node)"
            >
                <Component
                    :is="getMaterialComponent(node.type)"
                    :schema="node"
                />
            </div>
        </div>

        <!-- 可移动组件 -->
        <!-- draggable: 开启拖拽移动 resizable: 开启控制点缩放 keepRatio: 控制是否保持宽高比例 -->
        <!-- throttleDrag: 拖拽移动步进，0 表示不做步进限制  throttleResize: 调整尺寸的步进-->
        <!-- snappable: 开启吸附及边界约束相关能力 -->
        <!-- snapContainer: 指定画布作为边界计算的参照容器 -->
        <!-- bounds: 指定元素允许移动和缩放的范围, position: 'css' 表示按照 CSS 边距的方式解释边界值 -->
        <Moveable
            :target="currentSelectNodeElement"
            :draggable="true"
            :resizable="true"
            :keepRatio="false"
            :throttleDrag="0"
            :throttleResize="0"
            :origin="false"
            :snappable="true"
            :snapContainer="canvasRef"
            :bounds="{
                position: 'css',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            }"
            @drag="onDrag"
            @resize="onResize"
        ></Moveable>
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

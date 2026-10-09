<script setup lang="ts">
import Moveable from 'vue3-moveable'
import { ref, shallowRef, computed, useTemplateRef, nextTick } from 'vue'

import { createMaterialNode, getMaterialComponent } from '@/materials'

import type { OnDrag, OnResize } from 'vue3-moveable'
import type { MaterialSchema } from '@/materials'

const canvasRef = useTemplateRef('canvas-ref')
const moveableRef = useTemplateRef('moveable-ref')

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

    // 等待 Vue 将新选中的节点同步到 Moveable 的 target，再启动拖拽
    nextTick(() => {
        // 解决：鼠标按下节点后，立即选中并开始拖动，无需松开再按一次
        // 第一次按下未选中的节点时，Moveable 的 target 还没切换到它，可能没有接收到这次按下事件。补上 dragStart(e)，就能让同一次鼠标操作完成“选中 + 拖动”
        moveableRef.value.dragStart(e)
    })
}

/** 元素拖拽到画布时触发 */
const onDrop = (e: DragEvent) => {
    const schema = JSON.parse(e.dataTransfer.getData('schema'))
    if (!schema) return

    // 保证拖拽项落到画布的时候，初始位置是在鼠标位置
    schema.layout.x = e.offsetX - schema.layout.w / 2
    schema.layout.y = e.offsetY - schema.layout.h / 2

    const node = createMaterialNode(schema)
    nodes.value.push(node)
}

/**
 * 拖拽移动
 */
const handleDrag = ({ target, transform, translate }: OnDrag) => {
    const node = currentSelectNode.value
    if (!node) return

    // ***** 使用的是 transform, 则后续的所有坐标数据都要基于此获取和使用 *****
    //  - 如果和 left top 混合就会出现错误，因为 transform 的偏移会基于 left top 计算
    target.style.transform = transform

    // 保存完整平移量，包含拖动开始前已有的位置
    const [translateX, translateY] = translate
    node.layout.x = translateX
    node.layout.y = translateY
}

/**
 * 拖拽缩放（调整宽高）
 */
const handleResize = ({ target, width, height, drag }: OnResize) => {
    const node = currentSelectNode.value
    if (!node) return

    target.style.width = `${width}px`
    target.style.height = `${height}px`

    // 更新节点 layout 信息
    node.layout.w = width
    node.layout.h = height

    // 拖动左侧或顶部控制点时，同步更新元素位置
    //  - 如果这里不更新元素位置，就会导致元素只会改变宽高，无法保持另一侧边缘的位置不变，从而出现向左拖拽，元素盒子预计应该往左移动并加宽，实际就会变成，左侧不动，右侧边缘移动
    target.style.transform = drag.transform
    const [translateX, translateY] = drag.translate
    node.layout.x = translateX
    node.layout.y = translateY
}

/** 将节点布局转换为带像素单位的定位和尺寸样式 */
const getNodeStyle = (node: MaterialSchema) => {
    return {
        width: `${node.layout.w}px`,
        height: `${node.layout.h}px`,
        transform: `translate(${node.layout.x}px, ${node.layout.y}px)`,
    }
}

const handleCanvasMousedown = () => {
    // 取消节点的选中效果
    currentSelectNodeId.value = ''
    currentSelectNodeElement.value = null
}
</script>

<template>
    <div class="canvas flex-1 min-w-0 flex flex-col justify-center items-center">
        <!-- 编辑区域 -->
        <div class="canvas-warpper w-[80%] h-[90%] border border-border overflow-hidden">
            <div
                class="canvas-editor w-full h-full"
                ref="canvas-ref"
                @dragover.prevent
                @drop="onDrop"
                @mousedown.self="handleCanvasMousedown"
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
        </div>

        <!-- 可移动组件 -->
        <!-- draggable: 开启拖拽移动 resizable: 开启控制点缩放 keepRatio: 控制是否保持宽高比例 -->
        <!-- throttleDrag: 拖拽移动步进，0 表示不做步进限制  throttleResize: 调整尺寸的步进-->
        <!-- snappable: 开启吸附及边界约束相关能力 -->
        <!-- snapContainer: 指定画布作为边界计算的参照容器 -->
        <!-- bounds: 指定元素允许移动和缩放的范围, position: 'css' 表示按照 CSS 边距的方式解释边界值 -->
        <Moveable
            ref="moveable-ref"
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
            @drag="handleDrag"
            @resize="handleResize"
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

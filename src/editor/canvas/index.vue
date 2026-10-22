<script setup lang="ts">
import { useTemplateRef } from 'vue'
import Moveable from 'vue3-moveable'

import { getMaterialComponent } from '@/materials'
import { useCanvas } from './hooks'

defineOptions({ name: 'EditorCanvas' })

const canvasRef = useTemplateRef<HTMLElement>('canvas-ref')
const moveableRef = useTemplateRef<InstanceType<typeof Moveable>>('moveable-ref')

const {
    nodes,
    currentSelectNodeElement,
    handleSelectNode,
    handleDrop,
    handleDrag,
    handleResize,
    getNodeStyle,
    handleCanvasMousedown,
} = useCanvas(canvasRef, moveableRef)
</script>

<template>
    <div class="canvas">
        <!-- 编辑区域 -->
        <div class="canvas-wrapper">
            <div
                class="canvas-editor"
                ref="canvas-ref"
                @dragover.prevent
                @drop="handleDrop"
                @mousedown.self="handleCanvasMousedown"
            >
                <div
                    class="node-wrapper"
                    v-for="node in nodes"
                    :key="node.id"
                    :style="getNodeStyle(node)"
                    :data-node-id="node.id"
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
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 0;
    min-height: 0;

    .canvas-wrapper {
        width: 80%;
        height: 90%;
        overflow: hidden;
        border: 1px solid var(--color-border-base);
        background-color: var(--color-bg-container);
    }

    .canvas-editor {
        position: relative;
        width: 100%;
        height: 100%;

        .node-wrapper {
            position: absolute;
            top: 0;
            left: 0;
        }
    }
}
</style>

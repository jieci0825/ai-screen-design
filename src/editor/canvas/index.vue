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
</script>

<template>
    <div class="canvas flex-1 min-w-0 flex flex-col justify-center items-center">
        <!-- 编辑区域 -->
        <div
            class="canvas__editor__header w-[70%] h-[60%] border border-border"
            @dragover.prevent
            @drop="onDrop"
        >
            <div
                v-for="item in nodes"
                :key="item.id"
            >
                <Component
                    :is="getMaterialComponent(item.type)"
                    :schema="item"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>

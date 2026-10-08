<script setup lang="ts">
import { ref } from 'vue'
import { randomUtils } from '@/utils'
import type { MaterialSchema } from '@/materials'

const nodes = ref<MaterialSchema[]>([])

/** 元素拖拽到画布时触发 */
const onDrop = (e: DragEvent) => {
    const data = JSON.parse(e.dataTransfer.getData('schema'))

    if (!data) return

    data.id = randomUtils.generateUUID()
    nodes.value.push(data)
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
                v-for="n in nodes"
                :key="n.id"
            >
                {{ n.name }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEditorStore } from '@/stores/editor'
import { Icon } from '@iconify/vue'

const { panelVisible } = storeToRefs(useEditorStore())
</script>

<template>
    <div class="toolbar-left__inner flex items-center gap-3">
        <button
            type="button"
            aria-label="切换物料面板"
            aria-controls="editor-material"
            :aria-pressed="panelVisible.material"
            :class="{ active: panelVisible.material }"
            @click="panelVisible.material = !panelVisible.material"
        >
            <Icon icon="akar-icons:panel-left" />
        </button>
        <button
            type="button"
            aria-label="切换图层面板"
            aria-controls="editor-layer"
            :aria-pressed="panelVisible.layer"
            :class="{ active: panelVisible.layer }"
            @click="panelVisible.layer = !panelVisible.layer"
        >
            <Icon icon="bx:layer" />
        </button>
    </div>
</template>

<style scoped lang="scss">
.toolbar-left__inner {
    button {
        border: 1px solid var(--border);
        padding: 4px;
        border-radius: 4px;
        cursor: pointer;
        transition:
            background-color 150ms ease,
            border-color 150ms ease,
            color 150ms ease;

        &.active {
            border-color: var(--primary);
            background-color: var(--primary);
            color: var(--primary-foreground);
        }
    }
}
</style>

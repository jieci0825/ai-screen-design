<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'

import { useEditorStore } from '@/stores/editor'

const { panelVisible } = storeToRefs(useEditorStore())
</script>

<template>
    <div class="toolbar-left__inner">
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
    display: flex;
    align-items: center;
    gap: 12px;

    button {
        border: 1px solid var(--color-border-base);
        padding: 4px;
        border-radius: var(--border-radius-small);
        cursor: pointer;
        transition:
            background-color 150ms ease,
            border-color 150ms ease,
            color 150ms ease;

        &:hover {
            background-color: var(--color-bg-secondary);
        }

        &:focus-visible {
            outline: 2px solid var(--color-focus-ring);
            outline-offset: 2px;
        }

        :deep(svg) {
            width: 16px;
            height: 16px;
        }

        &:where(.active) {
            border-color: var(--color-primary);
            background-color: var(--color-primary);
            color: var(--color-text-on-primary);

            &:hover {
                background-color: var(--color-primary-hover);
            }
        }
    }
}
</style>

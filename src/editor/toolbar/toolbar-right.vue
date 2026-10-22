<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'

import { useEditorStore } from '@/stores/editor'

const { panelVisible } = storeToRefs(useEditorStore())
</script>

<template>
    <div class="toolbar-right__inner">
        <button
            type="button"
            aria-label="撤销"
        >
            <Icon icon="boxicons:undo-filled" />
        </button>
        <button
            type="button"
            aria-label="重做"
        >
            <Icon icon="boxicons:redo-filled" />
        </button>
        <button
            type="button"
            aria-label="预览"
        >
            <Icon icon="icon-park-outline:preview-open" />
        </button>
        <button
            type="button"
            aria-label="JSON"
        >
            <Icon icon="si:json-alt-1-fill" />
        </button>
        <button
            type="button"
            aria-label="切换属性面板"
            aria-controls="editor-property"
            :aria-pressed="panelVisible.property"
            :class="{ active: panelVisible.property }"
            @click="panelVisible.property = !panelVisible.property"
        >
            <Icon icon="akar-icons:panel-right" />
        </button>
    </div>
</template>

<style scoped lang="scss">
.toolbar-right__inner {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: flex-end;

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

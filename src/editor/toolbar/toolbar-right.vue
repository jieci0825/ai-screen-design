<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEditorStore } from '@/stores/editor'
import { Icon } from '@iconify/vue'

const { panelVisible } = storeToRefs(useEditorStore())
</script>

<template>
    <div class="toolbar-right__inner flex items-center gap-3 justify-end">
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

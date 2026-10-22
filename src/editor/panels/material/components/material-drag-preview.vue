<script setup lang="ts">
import type { MaterialDefinition } from '@/materials'

defineProps<{
    material: MaterialDefinition
}>()
</script>

<template>
    <div
        class="material-drag-preview"
        aria-hidden="true"
    >
        <div class="material-drag-preview__header">
            <span class="material-drag-preview__name">{{ material.name }}</span>
            <span class="material-drag-preview__badge">添加组件</span>
        </div>
        <div class="material-drag-preview__thumbnail">
            <component
                :is="material.preview"
                v-if="material.preview"
                :schema="material.schema"
            />
            <span
                v-else
                class="material-drag-preview__fallback"
                >{{ material.name }}</span
            >
        </div>
        <div class="material-drag-preview__footer">
            <span>{{ material.schema.layout.w }} × {{ material.schema.layout.h }}</span>
            <span>松开放置</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.material-drag-preview {
    box-sizing: border-box;
    width: 200px;
    padding: 12px;
    border: 1px solid var(--color-info-border);
    border-radius: var(--border-radius-large);
    background: var(--color-bg-container);
    color: var(--color-text-primary);
    font-family: inherit;
    user-select: none;

    .material-drag-preview__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 10px;
    }

    .material-drag-preview__name {
        overflow: hidden;
        font-size: var(--font-size-base);
        font-weight: 600;
        line-height: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .material-drag-preview__badge {
        flex-shrink: 0;
        padding: 2px 5px;
        border-radius: var(--border-radius-small);
        background: var(--color-info-subtle);
        color: var(--color-info);
        font-size: var(--font-size-sm);
        line-height: 16px;
    }

    .material-drag-preview__thumbnail {
        height: 80px;
        padding: 4px 8px;
        border-radius: var(--border-radius-base);
        background: var(--color-bg-secondary);
    }

    .material-drag-preview__fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--color-info);
        font-size: var(--font-size-lg);
    }

    .material-drag-preview__footer {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        margin-top: 8px;
        color: var(--color-text-secondary);
        font-size: var(--font-size-sm);
        line-height: 16px;
    }
}
</style>

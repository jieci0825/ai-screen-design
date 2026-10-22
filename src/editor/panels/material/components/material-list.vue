<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { useMaterialDrag } from '../hooks'

import type { MaterialDefinition } from '@/materials'

defineProps<{
    title: string
    materials: readonly MaterialDefinition[]
}>()

const { handleDragStart, handleDragEnd } = useMaterialDrag()
</script>

<template>
    <div class="material-list">
        <h2 class="material-list__title">
            {{ title }}
        </h2>
        <div
            class="material-list__item"
            v-for="m in materials"
            :key="m.key"
            draggable="true"
            @dragstart="handleDragStart($event, m)"
            @dragend="handleDragEnd"
        >
            <Icon
                :icon="m.icon"
                class="material-list__item-icon"
                aria-hidden="true"
            />
            <div class="material-list__item-name">{{ m.name }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.material-list {
    flex: 1;
    min-width: 0;
    padding: 16px 12px;
    overflow-y: auto;
    background-color: var(--color-bg-secondary);

    .material-list__title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 0 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--color-border-base);
        color: var(--color-text-primary);
        font-size: var(--font-size-base);
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 0.02em;
        overflow-wrap: anywhere;

        &::before {
            content: '';
            flex-shrink: 0;
            width: 3px;
            height: 14px;
            border-radius: 2px;
            background-color: var(--color-primary);
        }
    }

    .material-list__item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border: 1px solid var(--color-border-base);
        border-radius: var(--border-radius-base);
        background-color: var(--color-bg-container);
        color: var(--color-text-primary);
        font-size: var(--font-size-base);
        line-height: 20px;
        overflow-wrap: anywhere;
        cursor: pointer;
    }
    .material-list__item + .material-list__item {
        margin-top: 8px;
    }

    .material-list__item-icon {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
    }
}
</style>

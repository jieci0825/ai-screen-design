<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { MaterialDefinition, MaterialSchema } from '@/materials'

defineProps<{
    title: string
    materials: readonly MaterialDefinition[]
}>()

const handleDragStart = (e: DragEvent, m: MaterialDefinition) => {
    e.dataTransfer.setData('schema', JSON.stringify(m.schema))
}
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
    background-color: var(--sidebar);

    &__title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 0 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--sidebar-border);
        color: var(--sidebar-foreground);
        font-size: 14px;
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
            background-color: var(--sidebar-primary);
        }
    }

    &__item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border: 1px solid var(--border);
        border-radius: 6px;
        background-color: var(--card);
        color: var(--card-foreground);
        font-size: 13px;
        line-height: 20px;
        overflow-wrap: anywhere;
        cursor: pointer;

        & + & {
            margin-top: 8px;
        }

        &-icon {
            flex-shrink: 0;
            width: 20px;
            height: 20px;
        }
    }
}
</style>

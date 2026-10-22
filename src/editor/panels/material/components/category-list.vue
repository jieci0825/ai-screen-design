<script setup lang="ts">
import { Icon } from '@iconify/vue'

import type { MaterialCategory, MaterialCategoryType } from '@/materials'

defineProps<{
    categories: readonly MaterialCategory[]
    currentCategoryType: MaterialCategoryType
}>()

const emit = defineEmits<{
    select: [type: MaterialCategoryType]
}>()
</script>

<template>
    <div class="material-category-list">
        <button
            type="button"
            class="material-category-list__item"
            v-for="c in categories"
            :key="c.type"
            :class="{ 'material-category-list__item--active': currentCategoryType === c.type }"
            :aria-pressed="currentCategoryType === c.type"
            @click="emit('select', c.type)"
        >
            <span
                ><Icon
                    :icon="c.icon"
                    class="material-category-list__icon"
                ></Icon
            ></span>
            <span class="material-category-list__label">{{ c.name }}</span>
        </button>
    </div>
</template>

<style scoped lang="scss">
.material-category-list {
    flex: 0 0 72px;
    height: 100%;
    padding: 8px;
    overflow-y: auto;
    border-right: 1px solid var(--color-border-base);

    .material-category-list__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        width: 100%;
        min-height: 64px;
        margin-bottom: 6px;
        padding: 8px 4px;
        border: 1px solid transparent;
        border-radius: var(--border-radius-base);
        color: var(--color-text-secondary);
        cursor: default;
        transition:
            color 150ms ease,
            background-color 150ms ease,
            border-color 150ms ease;

        &:hover {
            color: var(--color-text-primary);
            background-color: var(--color-bg-secondary);
        }

        &:focus-visible {
            outline: 2px solid var(--color-focus-ring);
            outline-offset: 2px;
        }

        &:where([aria-pressed='true']) {
            color: var(--color-text-primary);
            background-color: var(--color-bg-secondary);
            border-color: var(--color-border-base);
            font-weight: 600;
        }
    }
    .material-category-list__icon {
        width: 20px;
        height: 20px;
    }

    .material-category-list__label {
        font-size: var(--font-size-sm);
    }
}
</style>

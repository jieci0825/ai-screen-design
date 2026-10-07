<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
    categories: { type: string; name: string; icon: string }[]
    currentCategoryType: string
}>()

const emit = defineEmits<{
    select: [type: string]
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
                    class="w-5 h-5"
                ></Icon
            ></span>
            <span class="text-[13px]">{{ c.name }}</span>
        </button>
    </div>
</template>

<style scoped lang="scss">
.material-category-list {
    flex: 0 0 72px;
    height: 100%;
    padding: 8px;
    overflow-y: auto;
    border-right: 1px solid var(--border);

    &__item {
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
        border-radius: 6px;
        color: var(--muted-foreground);
        cursor: default;
        transition:
            color 150ms ease,
            background-color 150ms ease,
            border-color 150ms ease;

        &:hover {
            color: var(--foreground);
            background-color: var(--muted);
        }

        &:focus-visible {
            outline: 2px solid var(--ring);
            outline-offset: 2px;
        }

        &#{&}--active {
            color: var(--accent-foreground);
            background-color: var(--accent);
            border-color: var(--border);
            font-weight: 600;
        }
    }
}
</style>

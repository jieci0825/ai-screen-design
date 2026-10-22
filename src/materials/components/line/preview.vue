<script setup lang="ts">
import type { MaterialDefinition } from '@/materials'

defineOptions({ name: 'LineMaterialPreview' })

defineProps<{
    schema: MaterialDefinition['schema']
}>()
</script>

<template>
    <svg
        class="line-preview"
        viewBox="0 0 160 80"
        fill="none"
        aria-hidden="true"
    >
        <path
            d="M8 20H152M8 44H152M8 68H152"
            stroke="var(--color-info-subtle)"
            stroke-dasharray="3 4"
        />
        <path
            d="M12 58L40 38L68 46L96 18L124 30L148 10V68H12Z"
            fill="var(--color-info-subtle)"
        />
        <path
            d="M8 8V68H152"
            stroke="var(--color-text-secondary)"
            stroke-linecap="round"
        />
        <path
            d="M12 58L40 38L68 46L96 18L124 30L148 10"
            stroke="var(--color-info)"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <g
            fill="var(--color-bg-container)"
            stroke="var(--color-info)"
            stroke-width="2"
        >
            <circle
                cx="40"
                cy="38"
                r="3"
            />
            <circle
                cx="68"
                cy="46"
                r="3"
            />
            <circle
                cx="96"
                cy="18"
                r="3"
            />
            <circle
                cx="124"
                cy="30"
                r="3"
            />
        </g>
    </svg>
</template>

<style scoped lang="scss">
.line-preview {
    display: block;
    width: 100%;
    height: 100%;
}
</style>

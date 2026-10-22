<script setup lang="ts">
import type { MaterialDefinition } from '@/materials'

defineOptions({ name: 'PieMaterialPreview' })

defineProps<{
    schema: MaterialDefinition['schema']
}>()
</script>

<template>
    <svg
        class="pie-preview"
        viewBox="0 0 160 80"
        fill="none"
        aria-hidden="true"
    >
        <g
            stroke="var(--color-bg-container)"
            stroke-width="2"
            stroke-linejoin="round"
        >
            <path
                d="M54 40V6A34 34 0 0 1 86.34 50.51Z"
                fill="var(--color-info)"
            />
            <path
                d="M54 40L86.34 50.51A34 34 0 0 1 34.02 67.51Z"
                fill="var(--color-info-300)"
            />
            <path
                d="M54 40L34.02 67.51A34 34 0 0 1 54 6Z"
                fill="var(--color-info-100)"
            />
        </g>
        <rect
            x="108"
            y="19"
            width="7"
            height="7"
            rx="2"
            fill="var(--color-info)"
        />
        <rect
            x="121"
            y="21"
            width="29"
            height="3"
            rx="1.5"
            fill="var(--color-border-base)"
        />
        <rect
            x="108"
            y="36"
            width="7"
            height="7"
            rx="2"
            fill="var(--color-info-300)"
        />
        <rect
            x="121"
            y="38"
            width="23"
            height="3"
            rx="1.5"
            fill="var(--color-border-base)"
        />
        <rect
            x="108"
            y="53"
            width="7"
            height="7"
            rx="2"
            fill="var(--color-info-100)"
        />
        <rect
            x="121"
            y="55"
            width="26"
            height="3"
            rx="1.5"
            fill="var(--color-border-base)"
        />
    </svg>
</template>

<style scoped lang="scss">
.pie-preview {
    display: block;
    width: 100%;
    height: 100%;
}
</style>

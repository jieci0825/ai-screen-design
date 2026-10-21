<script setup lang="ts">
import type { MaterialDefinition } from '@/materials'

defineOptions({ name: 'BarMaterialPreview' })

defineProps<{
    schema: MaterialDefinition['schema']
}>()
</script>

<template>
    <svg
        class="bar-preview"
        viewBox="0 0 160 80"
        fill="none"
        aria-hidden="true"
    >
        <path
            d="M8 20H152M8 44H152M8 68H152"
            stroke="#dbeafe"
            stroke-dasharray="3 4"
        />
        <rect
            x="18"
            y="42"
            width="16"
            height="26"
            rx="3"
            fill="#93c5fd"
        />
        <rect
            x="45"
            y="26"
            width="16"
            height="42"
            rx="3"
            fill="#60a5fa"
        />
        <rect
            x="72"
            y="34"
            width="16"
            height="34"
            rx="3"
            fill="#3b82f6"
        />
        <rect
            x="99"
            y="12"
            width="16"
            height="56"
            rx="3"
            fill="#2563eb"
        />
        <rect
            x="126"
            y="20"
            width="16"
            height="48"
            rx="3"
            fill="#60a5fa"
        />
        <path
            d="M8 8V68H152"
            stroke="#94a3b8"
            stroke-linecap="round"
        />
    </svg>
</template>

<style scoped lang="scss">
.bar-preview {
    display: block;
    width: 100%;
    height: 100%;
}
</style>

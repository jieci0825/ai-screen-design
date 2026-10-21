<script setup lang="ts">
import type { MaterialDefinition } from '@/materials'

defineOptions({ name: 'TextMaterialPreview' })

defineProps<{
    schema: MaterialDefinition['schema']
}>()
</script>

<template>
    <div class="text-preview">
        <span class="text-preview__sample">Aa</span>
        <span class="text-preview__content">{{ schema.props?.content ?? schema.name }}</span>
    </div>
</template>

<style scoped lang="scss">
.text-preview {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    height: 100%;
    overflow: hidden;

    .text-preview__sample {
        color: #2563eb;
        font-size: 32px;
        font-weight: 600;
        line-height: 36px;
        letter-spacing: -0.04em;
    }

    .text-preview__content {
        overflow: hidden;
        color: #475569;
        font-size: 12px;
        line-height: 18px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>

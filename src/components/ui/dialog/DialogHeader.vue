<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
    <div
        data-slot="dialog-header"
        :class="['ui-dialog-header', props.class]"
    >
        <slot />
    </div>
</template>

<style scoped lang="scss">
.ui-dialog-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: center;

    @media (min-width: 640px) {
        text-align: left;
    }
}
</style>

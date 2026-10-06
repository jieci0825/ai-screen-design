<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
    <div class="toolbar-right__inner flex items-center gap-3 justify-end">
        <span><Icon icon="boxicons:undo-filled" /></span>
        <span><Icon icon="boxicons:redo-filled" /></span>
        <span><Icon icon="icon-park-outline:preview-open" /></span>
        <span><Icon icon="si:json-alt-1-fill" /></span>
        <span><Icon icon="akar-icons:panel-right" /></span>
    </div>
</template>

<style scoped lang="scss">
.toolbar-right__inner {
    span {
        border: 1px solid var(--border);
        padding: 4px;
        border-radius: 4px;
    }
}
</style>

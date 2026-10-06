<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
    <div class="toolbar-left__inner flex items-center gap-3">
        <span><Icon icon="akar-icons:panel-left" /></span>
        <span><Icon icon="bx:layer" /></span>
    </div>
</template>

<style scoped lang="scss">
.toolbar-left__inner {
    span {
        border: 1px solid var(--border);
        padding: 4px;
        border-radius: 4px;
    }
}
</style>

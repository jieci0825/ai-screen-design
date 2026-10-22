<script setup lang="ts">
import Editor from './editor/index.vue'
import { useAppearance } from '@/hooks'

useAppearance()
</script>

<template>
    <div class="app-container">
        <Editor />
    </div>
</template>

<style scoped lang="scss">
.app-container {
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
}
</style>

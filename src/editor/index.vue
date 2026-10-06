<script setup lang="ts" name="ScreenEditor">
import { Button } from '@/components/ui/button/index.ts'
import { Icon } from '@iconify/vue'
</script>

<template>
    <div class="editor h-screen w-screen flex flex-col">
        <header class="editor-header h-15 shrink-0 w-full border-b border-border"></header>
        <main class="editor-main flex flex-1">
            <!-- 物料 -->
            <aside class="material w-60 shrink-0 border-r border-border"></aside>
            <!-- 图层 -->
            <aside class="layer w-40 shrink-0 border-r border-border"></aside>
            <!-- 画布 -->
            <div class="canvas flex-1"></div>
            <!-- 属性 -->
            <aside class="property w-75 shrink-0 border-l border-border"></aside>
        </main>
    </div>
</template>

<style scoped lang="scss"></style>

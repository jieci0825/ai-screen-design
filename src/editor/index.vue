<script setup lang="ts" name="ScreenEditor">
import ToolbarLeft from './toolbar/toolbar-left.vue'
import ToolbarCenter from './toolbar/toolbar-center.vue'
import ToolbarRight from './toolbar/toolbar-right.vue'
</script>

<template>
    <div class="editor h-screen w-screen flex flex-col">
        <header class="editor-header flex items-center h-15 shrink-0 w-full border-b border-border p-3">
            <div class="toolbar-left w-75 h-full">
                <ToolbarLeft />
            </div>
            <div class="toolbar-center flex-1 h-full">
                <ToolbarCenter />
            </div>
            <div class="toolbar-right w-75 h-full">
                <ToolbarRight />
            </div>
        </header>
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

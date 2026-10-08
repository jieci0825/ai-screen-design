<script setup lang="ts" name="ScreenEditor">
import { storeToRefs } from 'pinia'
import { useEditorStore } from '@/stores/editor'
import ToolbarLeft from './toolbar/toolbar-left.vue'
import ToolbarCenter from './toolbar/toolbar-center.vue'
import ToolbarRight from './toolbar/toolbar-right.vue'
import Material from './panels/material/index.vue'
import Layer from './panels/layer/index.vue'
import CanvasRoot from './canvas/index.vue'

const { panelVisible } = storeToRefs(useEditorStore())
</script>

<template>
    <div class="editor h-screen w-screen flex flex-col select-none">
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
        <main class="editor-main flex flex-1 min-h-0 overflow-hidden">
            <!-- 物料 -->
            <Transition name="panel">
                <aside
                    v-show="panelVisible.material"
                    id="editor-material"
                    class="editor-panel material shrink-0 border-r border-border"
                    style="--panel-width: 15rem"
                    aria-label="物料"
                    :inert="!panelVisible.material"
                >
                    <Material />
                </aside>
            </Transition>
            <!-- 图层 -->
            <Transition name="panel">
                <aside
                    v-show="panelVisible.layer"
                    id="editor-layer"
                    class="editor-panel layer shrink-0 border-r border-border"
                    style="--panel-width: 10rem"
                    aria-label="图层"
                    :inert="!panelVisible.layer"
                >
                    <Layer />
                </aside>
            </Transition>
            <!-- 画布 -->
            <CanvasRoot />
            <!-- 属性 -->
            <Transition name="panel">
                <aside
                    v-show="panelVisible.property"
                    id="editor-property"
                    class="editor-panel property shrink-0 border-l border-border"
                    style="--panel-width: 18.75rem"
                    aria-label="属性"
                    :inert="!panelVisible.property"
                >
                    <div class="editor-panel__content">属性</div>
                </aside>
            </Transition>
        </main>
    </div>
</template>

<style scoped lang="scss">
.editor {
    &-panel {
        width: var(--panel-width);
        overflow: hidden;

        &__content {
            width: calc(var(--panel-width) - 1px);
            height: 100%;
            overflow: auto;
        }
    }
}

// 动画
.panel {
    &-enter-active,
    &-leave-active {
        transition:
            width 240ms ease,
            opacity 240ms ease,
            border-width 240ms ease;
    }

    &-enter-from,
    &-leave-to {
        width: 0;
        opacity: 0;
        border-width: 0;
    }
}
</style>

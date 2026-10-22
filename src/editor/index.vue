<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useEditorStore } from '@/stores/editor'
import ToolbarLeft from './toolbar/toolbar-left.vue'
import ToolbarCenter from './toolbar/toolbar-center.vue'
import ToolbarRight from './toolbar/toolbar-right.vue'
import Material from '@/editor/panels/material/index.vue'
import Layer from '@/editor/panels/layer/index.vue'
import CanvasRoot from './canvas/index.vue'

defineOptions({ name: 'ScreenEditor' })

const { panelVisible } = storeToRefs(useEditorStore())
</script>

<template>
    <div class="editor">
        <header class="editor-header">
            <div class="toolbar-left">
                <ToolbarLeft />
            </div>
            <div class="toolbar-center">
                <ToolbarCenter />
            </div>
            <div class="toolbar-right">
                <ToolbarRight />
            </div>
        </header>
        <main class="editor-main">
            <!-- 物料 -->
            <Transition name="panel">
                <aside
                    v-show="panelVisible.material"
                    id="editor-material"
                    class="editor-panel material"
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
                    class="editor-panel layer"
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
                    class="editor-panel property"
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
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    user-select: none;

    .editor-header {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        width: 100%;
        height: 60px;
        padding: 12px;
        border-bottom: 1px solid var(--color-border-base);
        background-color: var(--color-bg-container);
    }

    .toolbar-left,
    .toolbar-right {
        flex: 0 0 300px;
        height: 100%;
    }

    .toolbar-center {
        flex: 1;
        height: 100%;
        min-width: 0;
    }

    .editor-main {
        display: flex;
        flex: 1;
        min-width: 0;
        min-height: 0;
        overflow: hidden;
    }

    .editor-panel {
        flex-shrink: 0;
        width: var(--panel-width);
        min-height: 0;
        overflow: hidden;
        border-right: 1px solid var(--color-border-base);
        background-color: var(--color-bg-container);

        &:where(.property) {
            border-right: 0;
            border-left: 1px solid var(--color-border-base);
        }
    }

    .editor-panel__content {
        width: calc(var(--panel-width) - 1px);
        height: 100%;
        overflow: auto;
    }

    .panel-enter-active,
    .panel-leave-active {
        transition:
            width 240ms ease,
            opacity 240ms ease,
            border-width 240ms ease;
    }

    .panel-enter-from,
    .panel-leave-to {
        width: 0;
        opacity: 0;
        border-width: 0;
    }

    @media (prefers-reduced-motion: reduce) {
        .panel-enter-active,
        .panel-leave-active {
            transition-duration: 1ms;
        }
    }
}
</style>

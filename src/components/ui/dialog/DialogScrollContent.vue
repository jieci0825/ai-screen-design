<script setup lang="ts">
import { X } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, useForwardPropsEmits } from 'reka-ui'

import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DialogContentEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)

/** 避免拖动滚动条时被判定为点击弹窗外部。 */
const handlePointerDownOutside = (event: CustomEvent<{ originalEvent: PointerEvent }>) => {
    const originalEvent = event.detail.originalEvent
    const target = originalEvent.target as HTMLElement
    if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
        event.preventDefault()
    }
}
</script>

<template>
    <DialogPortal>
        <DialogOverlay class="ui-dialog-scroll-overlay">
            <DialogContent
                data-slot="dialog-content"
                v-bind="{ ...$attrs, ...forwarded }"
                :class="['ui-dialog-scroll-content', props.class]"
                @pointer-down-outside="handlePointerDownOutside"
            >
                <slot />
                <DialogClose class="ui-dialog-close-button">
                    <X />
                    <span class="ui-dialog-close-label">Close</span>
                </DialogClose>
            </DialogContent>
        </DialogOverlay>
    </DialogPortal>
</template>

<style scoped lang="scss">
@use './dialog-styles' as dialog;

.ui-dialog-scroll-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: grid;
    justify-items: center;
    align-items: safe center;
    overflow-y: auto;
    background-color: var(--color-overlay);
    animation: ui-dialog-scroll-in 200ms ease-out;

    &:where([data-state='closed']) {
        animation: ui-dialog-scroll-out 200ms ease-in;
    }

    .ui-dialog-scroll-content {
        @include dialog.content;

        position: relative;
        margin-block: 32px;
        animation: ui-dialog-scroll-content-in 200ms ease-out;

        &:where([data-state='closed']) {
            animation: ui-dialog-scroll-content-out 200ms ease-in;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        animation-duration: 1ms;

        .ui-dialog-scroll-content {
            animation-duration: 1ms;
        }
    }
}

@keyframes ui-dialog-scroll-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes ui-dialog-scroll-out {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@keyframes ui-dialog-scroll-content-in {
    from {
        transform: scale(0.95);
    }
    to {
        transform: scale(1);
    }
}

@keyframes ui-dialog-scroll-content-out {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(0.95);
    }
}
</style>

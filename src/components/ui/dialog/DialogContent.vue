<script setup lang="ts">
import { X } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogClose, DialogContent, DialogPortal, useForwardPropsEmits } from 'reka-ui'

import DialogOverlay from './DialogOverlay.vue'

import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
    defineProps<DialogContentProps & { class?: HTMLAttributes['class']; showCloseButton?: boolean }>(),
    { showCloseButton: true },
)
const emits = defineEmits<DialogContentEmits>()
const delegatedProps = reactiveOmit(props, 'class', 'showCloseButton')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
    <DialogPortal>
        <DialogOverlay />
        <DialogContent
            data-slot="dialog-content"
            v-bind="{ ...$attrs, ...forwarded }"
            :class="['ui-dialog-content', props.class]"
        >
            <slot />
            <DialogClose
                v-if="showCloseButton"
                data-slot="dialog-close"
                class="ui-dialog-close-button"
            >
                <X />
                <span class="ui-dialog-close-label">Close</span>
            </DialogClose>
        </DialogContent>
    </DialogPortal>
</template>

<style scoped lang="scss">
@use './dialog-styles' as dialog;

.ui-dialog-content {
    @include dialog.content;

    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 50;
    translate: -50% -50%;
    max-height: calc(100dvh - 32px);
    overflow-y: auto;
    animation: ui-dialog-content-in 200ms ease-out;

    &:where([data-state='closed']) {
        animation: ui-dialog-content-out 200ms ease-in;
    }

    @media (prefers-reduced-motion: reduce) {
        animation-duration: 1ms;
    }
}

@keyframes ui-dialog-content-in {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes ui-dialog-content-out {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.95);
    }
}
</style>

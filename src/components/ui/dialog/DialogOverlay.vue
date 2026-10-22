<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { DialogOverlay } from 'reka-ui'

import type { DialogOverlayProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes['class'] }>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
    <DialogOverlay
        data-slot="dialog-overlay"
        v-bind="delegatedProps"
        :class="['ui-dialog-overlay', props.class]"
    >
        <slot />
    </DialogOverlay>
</template>

<style scoped lang="scss">
.ui-dialog-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    background-color: var(--color-overlay);
    animation: ui-overlay-in 200ms ease-out;

    &:where([data-state='closed']) {
        animation: ui-overlay-out 200ms ease-in;
    }

    @media (prefers-reduced-motion: reduce) {
        animation-duration: 1ms;
    }
}

@keyframes ui-overlay-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes ui-overlay-out {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>

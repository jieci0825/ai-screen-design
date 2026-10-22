<script setup lang="ts">
import { DialogClose } from 'reka-ui'

import { Button } from '@/components/ui/button'

import type { HTMLAttributes } from 'vue'

const props = withDefaults(
    defineProps<{
        class?: HTMLAttributes['class']
        showCloseButton?: boolean
    }>(),
    { showCloseButton: false },
)
</script>

<template>
    <div
        data-slot="dialog-footer"
        :class="['ui-dialog-footer', props.class]"
    >
        <slot />
        <DialogClose
            v-if="showCloseButton"
            as-child
        >
            <Button variant="outline">Close</Button>
        </DialogClose>
    </div>
</template>

<style scoped lang="scss">
.ui-dialog-footer {
    display: flex;
    flex-direction: column-reverse;
    gap: 8px;

    @media (min-width: 640px) {
        flex-direction: row;
        justify-content: flex-end;
    }
}
</style>

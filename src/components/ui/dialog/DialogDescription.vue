<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { DialogDescription, useForwardProps } from 'reka-ui'

import type { DialogDescriptionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>()
const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
    <DialogDescription
        data-slot="dialog-description"
        v-bind="forwarded"
        :class="['ui-dialog-description', props.class]"
    >
        <slot />
    </DialogDescription>
</template>

<style scoped lang="scss">
.ui-dialog-description {
    color: var(--color-text-secondary);
    font-size: var(--font-size-base);
}
</style>

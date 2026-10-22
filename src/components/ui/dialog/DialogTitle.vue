<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { DialogTitle, useForwardProps } from 'reka-ui'

import type { DialogTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>()
const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
    <DialogTitle
        data-slot="dialog-title"
        v-bind="forwarded"
        :class="['ui-dialog-title', props.class]"
    >
        <slot />
    </DialogTitle>
</template>

<style scoped lang="scss">
.ui-dialog-title {
    color: var(--color-text-primary);
    font-size: var(--font-size-lg);
    font-weight: 600;
    line-height: 1.2;
}
</style>

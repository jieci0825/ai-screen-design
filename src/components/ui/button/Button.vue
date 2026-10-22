<script setup lang="ts">
import { Primitive } from 'reka-ui'

import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from './types'

defineOptions({ name: 'UiButton' })

interface Props extends PrimitiveProps {
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
    as: 'button',
    variant: 'default',
    size: 'default',
})
</script>

<template>
    <Primitive
        data-slot="button"
        :data-variant="variant"
        :data-size="size"
        :as="as"
        :as-child="asChild"
        :class="['ui-button', props.class]"
    >
        <slot />
    </Primitive>
</template>

<style scoped lang="scss">
.ui-button {
    --button-bg: var(--color-primary);
    --button-hover: var(--color-primary-hover);
    --button-active: var(--color-primary-active);
    --button-text: var(--color-text-on-primary);
    --button-icon-size: 16px;

    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 36px;
    padding: 8px 16px;
    border: 1px solid transparent;
    border-radius: var(--border-radius-base);
    background-color: var(--button-bg);
    color: var(--button-text);
    font-size: var(--font-size-base);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    transition:
        background-color 150ms ease,
        border-color 150ms ease,
        color 150ms ease,
        box-shadow 150ms ease;

    &:hover {
        background-color: var(--button-hover);
    }

    &:active {
        background-color: var(--button-active);
    }

    &:focus-visible {
        outline: 2px solid var(--color-focus-ring);
        outline-offset: 2px;
    }

    &:where(:disabled, [aria-disabled='true']) {
        pointer-events: none;
        opacity: 0.5;
    }

    &:where([aria-invalid='true']) {
        border-color: var(--color-error);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-error) 20%, transparent);
    }

    :deep(svg) {
        flex-shrink: 0;
        width: var(--button-icon-size);
        height: var(--button-icon-size);
        pointer-events: none;
    }

    &:has(> svg) {
        padding-inline: 12px;
    }

    &:where([data-variant='destructive']) {
        --button-bg: var(--color-danger-600);
        --button-hover: var(--color-danger-700);
        --button-active: var(--color-danger-800);
        --button-text: var(--color-text-on-error);
    }

    &:where([data-variant='outline']) {
        --button-bg: var(--color-bg-container);
        --button-hover: var(--color-bg-secondary);
        --button-active: var(--color-primary-subtle);
        --button-text: var(--color-text-primary);

        border-color: var(--color-border-base);
        box-shadow: 0 1px 2px var(--color-shadow-soft);
    }

    &:where([data-variant='secondary']) {
        --button-bg: var(--color-bg-secondary);
        --button-hover: var(--color-border-base);
        --button-active: var(--color-primary-subtle);
        --button-text: var(--color-text-primary);
    }

    &:where([data-variant='ghost']) {
        --button-bg: transparent;
        --button-hover: var(--color-bg-secondary);
        --button-active: var(--color-primary-subtle);
        --button-text: var(--color-text-primary);
    }

    &:where([data-variant='link']) {
        --button-bg: transparent;
        --button-hover: transparent;
        --button-active: transparent;
        --button-text: var(--color-primary);

        text-underline-offset: 4px;

        &:hover {
            text-decoration: underline;
        }
    }

    &:where([data-size='xs'], [data-size='icon-xs']) {
        --button-icon-size: 12px;

        height: 24px;
        font-size: var(--font-size-sm);
    }

    &:where([data-size='xs']) {
        gap: 4px;
        padding: 4px 8px;

        &:has(> svg) {
            padding-inline: 6px;
        }
    }

    &:where([data-size='sm']) {
        gap: 6px;
        height: 32px;
        padding-inline: 12px;

        &:has(> svg) {
            padding-inline: 10px;
        }
    }

    &:where([data-size='lg']) {
        height: 40px;
        padding-inline: 24px;

        &:has(> svg) {
            padding-inline: 16px;
        }
    }

    &:where([data-size='icon'], [data-size='icon-xs'], [data-size='icon-sm'], [data-size='icon-lg']) {
        padding: 0;
        aspect-ratio: 1;

        &:has(> svg) {
            padding: 0;
        }
    }

    &:where([data-size='icon']) {
        width: 36px;
    }

    &:where([data-size='icon-xs']) {
        width: 24px;
    }

    &:where([data-size='icon-sm']) {
        width: 32px;
        height: 32px;
    }

    &:where([data-size='icon-lg']) {
        width: 40px;
        height: 40px;
    }

    @media (prefers-reduced-motion: reduce) {
        transition-duration: 1ms;
    }
}
</style>

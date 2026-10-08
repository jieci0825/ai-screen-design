<script setup lang="ts">
import type { MaterialSchema } from '../../types'

interface Props {
    schema: MaterialSchema
}
const { schema } = defineProps<Props>()
</script>

<template>
    <div
        class="text"
        :style="schema.style"
    >
        {{ schema.props.content }}
    </div>
</template>

<style scoped lang="scss"></style>

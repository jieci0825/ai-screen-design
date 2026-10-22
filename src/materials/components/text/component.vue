<script setup lang="ts">
import type { MaterialSchema } from '@/materials'

interface Props {
    schema: MaterialSchema
}
const { schema } = defineProps<Props>()
</script>

<template>
    <div
        class="text-material"
        :style="schema.style"
    >
        {{ schema.props.content }}
    </div>
</template>

<style scoped lang="scss">
.text-material {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>

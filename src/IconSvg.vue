<script setup lang="ts">
// import { defineComponent, type PropType } from 'vue'

interface Props {
    color?: string
    size?: string | number
    stroke?: string | number
}

withDefaults(defineProps<Props>(), {
    color: 'currentColor',
    size: 24,
    stroke: '1.5'
})
</script>

<template>
    <svg
        :width="size"
        :height="size"
        :stroke="color"
        :stroke-width="stroke"
        fill="none"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        v-bind="$attrs"
    >
        <slot />
    </svg>
</template>
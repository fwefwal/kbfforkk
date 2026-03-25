<script lang="ts" setup>
const props = defineProps<{
    to: `/${string}`,
    content: string
}>()

</script>

<template>
    <NuxtLink :to="props.to">{{ content }}</NuxtLink>
</template>

<style scoped>
a {
    color: black;
    text-decoration: none;
    font-weight: 700;
    font-size: 20px;
    line-height: 1.5;
}

.router-link-active {
    font-weight: 700;
    color: rgb(255, 100, 100);
    pointer-events: none;
}
</style>
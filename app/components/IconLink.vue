<script lang="ts" setup>

const props = defineProps<{
    link: "fb" | "insta" | "linkedin" | "twitter"
}>()

const iconAlt = `${props.link} icon`
const iconSrc = `/icons/${props.link}.svg`

const links = {
    fb: "https://www.facebook.com",
    insta: "https://www.instagram.com",
    linkedin: "https://www.linkedin.com",
    twitter: "https://www.x.com",
} as const;

</script>

<template>
    <a :href="links[props.link]">
        <img :alt="iconAlt" :src="iconSrc" />
    </a>
</template>

<style scoped>
    img {
        height: 30px;
        width: auto;
    }
</style>
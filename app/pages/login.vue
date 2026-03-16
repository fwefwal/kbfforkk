<script lang="ts" setup>
const route = useRouter()

async function login(event: SubmitEvent) {
    const form = event.target as HTMLFormElement

    // TODO 
    // 1. Достаньте данные из переданной формы
    // 2. Сделайте запрос к /api/auth/login
    // используя useFetch
    // 3. Дождитесь результат запроса: 
    // если есть ошибки - отобразите их на странице, 
    // если ошибок нет - перенаправьте пользователя на
    // страницу Профиля через route
}
</script>

<template>
    <form @submit.prevent="login" method="post">
        <!-- TODO -->
        <!-- добавьте необходимые поля -->
        <NuxtLink to="/signup">Создать аккаунт</NuxtLink>
    </form>
</template>

<style scoped>
/* TODO */
/* стилизуйте согласно макету */
</style>
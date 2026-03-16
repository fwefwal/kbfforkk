<script lang="ts" setup>
const route = useRouter()

async function signUp(event: SubmitEvent) {
    const form = event.target as HTMLFormElement

    // TODO 
    // 1. Достаньте данные из переданной формы
    // 2. Сделайте запрос к /api/auth/signup
    // используя useFetch
    // 3. Дождитесь результат запроса: 
    // если есть ошибки - отобразите их на странице, 
    // если ошибок нет - перенаправьте пользователя на
    // страницу Логина через route
}
</script>

<template>
    <form @submit.prevent="signUp" method="post">
        <!-- TODO -->
        <!-- добавьте необходимые поля -->
        <NuxtLink to="/signup">Уже есть аккаунт?</NuxtLink>
    </form>
</template>

<style scoped>
/* TODO */
/* стилизуйте согласно здравому смыслу */
</style>
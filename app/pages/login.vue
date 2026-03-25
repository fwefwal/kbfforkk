
    <!-- // TODO 
    // 1. Достаньте данные из переданной формы
    // 2. Сделайте запрос к /api/auth/login
    // используя useFetch
    // 3. Дождитесь результат запроса: 
    // если есть ошибки - отобразите их на странице, 
    // если ошибок нет - перенаправьте пользователя на
    // страницу Профиля через route -->

    <script lang="ts" setup>
const router = useRouter()
const error = ref<string>('')

async function login(event: SubmitEvent) {
    event.preventDefault()
    error.value = ''

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
        error.value = 'заполните email и пароль'
        return
    }

    const { error: fetchError } = await useFetch('/api/login', {
        method: 'POST',
        body: { email, password },
        credentials: 'include'
    })

    if (fetchError.value) {
        error.value = fetchError.value.message || 'неверный email или пароль'
        return
    }

    await router.push('/profile')
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="header-row">
        <h1>Authorization</h1>
      </div>

      <form @submit.prevent="login">
        <div class="field">
          <label for="email">Login</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="."
          />
        </div>

        <div class="field">
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="."
          />
        </div>

        <button type="submit">Submit</button>

        <div v-if="error" class="error">
          {{ error }}
        </div>

        <div class="link-wrapper">
          <NuxtLink to="/signup">создать аккаунт</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Твои стили оставляем без изменений */
.auth-page {
    padding: 20px;
    min-height: 227px;
    min-width: 335px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
}

.auth-card {
    width: fit-content;
    background: white;
}

.header-row {
    display: flex;
    align-items: baseline;
    gap: 100px;
    margin-bottom: 40px;
}

h1 {
    margin-bottom: 0;
    font-size: 16px;
    text-align: left;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
}

.field {
    color: #00000099;
    margin-left: 40px;
    margin-bottom: 20px;
    text-align: left;
}

label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-family: "Roboto", sans-serif;
    margin-left: 25px;
}

input {
    width: 100%;
    padding: 12px;
    border: none;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    font-size: 16px;
    margin-left: 25px;
}

.error {
    color: red;
    margin: 10px 0;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
}

button {
    margin-left: 140px;
    color: #00000099;
    border: none;
    background-color: rgba(255, 255, 255, 0);
    font-size: 14px;
    cursor: pointer;
    font-family: "Roboto", sans-serif;
}

.link-wrapper {
    margin-top: 20px;
    text-align: center;
}
</style>
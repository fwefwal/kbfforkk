<script lang="ts" setup>
const router = useRouter()
const error = ref<string>('')
const loading = ref(false)

async  function signUP(event: SubmitEvent) {
   const form = event.target as HTMLFormElement
  const formData = new FormData(form)

const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const password = formData.get('password')?.toString()

  error.value = ''
  loading.value = true

  try {
    const { error: fetchError } = await useFetch('/api/signup', {
      method: 'POST',
      body: { name, email, password },
      credentials: 'include'
    })

    if (fetchError.value) {
      error.value = fetchError.value?.data?.message 
                 || fetchError.value?.data?.statusMessage 
              || 'ошибка при регистрации'
      return
    }

    await router.push('/login')

  } catch (err: any) {
    error.value = err?.message || 'произошла неизвестная ошибка'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
<div class="auth-card">
  <div class="header-row">
    <h1>Authorization</h1>
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
      <form @submit.prevent="signUP">

              <div class="field">
        <label>Имя / Никнейм</label>
        <input
          name="name"
          type="text"
          placeholder="Ваше имя"
          required
        />
      </div>

        
      <div class="field">
        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="your@email.com"
          required
        />
      </div>

            <div class="field">
        <label>Пароль</label>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>


            <button type="submit" class="submit-btn" :disabled="loading">
        {{ loading ? 'Регистрация...' : 'Submit' }}
      </button>

      <div class="login-link">
        Уже есть аккаунт? 
        <NuxtLink to="/login">Войти</NuxtLink>
      </div>
      
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
    padding: 20px;
  min-height: 227px;
  min-width: 335px;
  background: white;
  border-radius: 10px;
 box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
}

.auth-card {
  width: 100%;
  max-width: 100%;
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
    color:#00000099;
    margin-left: 40px;
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings:
  "wdth" 100;
  margin-left: 25px;
}

input {
  width: 100%;
  padding: 12px;
  border: none;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  font-size: 16px;
      width: fit-content;
        margin-left: 25px;
      
}

.error {
  color: red;
  margin: -1px;
  font-size: 16px;
      font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings:
  "wdth" 100;
  
}

button {
        margin-left: 140px;
  color: #00000099;
  border: none;
  background-color: rgba(255, 255, 255, 0);
  font-size: 14px;
  cursor: pointer;
    font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings:
  "wdth" 100;
}
</style>
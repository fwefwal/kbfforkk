<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  login: '',
  password: ''
})

const error = ref('')

const handleLogin = () => {
  error.value = ''

  const email = formData.value.login.trim()

  if (!email) {
    error.value = 'Invalid credentials'
    return
  }

  if (!email.includes('@') || !email.includes('.')) {
    error.value = 'Invalid credentials'
    return
  }
  console.log('логин и пароль:', formData.value)
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
      <form @submit.prevent="handleLogin">
        <div class="field">
          <label>Login</label>
          <input v-model="formData.login" type="text" placeholder="." />
        </div>

        <div class="field">
          <label>Password</label>
          <input v-model="formData.password" type="password" placeholder="." />
        </div>
        <button type="submit">Submit</button>
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
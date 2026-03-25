<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { User } from '~~/shared/types/user'
import Paper from '~/components/Paper.vue'

const users = ref<User[]>([])
const offset = ref<number>(0)
const loading = ref<boolean>(false)
const errorMessage = ref<string | null>(null)
const canLoadMore = ref<boolean>(true)

const limit = 5

const getUsers = async () => {
  loading.value = true
  errorMessage.value = null

  try {
    const data = await $fetch<User[]>('/api/users')

    const chunk = data.slice(offset.value, offset.value + limit)

    users.value.push(...chunk)

    if (chunk.length < limit) {
      canLoadMore.value = false
    }

    offset.value += limit

  } catch (error: unknown) {
    errorMessage.value = (error as Error).message
  } finally {
    loading.value = false
  }
}

onMounted(() => getUsers())
</script>

<template>
    <div class="container">
        <Typography type="h1" class="title" />
        <div v-if="errorMessage" class="error">
      {{ errorMessage }}></div>
        <div v-if="loading" class="loader-container">
            <div class="spinner"></div>
        </div>

        <article v-else class="users-list">
            <Paper v-for="user in users" :key="user.id" class="user-card">
                <span class="user-name">
                    {{ user.firstName }} {{ user.lastName }} {{ user.maidenName }}
                </span>
                <span class="user-email">{{ user.email }}</span>
            </Paper>

            <Paper v-if="!isLastPage" class="button-card">
                <button @click="getUsers(5)">...</button>
            </Paper>
        </article>
    </div>
</template>

<!-- <template>
  <div class="page">
    <p v-if="errorMessage" class="error">
      {{ errorMessage }}
    </p>

    <div v-show="loading" class="loader-wrap">
      <div class="loader"></div>
    </div>

    <article class="list">
      <Paper v-for="user in users" :key="user.id">
        <div class="user-row">
          <span class="name">
            {{ user.firstName }} {{ user.lastName }} {{ user.maidenName }}
          </span>

          <span class="email">
            {{ user.email }}
          </span>
        </div>
      </Paper>

      <Paper v-if="canLoadMore">
        <button
          class="more"
          @click="getUsers"
          :disabled="loading"
        >
          ...
        </button>
      </Paper>
    </article>
  </div>
</template>
 -->


<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    font-family: sans-serif;
}

.title {
    margin-bottom: 20px;
}

.users-list {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.user-card {

        gap: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.user-name {
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings:
  "wdth" 100;
    font-weight: 500;
    color: #333;
}

.user-email {
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings:
  "wdth" 100;
    color: #999;
    font-size: 0.9em;
}

.button-card {
    padding: 0;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

button {
    width: 100%;
    padding: 15px;
    border: 0;
    background: #fff;
    cursor: pointer;
    color: #666;
    font-size: 16px;
    transition: background 0.5s;
    text-align: left;
}

button:hover {
    background: #f9f9f9;
}

.loader-container {
    padding: 20px;
}

.spinner {
    width: 30px;
    height: 30px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #0033cc;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
</style>
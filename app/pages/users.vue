<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Typography from '@/components/Typography.vue'
import Paper from '@/components/Paper.vue'
import type { User } from '~~/shared/types/user'
import type { UsersDTO } from '~~/shared/types/user.dto'

const users = ref<User[]>([])
const offset = ref<number>(0)
const loading = ref<boolean>(false)
const hasMore = ref<boolean>(true)
const errorMessage = ref<string | null>(null)

const getUsers = async (limit: number = 5) => {
    if (!hasMore.value) return

    loading.value = true
    errorMessage.value = null

    const url = `/api/users?offset=${offset.value}&limit=${limit}`

    try {
        const { data, error } = await useFetch<UsersDTO>(url)

        if (error.value) {
            throw new Error(error.value.message || 'Ошибка загрузки пользователей')
        }

        if (!data.value) {
            throw new Error('Нет данных от сервера')
        }

        users.value = [...users.value, ...data.value.users]

        offset.value += limit

        hasMore.value = data.value.users.length === limit
    } catch (error: unknown) {
        errorMessage.value = (error as Error).message
        console.error(error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    getUsers(5)
})
</script>

<template>
    <Typography type="h1" content="Users" />
    <div v-if="loading" class="spinner">
    </div>

    <article>
        <Paper v-for="user in users" :key="user.id">
            <span>
                {{ user.firstName }} {{ user.lastName }} {{ user.maidenName }}
            </span>
            <span>{{ user.email }}</span>
        </Paper>

        <Paper v-if="hasMore && !loading">
            <button @click="getUsers(5)">Load</button>
        </Paper>

        <p v-if="errorMessage" style="color: red;">
            {{ errorMessage }}
        </p>
    </article>
</template>
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
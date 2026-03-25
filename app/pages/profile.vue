<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import type { User } from '~~/shared/types/user'
import men from '~~/public/images/male_profile.png'
import fem from '~~/public/images/female_profile.png'

const user = ref<User | null>(null)
const loading = ref(true)
const errorMessage = ref<string | null>(null)

const avatarSrc = computed(() => {
  if (!user.value) return men

  return user.value.gender === 'female'
    ? fem
    : men
})

onMounted(async () => {
  loading.value = true
  errorMessage.value = null

  try {
    const data = await $fetch<User>('/api/profile')
    user.value = data
  } catch (err: any) {
    console.error(err)

    if (err?.status === 401 || err?.data?.statusCode === 401) {
      await navigateTo('/login')
      return
    }

    errorMessage.value = err?.data?.message || 
                        err?.data?.statusMessage || 
                        'ошибка загрузки профиля'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="profile-page">
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="loading" class="loading">Loading profile...</p>

    <div v-if="user" class="content">
      <h1 class="title">My profile</h1>

      <div class="row">
        <div class="info">
          <div class="info-row">Username: {{ user.username }}</div>
          <div class="info-row">Name: {{ user.firstName }}</div>
          <div class="info-row">Lastname: {{ user.lastName }}</div>
          <div class="info-row">Maiden name: {{ user.maidenName || '—' }}</div>
          <div class="info-row">Gender: {{ user.gender }}</div>
          <div class="info-row">Email: {{ user.email }}</div>
        </div>

        <div class="avatar">
          <img :src="avatarSrc" alt="Profile avatar" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 900px;
  margin: 60px auto;
  padding: 0 40px;
}

.title {
  font-size: 56px;
  font-weight: 800;
  color: #21243D;
  margin-bottom: 50px;
  text-align: left;
}

.row {
  display: flex;
  gap: 100px;
  align-items: flex-start;
}

.info {
  flex: 1;
}

.info-row {
  font-size: 19px;
  margin-bottom: 18px;
  padding: 14px 24px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  color: #26314a;
  width: fit-content;
  min-width: 320px;
}

.avatar {
  flex-shrink: 0;
}

.avatar img {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #e5e5e5;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.loading,
.error {
  text-align: center;
  font-size: 1.3rem;
  padding: 100px 20px;
}

.error { color: rgb(255, 100, 100); }
.loading { color: #666; opacity: 0.8; }

/* Адаптив */
@media (max-width: 768px) {
  .row {
    flex-direction: column;
    gap: 50px;
    align-items: center;
  }
  .info-row {
    min-width: 100%;
    text-align: center;
  }
  .avatar img {
    width: 220px;
    height: 220px;
  }
}
</style>
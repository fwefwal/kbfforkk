<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import type { User, UsersDTO } from '@/types'

const dogava = '/images/dog.png'
const femava = '/images/female.png'
const malava   = '/images/male.png'

const user = ref<User | null>(null)
const loading = ref(true)

onMounted(() => {
  // ajax('')
  fetch('/data/users.json')
    .then<UsersDTO>(res => res.json())
    .then(data => {
      user.value = data.users?.[0] ?? null
    })
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
})

const profileImage = computed(() => {
  if (!user.value) return dogava

  const gender = user.value.gender?.toLowerCase()

  if (gender === 'female') {
    return femava
  }
  
  if (gender === 'male') {
    return malava
  }

  return dogava
})

</script>

<template>
  <div v-if="loading" class="loading">loading...</div>
  <div v-else-if="!user" class="no-user">404 | data lost</div>

  <div v-else class="profile-page">
    <h1 class="title">My profile</h1>

    <div class="content">
      <div class="info">
        <div class="info-row">Username: {{ user.username }}</div>
        <div class="info-row">Name: {{ user.firstName }}</div>
        <div class="info-row">Lastname: {{ user.lastName }}</div>
        <div class="info-row">Gender: {{ user.gender }}</div>
        <div class="info-row">Email: {{ user.email }}</div>
      </div>

      <div class="avatar">
        <img :src="profileImage" alt="avatar image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 40px;
}

.title {
  font-size: 44px;
  font-weight: 700;
  color: #111;
  margin: 0 0 15% 0;
  text-align: left;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 100px;
}

.info {
flex: 1;
min-width: 0;
}

.info-row {
  font-size: 19px;
  margin-bottom: 15px;
  line-height: 2;
  padding: 5px 20px 5px 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  color: #222;
  border-radius: 10px;
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings:
  "wdth" 100;
  width: fit-content;
  max-width: 100%;
}

.info-row:last-child {
  border-bottom: none;
}

.avatar {
  flex-shrink: 0;
}

.avatar img {
  width: 280px;
  height: 280px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #e5e5e5;
}

.loading,
.no-user {
  padding: 180px 20px;
  text-align: center;
  font-size: 1.4rem;
  color: #777;
}

@media (max-width: 700px) {
  .content {
    flex-direction: column;
    gap: 60px;
    align-items: center;
  }

  .info {
    text-align: center;
    max-width: 100%;
  }

  .avatar img {
    width: 243px;
    height: 243px;
  }
}
</style>
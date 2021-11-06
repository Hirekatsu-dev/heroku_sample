<template>
  <HomePageTemplate
    :api="api"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Api } from '@/api/api'
import HomePageTemplate from '@/components/HomePageTemplate.vue' // @ is an alias to /src

export default defineComponent({
  components: {
    HomePageTemplate
  },
  setup () {
    const api = new Api()

    return api
  }
})
</script>

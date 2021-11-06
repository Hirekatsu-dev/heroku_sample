<template>
  <div class="w-full flex flex-col items-center">
    <div
      class="w-64 p-4 rounded bg-red-500 hover:bg-red-700 text-white text-2xl text-center"
      @click="onClick"
    >
      API実行
    </div>
    <div class="text-center">
      {{ result }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Api } from '@/api/api'

export default defineComponent({
  setup () {
    const api = new Api()

    const result = ref('')

    const onClick = async () => {
      result.value = 'loading...'

      try {
        const res = await api.hello()
        result.value = res.data
      } catch (error) {
        result.value = `error!: ${error}`
      }
    }

    return {
      onClick,
      result
    }
  }
})
</script>

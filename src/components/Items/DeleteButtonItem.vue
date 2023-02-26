<template>
  <div @click="deleteBlock(id)">
    <img :src="iconDelete" style="height: 30px" alt="">
  </div>
</template>

<script>
import iconDelete from '@/assets/icon-delete.svg'
export default {
  name: "DeleteButtonItem",
  props: {
    id: {
      type: String,
      default: null,
      required: true
    }
  },
  data () {
    return {
      iconDelete
    }
  },
  methods: {
    deleteBlock (id) {
      let element = document.getElementById(id)
      element.remove()
    }
  }
}
</script>

<style scoped>

</style>
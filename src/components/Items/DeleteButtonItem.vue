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
      const blocks = this.$parent.$options.parent.$parent.blocks
      blocks.forEach((item, index) => {
        if (item.id === id) {
          blocks.splice(index, 1)
        }
      })
      let element = document.getElementById(id)
      element.remove()
    }
  }
}
</script>

<style scoped>

</style>
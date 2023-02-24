<template>
  <div class="wrapper">
    <div class="inner">
      <div class="relative">
        <div class="top-right">
          <img v-if="movie.isEdit" class="cursor-pointer save" :src="iconSave" alt="" @click="$emit('saveMovie')">
          <img v-else class="cursor-pointer edit" :src="iconEdit" alt="" @click="$emit('editMovie')">
          <img class="cursor-pointer delete" :src="iconDelete" alt="" @click="$emit('deleteMovie')">
        </div>
        <img :src="iconProfile" :alt="iconProfile">
      </div>
      <div v-if="movie.isEdit">
        <div>
          <input v-model="movie.title">
        </div>
        <div>
          <input v-model="movie.description">
        </div>
      </div>
      <div v-else>
        <div class="semi-bold">
          {{ movie.title }}
        </div>
        <div>
          {{ movie.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import iconProfile from '@/assets/icon-profile.svg'
import iconDelete from '@/assets/icon-delete.svg'
import iconEdit from '@/assets/icon-edit.svg'
import iconSave from '@/assets/icon-save.svg'

export default {
  name: "ProfileItem",
  data () {
    return {
      iconProfile,
      iconDelete,
      iconEdit,
      iconSave,
      movie: this.parentMovie
    }
  },
  props: {
    parentMovie: {
      type: Object,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="sass">
.wrapper
  width: fit-content
  padding: 4px
  text-align: center
.inner
  background: #cbf3ff
  padding: 8px
  border-radius: 10px
.relative
  position: relative
.top-right
  position: absolute
  right: 0
  top: 0
.semi-bold
  font-weight: 600
.cursor-pointer
  margin: 5px
  cursor: pointer
</style>
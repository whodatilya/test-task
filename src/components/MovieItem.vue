<template>
  <div class="wrapper">
    <div class="inner">
      <div class="relative">
        <div class="top-right" v-if="isPageEdit">
          <img v-if="movie.isEdit" class="cursor-pointer save" :src="iconSave" alt="" @click="$emit('saveMovie')">
          <img v-else class="cursor-pointer edit" :src="iconEdit" alt="" @click="$emit('editMovie')">
          <img class="cursor-pointer delete" :src="iconDelete" alt="" @click="$emit('deleteMovie')">
        </div>
        <div @click="$emit('chooseFile')">
          <input type="file" style="display: none" :id="'uploadFile_' + movie.id" @change="$emit('addImage')">
          <img style="max-width: 100%" :src="movie.image !== '' ? movie.image : iconMovie" alt="">
        </div>
      </div>
      <div v-if="movie.isEdit">
        <div style="padding: 8px">
          <input class="textarea__width" v-model="movie.title">
        </div>
        <div>
          <textarea class="textarea__width" v-model="movie.description"></textarea>
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
import iconMovie from '@/assets/icon-movie.svg'
import iconDelete from '@/assets/icon-delete.svg'
import iconEdit from '@/assets/icon-edit.svg'
import iconSave from '@/assets/icon-save.svg'

export default {
  name: "MovieItem",
  data () {
    return {
      iconMovie,
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
    isPageEdit: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="sass">
.wrapper
  padding: 4px
  text-align: center
.inner
  background: #cbf3ff
  padding: 12px
  max-width: 40vh
  width: fit-content
  height: fit-content
  border-radius: 10px
.relative
  position: relative
.top-right
  position: absolute
  right: 0
  top: 0
.semi-bold
  font-weight: 600
  font-size: 18px
.cursor-pointer
  margin: 5px
  cursor: pointer
.textarea__width
  width: 100%
  border: none
  border-radius: 4px
  overflow-y: hidden
</style>
<template>
  <div class="wrapper">
    <div class="inner">
      <div class="relative">
        <div class="top-right">
          <img :src="iconEdit" alt="">
          <img :src="iconDelete" alt="">
        </div>
        <img :src="iconProfile" :alt="iconProfile">
      </div>
      <div class="semi-bold">
        Гордеев Илья
      </div>
      <div>
        Frontend developer
      </div>
    </div>

  </div>
</template>

<script>
import iconProfile from '@/assets/icon-profile.svg'
import iconDelete from '@/assets/icon-delete.svg'
import iconEdit from '@/assets/icon-edit.svg'

export default {
  name: "ProfileItem",
  data () {
    return {
      iconProfile,
      iconDelete,
      iconEdit
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
</style>
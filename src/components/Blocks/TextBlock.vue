<template>
  <div class="padding_8">
    <div v-if="isPageEdit && header.isEdit" class="card-items__inner" style="width: unset !important;">
      <div>
        <input class="input__borders input-padding center-text" type="text" v-model="header.title">
      </div>
      <div>
        <input class="input__borders input-padding center-text" type="text" v-model="header.description">
      </div>
      <div>
        <button @click="headerToggle">Сохранить</button>
      </div>
    </div>
    <div v-else class="card-items__inner" style="position: relative; width: unset">
      <div>
        <delete-button-item style="position: absolute; right: 5px; top: 35px" :id="getId"/>
      </div>
      <div class="icon-position">
        <img v-if="isPageEdit" @click="headerToggle" :src="iconEdit" alt="">
      </div>
      <div class="header-font" style="font-weight: 600">
        {{ header.title ? header.title : header.defaultTitle }}
      </div>
      <div class="header-font" style="font-weight: 400">
        {{ header.description ? header.description : header.defaultDescription }}
      </div>
    </div>
  </div>
</template>

<script>
import deleteButtonItem from '@/components/Items/DeleteButtonItem';
import iconEdit from '@/assets/icon-edit.svg'
export default {
  name: "TextBlock",
  components: { deleteButtonItem },
  props: {
    isPageEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      iconEdit,
      header: {
        title: '',
        description: '',
        defaultTitle: 'Заголовок',
        defaultDescription: 'Описание',
        isEdit: false
      }
    }
  },
  computed: {
    getId () {
      return String(this.$attrs.id)
    }
  },
  methods: {
    headerToggle () {
      this.header.isEdit = !this.header.isEdit
    },
  }
}
</script>

<style scoped>

</style>
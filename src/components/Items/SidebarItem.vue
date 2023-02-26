<template>
  <div v-show="isPageEdit" class="padding_8 sidebar__wrapper" style="margin: 10px">
    <draggable
        class="sidebar__inner"
        :list="listAvailableBlocks"
        :group="{ name: 'blocks', pull: 'clone', put: false }"
    >
      <div
          v-for="block in listAvailableBlocks"
          :key="block.type"
          class="sidebar__text"
      >
        {{ block.name }}
        <div v-if="block.id !== listAvailableBlocks.length - 1">
          <hr>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: "SidebarItem",
  components: { draggable },
  data () {
    return {
      listAvailableBlocks: [
        {
          id: 0,
          type: 'text',
          name: 'Заголовок'
        },
        {
          id: 1,
          type: 'card',
          name: 'Фильмы'
        },
        {
          id: 2,
          type: 'movie',
          name: 'Карточки'
        }
      ]
    }
  },
  props: {
    isPageEdit: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="sass">
.sidebar
  &__wrapper
    background: rgba(255, 255, 255, 0.61)
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.10)
    border-radius: 10px
  &__inner
    padding: 10px
    text-align: center
  &__text
    font-family: 'Comic Sans MS',serif
    font-weight: 500
    font-size: 24px
</style>
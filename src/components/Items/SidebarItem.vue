<template>
  <div v-show="isPageEdit" class="padding_8 sidebar__wrapper" style="margin: 10px">
    <draggable
        class="sidebar__inner"
        :list="listAvailableBlocks"
        :group="{ name: 'blocks', pull: 'clone', put: false }"
        @start="addId"
    >
      <div
          v-for="block in listAvailableBlocks"
          :key="block.type"
          class="sidebar__text"
      >
        <div :key="block.name" style="cursor: pointer">
          {{ block.name }}
        </div>
        <div v-if="block.type !== 'movie'">
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
          id: null,
          type: 'text',
          name: 'Заголовок'
        },
        {
          id: null,
          type: 'card',
          name: 'Фильмы'
        },
        {
          id: null,
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
  },
  computed: {
    lastIndex () {
      return this.listAvailableBlocks
    }
  },
  methods: {
    addId () {
      this.listAvailableBlocks = this.listAvailableBlocks.map(e => {
        e.id = Math.random().toString(36).substring(7)
        return Object.assign({}, e)
      })
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
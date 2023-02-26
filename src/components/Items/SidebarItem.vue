<template>
  <div>
    <draggable
        :list="listAvailableBlocks"
        :group="{ name: 'blocks', pull: 'clone', put: false }"
    >
      <div
          v-for="block in listAvailableBlocks"
          :key="block.type"
      >
        {{ block.name }}
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
          name: 'Заголовок и Описание'
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
  methods: {

  }
}
</script>

<style scoped>

</style>
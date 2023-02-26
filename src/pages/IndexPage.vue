<template>
  <div class="padding_8">
    <div class="view-type__wrapper">
      <span class="view-type__text">
        {{ isEditPage ? 'Режим редактирования' : 'Режим просмотра' }}
      </span>
      <label class="switch">
        <input type="checkbox" v-model="isEditPage">
        <span class="slider round"></span>
      </label>
    </div>
    <sidebar-item :is-page-edit="isEditPage"/>
    <draggable
        v-model="blocks"
        group="blocks"
    >
      <component
          v-for="block in blocks"
          :key="block.id"
          :is="block.type + 'Block'"
          :id="block.id"
          :is-page-edit="isEditPage"
      />
    </draggable>
    <div style="height: 100%"/>
  </div>
</template>
<script>
import cardBlock from '@/components/Blocks/CardBlock';
import movieBlock from "@/components/Blocks/MovieBlock";
import textBlock from '@/components/Blocks/TextBlock'
import SidebarItem from '@/components/Items/SidebarItem'
import draggable from 'vuedraggable'

export default {
  name: 'IndexPage',
  components: { SidebarItem, movieBlock, cardBlock, textBlock, draggable},
  data () {
    return {
      items: [],
      blocks: [],
      isEditPage: false,
    }
  },
  mounted () {
    this.blocks = []
  },
}
</script>

<style scoped>
</style>
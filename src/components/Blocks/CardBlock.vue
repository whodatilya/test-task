<template>
  <div class="cards__wrapper margin-top__30" style="position: relative">
    <div>
      <delete-button-item style="position: absolute; right: 5px; top: 0" :id="getId"/>
    </div>
    <div class="card__search margin-bottom__30">
      <div>
        Введите название фильма:
        <input class="m-right_10 input__borders" type="text" v-model="filterText" placeholder="Пример: Plane">
        <button class="m-right_10" @click="searchMovie">
          Найти
        </button>
        <button @click="cleanSearch">
          Очистить
        </button>
      </div>
    </div>
    <div class="card__wrapper" v-if="items">
      <div
          v-for="movie in !isSearched ? items : findedMovie"
          :key="movie.title"
          class="card__padding"
      >
        <card-item :item="movie"/>
      </div>
    </div>
  </div>
</template>

<script>
import deleteButtonItem from '@/components/Items/DeleteButtonItem';
import cardItem from '@/components/Items/CardItem';
import {nextTick} from "vue";
export default {
  name: "CardBlock",
  components: { cardItem, deleteButtonItem },
  props: {
    isPageEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      filterText: '',
      items: [],
      isSearched: false,
      findedMovie: []
    }
  },
  computed: {
    getId () {
      return String(this.$attrs.id)
    }
  },
  methods: {
    searchMovie () {
      const finded = []
      this.items.forEach(item => {
        if (item.title.toLowerCase().indexOf(this.filterText) !== -1) {
          this.isSearched = true
          finded.push(item)
        }
      })
      if (finded.length) {
        this.findedMovie = finded
      }
    },
    cleanSearch () {
      this.filterText = ''
      this.searchMovie()
    }
  },
  async mounted () {
    await this.$store.dispatch('movies/loadMovies')
    nextTick(() => {
      this.items = this.$store.state.movies.movies
    })
  },

}
</script>

<style scoped>

</style>
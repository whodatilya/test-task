<template>
  <div>
    <div class="first-section__wrapper" style="height: 30vh">
      <div>
        <div>
          <input placeholder="Заголовок"/>
        </div>
        <div>
          <input placeholder="Описание"/>
        </div>
        <div>
          <button>
            Создать
          </button>
        </div>
      </div>
    </div>
    <div class="second-section__wrapper"  style="height: 30vh">
      <div>
        2
      </div>
    </div>
    <div class="cards__wrapper">
      <div class="card__search">
        <label>
          Введите название фильма:
          <input class="m-right_10" type="text" v-model="filterText" placeholder="Example: Plane">
          <button class="m-right_10" @click="searchMovie">
            Найти
          </button>
          <button @click="cleanSearch">
            Очистить
          </button>
        </label>
      </div>
      <div v-if="isSearched" class="card__wrapper">
        <div
            v-for="finded in findedMovie"
            :key="finded.title"
            class="card__padding"
        >
          <card-item :item="finded"/>
        </div>
      </div>
      <div v-else class="card__wrapper">
        <div
            v-for="movie in items"
            :key="movie.title"
            class="card__padding"
        >
          <card-item :item="movie"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { nextTick } from 'vue';
import CardItem from '@/components/CardItem';

export default {
  name: 'IndexPage',
  components: { CardItem },
  data () {
    return {
      items: [],
      filterText: '',
      isSearched: false,
      findedMovie: []
    }
  },
  methods: {
    searchMovie: function () {
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
    cleanSearch: function () {
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

<style scoped lang="sass">
.card
  &__padding
    padding: 8px
  &__search
    text-align: center
  &__wrapper
    padding: 8px
    display: flex
    flex-wrap: wrap
    justify-content: space-between
.m-right
  &_10
    margin-right: 10px
</style>
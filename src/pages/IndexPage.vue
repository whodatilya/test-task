<template>
  <div>
    <div v-if="!items" >
      Loader
    </div>
    <div v-else class="card__wrapper">
      <div v-for="movie in items"
           :key="movie.title"
           style="padding: 8px"
      >
        <div class="card__inner">
          <div class="card__text">
            Название: {{ movie.title }}
          </div>
          <div class="card__text">
            Дата выхода: {{ formatDate(movie.date) }}
          </div>
          <div class="card__text">
            Рейтинг: {{ movie.rating }}
          </div>
          <div class="card__text">
            Оригинальный язык: {{ movie.language }}
          </div>
          <div class="card__text">
            <img :src="movieImage(movie.image)" alt="" style="width: 100%"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {nextTick} from "vue";
import { URL_FETCH_IMAGE } from "@/project-data/urls";
import moment from 'moment'

export default {
  name: 'IndexPage',
  data () {
    return {
      items: []
    }
  },
  methods: {
    movieImage: function (url) {
      return URL_FETCH_IMAGE + url
    },
    formatDate: function (date) {
      return moment(date).format('D.MM.YYYY')
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
  &__wrapper
    padding: 8px
    display: flex
    flex-wrap: wrap
    justify-content: space-between
  &__inner
    min-width: 320px
    background: #B3E5FC
    width: fit-content
    padding: 12px
    border-radius: 10px
  &__text
    font-family: Graphik Kinopoisk LC Web,Tahoma,Arial,Verdana,sans-serif
    font-size: 13px
    line-height: 18px
    font-weight: 600
    padding: 3px 0
</style>
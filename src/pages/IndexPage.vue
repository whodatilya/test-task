<template>
  <div class="padding_8">
    <div class="first-section__wrapper" style="height: 30vh">
      <div>
        <div>
          123
        </div>
        <div>
          123
        </div>
      </div>
    </div>
    <div>
      <div class="padding_8">
        <div class="padding_10 cards-list__wrapper">
          <div>
            <img :src="iconAddNew" alt="">
          </div>
          <div class="cards-list__inners">
            <profile-item/>
            <profile-item/>
            <profile-item/>
          </div>
        </div>
      </div>
    </div>
    <div class="cards__wrapper">
      <div class="card__search">
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
      <div class="card__wrapper">
        <div
            v-for="movie in !isSearched ? items : findedMovie"
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
import ProfileItem from "@/components/ProfileItem";
import iconAddNew from '@/assets/icon-create.svg'

export default {
  name: 'IndexPage',
  components: {ProfileItem, CardItem },
  data () {
    return {
      items: [],
      filterText: '',
      isSearched: false,
      findedMovie: [],
      iconAddNew
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
.input__borders
  width: 60%
  height: 20px
  border-radius: 30px
  padding: 10px
  border: none
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.10)
.card
  &__padding
    padding: 8px
  &__search
    text-align: center
  &__wrapper
    display: flex
    flex-wrap: wrap
    justify-content: space-between
.m-right
  &_10
    margin-right: 10px
.cards-list
  &__inners
    display: flex
    flex-wrap: wrap
    flex-direction: row
  &__wrapper
    background: rgba(255, 255, 255, 0.61)
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.10)
    border-radius: 10px
.padding
  &_8
    padding: 8px
  &_10
    padding: 10px
</style>
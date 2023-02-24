<template>
  <div class="padding_8">
    <div class="padding_8 card-items__wrapper margin-bottom__30">
      <div class="card-items__inner">
        <div>
          <input>
        </div>
        <div>
          <input>
        </div>
        <div>
          <button>Сохранить</button>
        </div>
      </div>
    </div>
    <div>
      <div class="padding_8">
        <div class="padding_10 cards-list__wrapper">
          <div
              v-for="movie in movieList"
              :key="movie.id"
              class="cards-list__inners">
            <movie-item
              :parent-movie="movie"
              @saveMovie="saveMovie(movie)"
              @editMovie="editMovie(movie)"
              @deleteMovie="deleteMovie(movie)"
              @addImage="addImage(movie)"
              @chooseFile="chooseFile(movie)"
            />
          </div>
          <div class="add-button__wrapper">
            <img class="add-button__button" :src="iconAddNew" alt="" @click="createNewItem">
          </div>
        </div>
      </div>
    </div>
    <div class="cards__wrapper margin-top__30">
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
  </div>
</template>
<script>
import { nextTick } from 'vue';
import CardItem from '@/components/CardItem';
import MovieItem from "@/components/MovieItem";
import iconAddNew from '@/assets/icon-create.svg'

export default {
  name: 'IndexPage',
  components: { MovieItem, CardItem },
  data () {
    return {
      iconAddNew,
      items: [],
      findedMovie: [],
      filterText: '',
      isSearched: false,
      movieList: [
          {
            id: 1,
          title: 'Бесславные ублюдки',
          description: 'Вторая мировая война. ' +
              'В оккупированной немцами Франции группа американских солдат-евреев наводит страх на нацистов.',
            isEdit: false,
            image: ''
        },
        {
          id: 2,
          title: 'Убить Билла',
          description: 'В беременную наемную убийцу по кличке Черная Мамба во время бракосочетания стреляет человек по имени Билл.' +
              ' Пуля в голове жертвы, кровь на подвенечном платье, темнота. ',
          isEdit: false,
          image: ''
        },
        {
          id: 3,
          title: 'Криминальное чтиво',
          description: 'Двое бандитов Винсент Вега и Джулс Винфилд ведут философские беседы в перерывах между ' +
              'разборками.',
          isEdit: false,
          image: ''
        },
        {
          id: 4,
          title: 'Криминальное чтиво',
          description: 'Двое бандитов Винсент Вега и Джулс Винфилд ведут философские беседы в перерывах между ' +
              'разборками.',
          isEdit: false,
          image: ''
        },
        {
          id: 5,
          title: 'Криминальное чтиво',
          description: 'Двое бандитов Винсент Вега и Джулс Винфилд ведут философские беседы в перерывах между ' +
              'разборками.',
          isEdit: false,
          image: ''
        },
        {
          id: 6,
          title: 'Криминальное чтиво',
          description: 'Двое бандитов Винсент Вега и Джулс Винфилд ведут философские беседы в перерывах между ' +
              'разборками.',
          isEdit: false,
          image: ''
        },
      ]
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
    },
    editMovie (movie) {
      movie.isEdit = true;
    },
    saveMovie (movie) {
      movie.isEdit = false;
    },
    deleteMovie (movie) {
      this.movieList.splice(movie.id, 1)
    },
    createNewItem () {

    },
    chooseFile (movie) {
      const fileInput = document.getElementById('uploadFile_' + movie.id)
      fileInput.click()
    },
    addImage (movie) {
      const fileInput = document.getElementById('uploadFile_' + movie.id)
      let imgFile = fileInput.files

      if (imgFile && imgFile[0]) {
        let reader = new FileReader
        reader.onload = e => {
          movie.image = e.target.result
        }
        reader.readAsDataURL(imgFile[0])
        this.$emit('fileInput', imgFile[0])
      }
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
  &__wrapper
    background: rgba(255, 255, 255, 0.61)
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.10)
    border-radius: 10px
    display: flex
    justify-content: space-around
    flex-direction: row
    flex-wrap: wrap
.padding
  &_8
    padding: 8px
  &_10
    padding: 10px
.add-button
  &__wrapper
    display: flex
    flex-wrap: wrap
    width: 33vh
    justify-content: space-around
  &__button
    cursor: pointer
.margin
  &-bottom
    &__30
      margin-bottom: 30px
  &-top
    &__30
      margin-top: 30px
.card-items
  &__wrapper
    display: flex
    flex-wrap: wrap
    justify-content: space-between
  &__inner
    background: rgba(255, 255, 255, 0.61)
    width: 100%
    padding: 12px
    border-radius: 10px
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.10)
</style>
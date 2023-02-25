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
        <div class="padding_10 cards-list__wrapper" v-if="movieList">
          <div
              v-for="movie in movieList"
              :key="movie.id"
              class="cards-list__inners">
            <movie-item
                :is-page-edit="isEditPage"
                :parent-movie="movie"
                @saveMovie="saveMovie(movie)"
                @editMovie="editMovie(movie)"
                @deleteMovie="deleteMovie(movie)"
                @addImage="addImage(movie)"
                @chooseFile="chooseFile(movie)"
            />
          </div>
          <div class="add-button__wrapper" v-if="isEditPage">
            <img v-if="!isCreateNew" class="add-button__button" :src="iconAddNew" alt="" @click="createToggle">
            <div v-else class="edit">
              <input type="text" v-model="newItem.title">
              <input type="text" v-model="newItem.description">
              <div>
                <button @click="createNewItem">
                  Сохранить
                </button>
              </div>
            </div>
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
      isEditPage: false,
      isCreateNew: false,
      newItem: {
        title: '',
        description: ''
      },
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
    createToggle () {
      this.isCreateNew = !this.isCreateNew
    },
    createNewItem () {
      this.movieList.push({
        id: this.movieList.slice(-1)[0] + 1,
        title: this.newItem.title,
        description: this.newItem.description,
        image: ''
      })
      this.newItem.title = ''
      this.newItem.description = ''
      this.createToggle()
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
.switch
  position: relative
  display: inline-block
  width: 60px
  height: 34px
.switch input
  opacity: 0
  width: 0
  height: 0
.slider
  position: absolute
  cursor: pointer
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: #ccc
  -webkit-transition: .4s
  transition: .4s
  &:before
    position: absolute
    content: ""
    height: 26px
    width: 26px
    left: 4px
    bottom: 4px
    background-color: white
    -webkit-transition: .4s
    transition: .4s
input:checked + .slider
  background-color: #2196F3
input:focus + .slider
  box-shadow: 0 0 1px #2196F3
input:checked + .slider:before
  -ms-transform: translateX(26px)
  transform: translateX(26px)
.slider.round
  border-radius: 34px
  &:before
    border-radius: 50%
.view-type
  &__wrapper
    display: flex
    justify-content: flex-end
  &__text
    justify-content: flex-end
    margin: auto 0
    font-weight: 600
    padding-right: 20px
.edit
  background: #cbf3ff
  padding: 12px
  max-width: 40vh
  width: fit-content
  height: fit-content
  border-radius: 10px
</style>
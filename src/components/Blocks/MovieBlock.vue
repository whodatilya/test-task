<template>
  <div class="padding_8">
    <div>
      <delete-button-item style="position: absolute; right: 25px" :id="getId"/>
    </div>
    <div class="padding_10 cards-list__wrapper" v-if="movieList">
      <div
          v-for="movie in movieList"
          :key="movie.id"
          class="cards-list__inners">
        <movie-item
            :is-page-edit="isPageEdit"
            :parent-movie="movie"
            @saveMovie="saveMovie(movie)"
            @editMovie="editMovie(movie)"
            @deleteMovie="deleteMovie(movie)"
            @addImage="addImage(movie)"
            @chooseFile="chooseFile(movie)"
        />
      </div>
      <div class="add-button__wrapper" v-if="isPageEdit">
        <img v-if="!isCreateNew" class="add-button__button" :src="iconAddNew" alt="" @click="createToggle">
        <div v-else class="edit">
          <input type="text" class="input-padding" v-model="newItem.title">
          <input type="text" class="input-padding" v-model="newItem.description">
          <div>
            <button @click="createNewItem">
              Сохранить
            </button>
          </div>
          <div>
            <button @click="createToggle">
              Отменить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import iconAddNew from '@/assets/icon-create.svg'
import movieItem from '@/components/Items/MovieItem';
import deleteButtonItem from '@/components/Items/DeleteButtonItem';
export default {
  name: "MovieBlock",
  components: { movieItem, deleteButtonItem },
  props: {
    isPageEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      iconAddNew,
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
  computed: {
    getId () {
      return String(this.$attrs.id)
    }
  },
  methods: {
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
      this.newItem.title = ''
      this.newItem.description = ''
      this.isCreateNew = !this.isCreateNew
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
    },
    createNewItem () {
      this.movieList.push({
        id: this.movieList.slice(-1)[0].id + 1,
        title: this.newItem.title,
        description: this.newItem.description,
        image: ''
      })
      this.createToggle()
    },
  }
}
</script>

<style scoped lang="sass">

</style>
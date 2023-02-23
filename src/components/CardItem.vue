<template>
  <div class="card__inner">
    <div class="card__text-position">
              <span class="card__text">
                Название:
              </span>
      {{ item.title }}
    </div>
    <div class="card__text-position">
              <span class="card__text">
                Дата выхода:
              </span>
      {{ formatDate(item.date) }}
    </div>
    <div class="card__text-position">
              <span class="card__text">
                Рейтинг:
              </span>
      {{ item.rating }} ☆
    </div>
    <div class="card__text-position">
              <span class="card__text">
                Оригинальный язык:
              </span>
      {{ item.language }}
    </div>
    <div class="card__text">
      <img :src="movieImage(item.image)" alt="" style="width: 100%"/>
    </div>
  </div>
</template>

<script>
import {URL_FETCH_IMAGE} from "@/project-data/urls";
import moment from "moment/moment";

export default {
  name: "CardItem",
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  methods: {
    movieImage: function (url) {
      return URL_FETCH_IMAGE + url
    },
    formatDate: function (date) {
      return moment(date).format('D.MM.YYYY')
    },
  }
}
</script>

<style scoped lang="sass">
.card
  &__inner
    min-width: 320px
    background: #B3E5FC
    width: fit-content
    padding: 12px
    border-radius: 10px
    box-shadow: 2px 2px 2px 2px rgb(179, 198, 208)
  &__text-position
    display: flex
    justify-content: space-between
    align-items: center
  &__text
    font-family: Graphik Kinopoisk LC Web,Tahoma,Arial,Verdana,sans-serif
    font-size: 13px
    line-height: 18px
    font-weight: 600
    padding: 3px 0

</style>
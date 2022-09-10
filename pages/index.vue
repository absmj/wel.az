<template>
  <!-- <p class="text-white">{{films}}</p> -->
</template>

<script>
const qs = require('qs');

// import {mapActions} from "vuex"

export default {
  async asyncData({store}){
  },

  async mounted(){
  	// console.log(films)
  },

  async created(){
    await this.$store.dispatch("getFilms")
  }
}
</script>

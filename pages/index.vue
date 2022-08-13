<template>
  <!-- <p class="text-white">{{films}}</p> -->
</template>

<script>
const qs = require('qs');

// import {mapActions} from "vuex"

export default {
  async asyncData({store}){
    await store.dispatch("getFilms")
  },

  async mounted(){
  	// console.log(films)
  },

  async created(){

  }
}
</script>

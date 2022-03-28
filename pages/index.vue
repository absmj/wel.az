<template>
  
</template>

<script>
const qs = require('qs');

// import {mapActions} from "vuex"

export default {
  // async asyncData({$axios, store}){
  //   const films = await $axios.$post('http://localhost/index.php', qs.stringify({g: '', c: '', r: '', y: '', p:1, m: 20, type: 1, s: 1}))

  //   store.dispatch("setFilmByAsync", films) 

  //   return { films }
  // },

  async created(){
  	await this.$store.dispatch("getFilms")
  }
}
</script>

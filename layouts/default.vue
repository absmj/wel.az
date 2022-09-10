<template>
  <div class="d-flex flex-column" style="min-height:100vh">

    <!--Naviqasiya-->
    <div class="container">
      <div class="row p-0 m-0">
        <nav class="col-12 d-flex flex-column justify-content-center flex-lg-row p-0 m-0 justify-content-lg-between nav navbar">
          <img class="img-fluid" src='/img/logo.svg' style="width: 75px; filter: invert(100%); transform: 1s">
                    <!-- Filter -->
          
          <!-- Axtarış -->
          <div v-if= "$store.state.type === 1" class="m-lg-auto" style="position: relative; transform: 1s">
            <input v-model="search" type="text" class="input-searcher" style="position:relative" />
            <i style="cursor: pointer;" v-if = "!$store.state.searchLoading" @click = "$store.dispatch('search', search)"  class="fa fa-search input-icon"></i><i v-else class="fas fa-spinner input-icon __l_api"></i>
              <button @click="filter = true, $bvModal.show('modal-filter')" style="position: absolute; top: -.25em; right: -3.125em;" class="btn btn-primary"><i class="fa fa-filter" aria-hidden="true"></i></button>
          </div>

          <!-- <p>{{$store.state.query}}</p>         -->

          <!-- Dil -->
          <div class="l-slct">
            <div class="dropdown">
              <b-dropdown id="dropdown-right" right no-caret variant="primary" class="m-2">
                <template v-slot:button-content>
                  <i class="fas fa-globe" />
                  <span>&nbsp; {{' '}}</span>
                </template>

                <b-dropdown-item v-on:click = "$store.dispatch('changeLang', 'az')" href="#">Azərbaycan dili</b-dropdown-item>
                <b-dropdown-item v-on:click = "$store.dispatch('changeLang', 'en')" href="#">English</b-dropdown-item>
                <b-dropdown-item v-on:click = "$store.dispatch('changeLang', 'ru')" href="#">Русскый</b-dropdown-item>
                <b-dropdown-item v-on:click = "$store.dispatch('changeLang', 'tr')" href="#">Türkçe</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>



        </nav>
      </div>
      <cover class="d-none d-md-block" />
    </div>
    <div class="mt-2 mt-md-auto p-2">
      <list />
    </div>
    <!-- <p class="text-white">{{screen}}</p> -->
    <MobileCover v-if="screen < 798 && $store.getters.films.length > 0 && mobileModal" />
    <filtering v-if="filter"/>
    <Player v-if="player" type="1" :film = "$store.state.films[$store.state.selected]"/>
    <Nuxt />
  </div>
</template>

<script>

import {mapMutations, mapGetters} from "vuex"
import {functions} from "@/mixins.js"
import MobileCover from "@/components/MobileCover"

export default {
  components: {MobileCover},
  mixins: [functions],
  data(){
    return{
      load: false,
      filter: false,
      player: false,
      films: [],
      search: '',
      screen: null,
      mobileModal: false
    }
  },
  watch:{
    filter(){
      if(!this.filter) window.history.pushState("", "/filter")
    }
  },

  mounted(){
      this.screen = window.screen.width;
      this.$root.$on("closeFilter",e => this.filter = false)
      this.$root.$on('player', e => this.player = e)
      this.$root.$on("modal", v => this.mobileModal = v)
      this.$root.$on("close", v => this.mobileModal = v)


  },

  // async asyncData({store}){
  //     await store.dispatch("getFilms")
  //     const films = store.getters.films;
  //     return { films }
  // }

}
</script>

<style>


</style>
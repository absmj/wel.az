
<template>
    <div style="width: 100%" v-if="$store.getters.films.length > 0">
            <div class="col-12">
                <div class="row p-0 m-0">
                    <div class="col-12 col-lg-7 offset-lg-1">
                        <div class="row rw-resp p-0 m-0 d-flex justify-content-center justify-content-sm-start">
                            <div class="col-4 d-sm-flex flex-column justify-content-center align-items-end align-items-lg-center p-0 m-0">
                                <div class="d-flex flex-column align-items-center">
                                  <div class="_pstr_">
                                    <transition name="fade">
                                      <img class="img-fluid film-poster" :src="$store.getters.films[$store.state.selected].poster == null || $store.getters.films[$store.state.selected].poster == '' ? 'http://cdn'+$store.getters.films[$store.state.selected].g_id.split('_')[0] + '.video.az/storage/' + (f.t === 2 ? 'tvseries' : 'movie') + '/' + $store.getters.films[$store.state.selected].g_id.split('_')[1] + '/cover.jpg' : '//upload.wikimedia.org/wikipedia/' + $store.getters.films[$store.state.selected].poster" v-on:load = "loaded = true" v-show = "loaded">

                                    </transition>
                                    
                                      <div class="d-flex _pstr_on_">
                                        <nuxt-link :to="'/player/' + $store.getters.films[$store.state.selected].id">
                                          <i v-on:click= "mfv = false, s = $store.getters.films[$store.state.selected].cat == '2', $store.getters.films[$store.state.selected].cat == '2' ? GetEpisodes($store.getters.films[$store.state.selected].season == '1' ? $store.getters.films[$store.state.selected].season : $store.getters.films[$store.state.selected].season - 1, GetFilmName($store.getters.films[$store.state.selected].name, 'name', lang), $store.getters.films[$store.state.selected]) : $store.dispatch('setFilmById', $store.getters.films[$store.state.selected]), $root.$emit('player', true)" class="_pstr_on_i fas fa-play"></i>
                                        </nuxt-link>
                                      </div>
                                    
                                  </div>
                                  
                                  <div class="l-list">
                                        <div v-if="!/\-\d+/.test($store.getters.films[$store.state.selected].country)" class="d-flex justify-content-center flex-wrap test"><i class="fas fa-globe-americas icn-pad text-white"></i>
                                          <p class="_g_l_item" v-for = "(country, i) in $store.getters.films[$store.state.selected].country.split(',')" :key="i"><template v-if="i != 0">, </template>
                                          <!-- <nuxt-link :to = "'/filter/' + JSON.stringify(f)"> -->
                                          <!-- <nuxt-link :to = "'/filter/'"> -->
                                            <span @click="$store.dispatch('filter', [country, 2])">{{$store.state.lang[$store.state.language].countries[country]}}</span>
                                          <!-- </nuxt-link> -->
                                          </p>
                                        </div>
                                  </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-7 offset-0 d-flex flex-column justify-content-between film-short-info">
                                <div class="flex-column m-2">
                                    <h4 class="f-sh-i-title" v-html = 'getTitle($store.getters.films[$store.state.selected])'></h4>
                                    <p class="f-sh-i-texts">{{$store.getters.films[$store.state.selected].p_year}}  | <i class="fab fa-imdb pr-1"></i>{{$store.getters.films[$store.state.selected].rating}}  
                                      <template v-if="!/\-\d+/.test($store.getters.films[$store.state.selected].genre)"> | 
                                        <span class="_g_l_item" v-for = "(genre, i) in $store.getters.films[$store.state.selected].genre.split(',')" :key="i">
                                          <template v-if="i != 0">, </template>
                                            <!-- <nuxt-link :to = "'/filter/' + genre + '-g'"> -->
                                            <!-- <nuxt-link :to = "'/filter/'"> -->
                                              <span @click="$store.dispatch('filter', [genre, 1])">{{$store.state.lang[$store.state.language].genres[genre]}}</span>
                                            <!-- </nuxt-link> -->
                                        </span>

                                        <span class="ml-2"><i v-if = "$store.getters.films[$store.state.selected].srt.length > 0" class="fas fa-closed-captioning" title="Subtitr mövcuddur"></i></span>
                                      </template>
                                    </p>

                                                  <div v-if = "$store.state.type === 1" class="d-flex justify-content-start flex-wrap test">
                                                    <p class="_g_l_item" v-for = "(dubbing, r) in GetDubbing($store.getters.films[$store.state.selected])" :key="r"><button class = 'btn btn-i-l act'>{{$store.state.lang[$store.state.language].langs[dubbing]}}</button></p>
                                                  </div>

                                                  <div v-else class="d-flex justify-content-start flex-wrap test">
                                                    <p class="_g_l_item" v-for = "(dubbing, r) in $store.getters.films[$store.state.selected].dubbing.split(',')" :key="r"><button @click = "btnAct = true, $root.$emit('filter', [dubbing, 2])" :class="btnAct == true ? 'btn btn-i-l act' : 'btn btn-i-l'">{{$store.state.lang[$store.state.language].langs[dubbing]}}</button></p>
                                                  </div>


                                    <p class="f-sh-i-texts" v-html = 'getContent($store.getters.films[$store.state.selected])'></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 d-none d-md-block film-cover" style="position: absolute; top: 0; min-width: 100%">
                <div class="cover">
                  <transition name = "fade" v-if = "$store.getters.films[$store.state.selected].g_id !== null || $store.getters.films[$store.state.selected].g_id !== undefined">
                    <img class="f-img img-fluid" :src="'http://cdn'+$store.getters.films[$store.state.selected].g_id.split('_')[0] + '.video.az/storage/' + ($store.getters.films[$store.state.selected].cat == 2 ? 'tvseries' : 'movie') + '/' + $store.getters.films[$store.state.selected].g_id.split('_')[1] + '/thumb.jpg'" v-on:load = "loadedC = true" v-show = "loadedC">
                  </transition>
                    <div class="sh"></div>
                </div>
            </div>
    </div>
    <div v-else-if="$store.state.searchLoading == false && $store.getters.films.length == 0" style="height: 50vh" class="d-flex justify-content-center align-items-center">
      <div class="alert alert-warning text-center">No result</div>
    </div>
</template>


<script>
import {functions} from '@/mixins.js'
import {mapActions, mapGetters} from 'vuex'
// import Series from '../components/Series.vue'

export default {
  name: 'Cover',
  mixins: [functions],
  data(){
    return{
      // film: this.$store.getters.films[this.$store.state.selected]
    }
  },

  methods:{
    getContent(t){
        const e = this.$store.getters.highlight(this.$store.getters.nameFilm(t, 2))
        return e;
    },

    getTitle(t){
        const e = this.$store.getters.highlight(this.$store.getters.nameFilm(t));
        return e;
    },
    base64(text){
        return btoa(text)
    },
  }
}
</script>

<style scoped>
  a, a:hover{
    text-decoration: none;
    color: white;
  }
</style>

<template>
    <div v-if="$store.getters.films.length > 0">
      <b-modal class = "mdl" scrollable no-close-on-backdrop size="md" id="modal-mfv" centered ref = "mdl_mfv" footerClass = "d-none" headerClass = "d-none" bodyClass = "mdl-mfv p-0 m-0" v-model="mobile">
            <b-container>
            <div style="position: relative; height: 16em">
                <router-link to = "/" style="position: absolute; right:1.1em; top: .45em; z-index: 30" ><p><i @click = "touch=false, $bvModal.hide('modal-mfv'),$root.$emit('close',false)" class="text-white fas fa-times icn-close"></i></p></router-link>
                <div class="m-cover" style="height: 100%; box-shadow: inset -125px -85px 100px -25px #000000, inset 125px -85px 150px -25px #000000;z-index: 15;"></div>
                <img class="f-img img-fluid" :src="'http://cdn'+$store.getters.films[$store.state.selected].g_id.split('_')[0] + '.video.az/storage/' + ($store.getters.films[$store.state.selected].cat == 2 ? 'tvseries' : 'movie') + '/' + $store.getters.films[$store.state.selected].g_id.split('_')[1] + '/thumb.jpg'">
                <div class="d-flex align-items-center justify-content" style="margin-top: -60%; position: relative;height: 100%; width: 100%; z-index: 20;">
                
                    <div class="d-flex _pstr_on_">
                        <nuxt-link :to="'/player/' + $store.getters.films[$store.state.selected].id">
                            <i v-on:click= "mfv = false, s = $store.getters.films[$store.state.selected].cat == '2', $store.getters.films[$store.state.selected].cat == '2' ? GetEpisodes($store.getters.films[$store.state.selected].season == '1' ? $store.getters.films[$store.state.selected].season : $store.getters.films[$store.state.selected].season - 1, GetFilmName($store.getters.films[$store.state.selected].name, 'name', lang), $store.getters.films[$store.state.selected]) : $store.dispatch('setFilmById', $store.getters.films[$store.state.selected]), $root.$emit('player', true)" class="_pstr_on_i fas fa-play"></i>
                          </nuxt-link>
                    </div>
                
                </div>
            </div>
                <div class="row c_po p-0 m-0">
                    <div class="col-12 col-lg-7 offset-lg-1" style="z-index: 30">
                        <div class="row rw-resp p-0 m-0 d-flex justify-content-center justify-content-sm-start">
                            <div class="col-12 col-sm-7 offset-0 d-flex flex-column justify-content-between film-short-info">
                                <div class="flex-column m-2">
                                    <h4 class="f-sh-i-title" v-html = 'getTitle($store.getters.films[$store.state.selected])'></h4>
                                    <p class="f-sh-i-texts">{{$store.getters.films[$store.state.selected].p_year}}  | <i class="fab fa-imdb pr-1"></i>{{$store.getters.films[$store.state.selected].rating}} 
                                        <template v-if="!/\-\d+/.test($store.getters.films[$store.state.selected].genre)"> | 
                                        <span class="_g_l_item" v-for = "(genre, i) in $store.getters.films[$store.state.selected].genre.split(',')" :key="i">
                                            <template v-if="i != 0">, </template>
                                            <!-- <nuxt-link :to = "'/filter/'"> -->
                                                <span @click="$store.dispatch('filter', [genre, 1])">{{$store.state.lang[$store.state.language].genres[genre]}}</span>
                                            <!-- </nuxt-link> -->
                                        </span>
                                        &nbsp;|&nbsp;
                                        <span v-if="!/\-\d+/.test($store.getters.films[$store.state.selected].country)"><i class="fas fa-globe-americas icn-pad text-white"></i>
                                            <span class="_g_l_item" v-for = "(country, i) in $store.getters.films[$store.state.selected].country.split(',')" :key="i"><template v-if="i != 0">, </template>
                                            <!-- <nuxt-link :to = "'/filter/' + JSON.stringify(f)"> -->
                                            <!-- <nuxt-link :to = "'/filter/'"> -->
                                              <span @click="$store.dispatch('filter', [country, 2])">{{$store.state.lang[$store.state.language].countries[country]}}</span>
                                            <!-- </nuxt-link> -->
                                            </span>
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
            </b-container>

        </b-modal>
        <!-- <Series v-if="s" :lang="lang" :lng="lng"></Series> -->

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
            mobile: false
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
    },
    mounted() {
        this.$bvModal.show("modal-mfv");
    },
}
</script>
    

  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .modal-content{
    background-color: red!important;
  }
  
  
  .modal-header {
    display: block;
  }
  
  .modal-footer {
    display: block;
  }
  
  
  
  
  .mdl-header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    display: flex;
    padding: 15px;
  }
  
  #modal-mfv{
    overflow-y: hidden!important;
  }
  
  a, a:hover{
    text-decoration: none;
    color: white;
  }
  
  .lbl_l{
    font-size: .9em;
  }
  </style>
  
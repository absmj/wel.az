 
<template>

  <div v-if="$store.getters.films.length > 0" style="position: relative;" class="d-flex flex-nowrap justify-content-around align-items-center">
    <div @mouseover = "lScr = 1" @mouseleave = "lScr = 0" class="d-none d-md-block o-ctrl-btn">
      <i class="fas fa-angle-left" @click = "swipeLeft"></i>
    </div> 

    <div class="tab-pane active d-flex flex-row p-0 m-0 justify-content-center justify-content-md-start flex-wrap flex-md-nowrap tb-cnt" role="tabpanel" ref="scrl">

      <div class="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-md-start">
            <div class="position-relative film-item" v-for="(flm, k) in $store.getters.films" :key = "k">                            
              <div class="film-poster-in-the-list mr-2 p-1" @mouseenter = "$store.dispatch('select', k)">
                <img class="img-fluid film-poster" :src="(flm.poster == null || flm.poster == '') ? `http://cdn${flm.g_id.split('_')[0]}.video.az/storage/${($store.state.type === 2 ? 'tvseries' : 'movie')}/${flm.g_id.split('_')[1]}/cover.jpg` : `//upload.wikimedia.org/wikipedia/${flm.poster}`"/>
              </div>
                <div class="d-flex justify-content-center align-items-center f-p-shadow">
                  <i class="fas fa-ellipsis-v more-o-f"></i>
                  <div class="d-flex flex-column justify-content-center align-items-center f-p-s-info" style="z-index: 30">
                    <p class="d-none d-md-block f-s-i-text text-center">{{$store.getters.nameFilm(flm)}}</p>
                  </div>
                </div>
                                              
                
            </div>

        <!-- <MFV v-if="mfv==true" :film="films[z]" :lng="lng" :search="search" :lang="lang" @close="mobileclose"></MFV> -->

      </div>
    </div>

    <div v-if = "$store.getters.films.length > 6" class="d-none d-md-block o-ctrl-btn" @click = "swipeRight">
      <i :class="(load == true) ? 'fas fa-spinner __l_api' : 'fas fa-angle-right'"></i>
    </div>

  </div>
</template>


<script>
import {functions} from '@/mixins.js'
import {mapActions, mapGetters} from 'vuex'

export default {
  data(){
    return{
      load: false
    }
  },
  mixins: [functions],
  computed: {
      ...mapGetters({
          films: 'films'
        },
      )
  },
  watch:{
      films(){
          if(this.films.length < 20 && !this.$store.state.server) this.$store.dispatch('getFilms');    
      },
      deep: true
  },


  methods:{
    swipeLeft() {
        const content = this.$refs.scrl;

        this.lScr = content.scrollLeft;
        this.scrollTo(content, -600, 1000, 1);
        // setTimeout(() => this.lScr = 0, 2000);
      },

      swipeRight() {
        const content = this.$refs.scrl;
        this.lScr = content.scrollLeft;
        this.scrollTo(content, 500, 1000, 1);
      },

      scrollTo(element, scrollPixels, duration, t) {
        
        let scrl=null, bl=false;
        const scrollPos = t == 1 ? element.scrollLeft : element.scrollTop;
        let el = t == 1 ? element.scrollLeft : element.scrollTop;
        let el_ = t == 1 ? element.clientWidth : element.clientHeight;
        let el__ = t == 1 ? element.scrollWidth : element.scrollHeight;
        // alert(scrollPos);
        // Condition to check if scrolling is required
        if ( !( (el === 0 || scrollPixels > 0) && (el_ + scrollPos === el__ || scrollPixels < 0))) 
        {
          // Get the start timestamp
          const startTime =
            "now" in window.performance
              ? performance.now()
              : new Date().getTime();
          
          scrl = function scroll(timestamp) {
            //Calculate the timeelapsed
            const timeElapsed = timestamp - startTime;
            //Calculate progress 
            const progress = Math.min(timeElapsed / duration, 1);
            //Set the scrolleft
            element.scrollLeft = scrollPos + scrollPixels * progress;
            //Check if elapsed time is less then duration then call the requestAnimation, otherwise exit
            if (timeElapsed < duration) {
              //Request for animation
              window.requestAnimationFrame(scrl);
            } else {
              return;
            }
          }

          if((el_+ el > el__ - (t==1?800:150)) && !this.load && !bl)
          {
              this.$store.dispatch("getFilms", [this.$store.state.films.length + 20, 20]);
          }


          this.lScr = 1;
            //Call requestAnimationFrame on scroll function first time
            window.requestAnimationFrame(scrl);
        }
        else{
          this.lScr = 0;
        }

      },
   }
    
}

</script>

<style scoped>


</style>
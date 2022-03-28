<template>
     <b-modal class = "mdl" scrollable no-close-on-backdrop size="lg" id="modal-filter" centered ref = "mdl_f" v-model="fmdl">

          <template v-slot:modal-title>
            <div class="d-flex flex-column justify-content-center">
                <div class="d-flex align-items-center">
                  <i class="material-icons mr-2">filter_list</i>
                  <h4 class="modal-title">{{lang[$store.state.language].filtering}}</h4>
                </div>
            </div>
          </template>

        <b-container>
          <pre>{{f.c}}</pre>
          <pre>{{f.g}}</pre>
          <pre>{{f.d}}</pre>
          <pre>{{f.r}}</pre>
            <div role="tablist" v-if="lang !== null">

              <!-- Janr -->
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-2 c_po" role="tab">
                  <div v-b-toggle.accordion-1 variant="info" class = "d-flex">
                    <div class="p-1 icn-acc"><i class="fa fa-tags"></i></div>
                    <div class="acc-header"><a>{{lang[$store.state.language].genre}}</a>
                        <!-- <p>{{genres}}</p> -->
                        <p>{{genres.length > 0 ? getCastData(genres, 0).join(", ") : lang[$store.state.language].nonS}}</p>
                        <p class="text-danger" v-if = "message != false && genres.length > 4">{{message}}</p>
                    </div>
                    <div class="acc-cntrl mr-1"><i class="fas fa-angle-down anim open"></i></div>
                  </div>
                </b-card-header>
                <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                  <b-card-body class="row p-0 m-0 pl-5 pr-5 pt-2 pb-2 d-flex justify-content-between">
                    <div class="po_r pb-3"><input type="text" v-model = "searchGenre" class="text-input" placeholder="Siyahıdan axtarış"/><i class="fa fa-search icon input-status"></i></div>
                    <div class="d-block">
                      <!-- {{genres}} -->
                      <div v-for = "(genre, i) in genre_lng" :key = "i">
                        <template v-if = "i < 7">
                          <input v-on:click = "genres.filter(el => {return el == $event.target.value}).length == 0 ? genres.push($event.target.value) : genres.splice(genres.indexOf($event.target.value), 1)" type="checkbox" :id= "'g' + lang[$store.state.language].genres.indexOf(genre)" :value="lang[$store.state.language].genres.indexOf(genre)" :disabled = "genres.length > 4 ? (genres.filter(el=> { return el == lang[$store.state.language].genres.indexOf(genre) }).length == 0 ? true : false) : false" :checked="genres.filter(el => { return el == lang[$store.state.language].genres.indexOf(genre) }).length != 0">
                          <label class="lbl_l" :for = "'g' + lang[$store.state.language].genres.indexOf(genre)">{{genre}}</label>

                        </template>
                      </div>
                    </div>

                    <div class = "d-block">
                      <div v-for = "(genre, i) in genre_lng" :key = "i">
                        <template v-if = "i > 7 && i < 15"><input v-on:click = "genres.filter(el => {return el == $event.target.value}).length == 0 ? genres.push($event.target.value) : genres.splice(genres.indexOf($event.target.value), 1)" type="checkbox" :id= "'g' + lang[$store.state.language].genres.indexOf(genre)" :value="lang[$store.state.language].genres.indexOf(genre)" :disabled = "genres.length > 4 ? (genres.filter(el=> { return el == lang[$store.state.language].genres.indexOf(genre) }).length == 0) : false" :checked="genres.filter(el => { return el == lang[$store.state.language].genres.indexOf(genre) }).length != 0 ? true : false">
                          <label class="lbl_l" :for = "'g' + lang[$store.state.language].genres.indexOf(genre)">{{genre}}</label></template>
                      </div> 
                    </div>

                    <div class = "d-block">
                      <div v-for = "(genre, i) in genre_lng" :key = "i">
                        <template v-if = "i >= 15"><input v-on:click = "genres.filter(el => {return el == $event.target.value}).length == 0 ? genres.push($event.target.value) : genres.splice(genres.indexOf($event.target.value), 1)" type="checkbox" :id= "'g' + lang[$store.state.language].genres.indexOf(genre)" :value="lang[$store.state.language].genres.indexOf(genre)" :disabled = "genres.length > 4 ? (genres.filter(el=> { return el == lang[$store.state.language].genres.indexOf(genre) }).length == 0) : false" :checked="genres.filter(el => { return el == lang[$store.state.language].genres.indexOf(genre) }).length != 0 ? true : false">
                          <label class="lbl_l" :for = "'g' + lang[$store.state.language].genres.indexOf(genre)">{{genre}}</label></template>
                      </div> 
                    </div>  
                                     
                  </b-card-body>
                </b-collapse>
              </b-card>

              <!-- Ölkə -->
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-2 c_po" role="tab">
                  <div v-b-toggle.accordion-2 variant="info" class = "d-flex">
                    <div class="p-1 icn-acc"><i class="fa fa-tags"></i></div>
                    <div class="acc-header"><a>{{lang[$store.state.language].country}}</a>
                        <!-- <p>{{countries}}</p> -->
                        <p>{{countries.length > 0 ? getCastData(countries, 1).join(", ") : lang[$store.state.language].nonS}}</p>
                        <p class="text-danger" v-if = "message != false && countries.length > 4">{{message}}</p>
                    </div>
                    <div class="acc-cntrl mr-1"><i class="fas fa-angle-down anim open"></i></div>
                  </div>
                </b-card-header>
                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                  <b-card-body class="row p-0 m-0 pl-5 pr-5 pt-2 pb-2 d-flex justify-content-between">
                    <div class="po_r pb-3"><input type="text" v-model = "searchCountry" class="text-input" placeholder="Siyahıdan axtarış"/><i class="fa fa-search icon input-status"></i></div>
                    <div class="d-block">
                      <!-- {{countries}} -->
                      <div v-for = "(country, i) in country_lng" :key = "i">
                        <template v-if = "i <= 15">
                          <input v-on:click = "countries.filter(el => {return el == $event.target.value}).length == 0 ? countries.push($event.target.value) : countries.splice(countries.indexOf($event.target.value), 1)" type="checkbox" :id= "'c' + lang[$store.state.language].countries.indexOf(country)" :value="lang[$store.state.language].countries.indexOf(country)" :disabled = "countries.length > 4 ? (countries.filter(el=> { return el == lang[$store.state.language].countries.indexOf(country) }).length == 0) : false" :checked="countries.filter(el => { return el == lang[$store.state.language].countries.indexOf(country) }).length != 0">
                          <label class="lbl_l" :for = "'c' + lang[$store.state.language].countries.indexOf(country)">{{country}}</label>

                        </template>
                      </div>
                    </div>

                    <div class = "d-block">
                      <div v-for = "(country, i) in country_lng" :key = "i">
                        <template v-if = "i > 15 && i <= 30"><input v-on:click = "countries.filter(el => {return el == $event.target.value}).length == 0 ? countries.push($event.target.value) : countries.splice(countries.indexOf($event.target.value), 1)" type="checkbox" :id= "'c' + lang[$store.state.language].countries.indexOf(country)" :value="lang[$store.state.language].countries.indexOf(country)" :disabled = "countries.length > 4 ? (countries.filter(el=> { return el == lang[$store.state.language].countries.indexOf(country) }).length == 0) : false" :checked="countries.filter(el => { return el == lang[$store.state.language].countries.indexOf(country) }).length != 0 ? true : false">
                          <label class="lbl_l" :for = "'c' + lang[$store.state.language].countries.indexOf(country)">{{country}}</label></template>
                      </div> 
                    </div>

                    <div class = "d-block">
                      <div v-for = "(country, i) in country_lng" :key = "i">
                        <template v-if = "i > 30"><input v-on:click = "countries.filter(el => {return el == $event.target.value}).length == 0 ? countries.push($event.target.value) : countries.splice(countries.indexOf($event.target.value), 1)" type="checkbox" :id= "'c' + lang[$store.state.language].countries.indexOf(country)" :value="lang[$store.state.language].countries.indexOf(country)" :disabled = "countries.length > 4 ? (countries.filter(el=> { return el == lang[$store.state.language].countries.indexOf(country) }).length == 0) : false" :checked="countries.filter(el => { return el == lang[$store.state.language].countries.indexOf(country) }).length != 0 ? true : false">
                          <label class="lbl_l" :for = "'c' + lang[$store.state.language].countries.indexOf(country)">{{country}}</label></template>
                      </div> 
                    </div>                        
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-2 c_po" role="tab">
                  <div v-b-toggle.accordion-4 variant="info" class = "d-flex">
                    <div class="p-1 icn-acc"><i class="fa fa-microphone-alt"></i></div>
                    <div class="acc-header"><a>{{lang[$store.state.language].dubbing}}</a>
                        <p>{{dubbing.length > 0 ? getCastData(dubbing, 3).join(", ") : lang[$store.state.language].nonS}}</p>
                        <p class="text-danger" v-if = "message != false && dubbing.length > 4">{{message}}</p>
                    </div>
                    <div class="acc-cntrl mr-1"><i class="fas fa-angle-down anim open"></i></div>
                  </div>
                </b-card-header>

                <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
                  <b-card-body class="row p-0 m-0 pl-5 pr-5 pt-2 pb-2 d-flex justify-content-between">
                    
                    <div class="d-block pl-2">
                      <div v-for = "(dub, i) in lang[$store.state.language].langs" :key = "i">
                        <input v-model.number = "dubbing" type="checkbox" :id= "'d' + i" :value="i" :disabled = "dubbing.length > 4 ? (dubbing.filter(el=> { return el == i }).length == 0) : i == 1"><label class="lbl_l" :for = "'d' + i">{{dub}}</label>
                      </div>
                    </div>

                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-2 d-flex c_d" role="tab">
                  
                  <div class="p-1 icn-acc"><i class="fab fa-imdb"></i></div>
                    <div class="acc-header"><a href="#">{{lang[$store.state.language].rating}}</a>
                       <p>{{(r !== null) ? r + '+' : lang[$store.state.language].nonS}}</p>
                    </div>

                    <div class="acc-cntrl flex-column p-0">
                        <i class="fas fa-angle-up c_po" @click = "r = r < 9 ? r + 1 : r, f.r = r"></i>
                        <p class="text-black-50 p-0 mr-2">{{r}}+</p>
                        <i class="fas fa-angle-down c_po" @click = "r = r > 4 ? r - 1 : r, f.r = r"></i>
                    </div>

                </b-card-header>
              </b-card>
            </div>
        </b-container>

        <template v-slot:modal-footer>
          <button class = "btn btn-primary ml-2 p-2" @click = "genres = [], dubbing =[], countries = [], f.r = null, f.y = [], r=4, year=2000">{{lang[$store.state.language].reset}}</button>
              <nuxt-link :to="encodeURL('/filter' + (genres.length > 0 ?  ('/' + genres.join(',') + 'g/') : '') + 
                    (countries.length > 0 ?  ('/' + countries.join(',') + 'c/') : '') + 
                    (dubbing.length > 0 ?  ('/' + ('/' + dubbing.join(',') + '/') + 'd/') : ''))">
                    <button class = "btn btn-primary ml-2 p-2" @click = "$store.dispatch('filtering', f), $bvModal.hide('modal-filter')">{{lang[$store.state.language].filtering}}</button>
          </nuxt-link>
  
        </template>

      </b-modal>

</template>


<script>
import {functions} from "@/mixins.js"

export default {


  mixins: [functions],
  name: 'Filters',
  data(){
    return{
            countries: [],
            genres: [],
            dubbing: [],
            searchGenre: null,
            searchCountry: null,
            year: 1995,
            year_: 2021,
            fmdl: false,
            r: 5,
            r_: 9,
            link: ''
          }
    },

    methods:{
        getCastData(cast, type)
        {
          let data = [];

          cast.forEach((v) =>( data.push(type == 1 ? this.lang[this.$store.state.language].countries[v] : (type == 0 ? this.lang[this.$store.state.language].genres[v] : this.lang[this.$store.state.language].langs[v]) )));
          return data;
        },

        encodeURL(url)
        {
          return (url !== null || url !== '' || url !== undefined) ? encodeURI(url.replace(/\s+/gmi, "_")) : '';
        }

    },

    computed:{
      genre_lng(){
        if(this.searchGenre !== null)
        {
          let se = this.searchGenre.replace(/(\[|\]|\{|\}|\.|\?|\||&|\^|\$|\(|\))/gmi, "\\" + "$1");
          return this.lang[this.$store.state.language].genres.filter(el => {let r = new RegExp("^" + se + ".*", "gmi"); return r.test(el)});
        }
        else
          return this.lang[this.$store.state.language].genres;
      },

      country_lng(){
        if(this.searchCountry !== null)
          return this.lang[this.$store.state.language].countries.filter(el => {let r = new RegExp("^" + this.searchCountry + ".*", "gmi"); return r.test(el)});
        else
          return this.lang[this.$store.state.language].countries;
      },

      message(){
        if(this.genres.length > 4 || this.countries.length > 4 || this.dubbing.length > 4)
        {
          if(this.genres.filter((e) =>{return e === ''}).length == 0 || this.countries.filter((e) =>{return e === ''}).length == 0 || this.dubbing.filter((e) =>{return e === ''}).length == 0)
            return this.lang[this.$store.state.language].messages[0];
          else
            return false;
        }
        else
          return false
      }
    },

    watch:{
      fmdl: function(){
        if(!this.fmdl) this.$root.$emit("closeFilter", true)
      },

      countries: function(){
        this.link = this.countries.length > 0 ?  ('/' + this.lang[this.$store.state.language].country + '/' + this.countries.map((v) => this.lang[this.$store.state.language].countries[v])) : ''
        this.f.c = this.countries.map((v)=>{return Number(v) + 1})
      },

      genres: function(){
        this.link = this.genres.length > 0 ?  ('/' + this.lang[this.$store.state.language].genre + '/' + this.genres.map((v) => this.lang[this.$store.state.language].genres[v])) : ''
        this.f.g = this.genres.map((v)=>{return Number(v) + 1})
      },

      dubbing: function(){
        this.link = this.dubbing.length > 0 ?  ('/' + this.lang[this.$store.state.language].dubbing + '/' + this.dubbing.map((v) => this.lang[this.$store.state.language].langs[v])) : ''
        this.f.d = this.dubbing
      },

      year: function(){
        this.f.y[0] = this.year
      },

      year_: function(){
        this.f.y[1] = this.year_
      },

      r: function(){
        this.f.r = this.r
      }
      
    },

    async mounted(){
      this.countries = this.f.c.map(v=>{return Number(v) - 1})
      this.genres = this.f.g.map(v=>{return Number(v) - 25})
      this.dubbing = this.f.d
      console.log(this.lang[this.$store.state.language].genre)
      if(this.lang!==null && this.lang!==undefined) await this.$bvModal.show('modal-filter');
    },

    async created(){
      await this.$store.dispatch("getFilms")
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.modal-header {
  display: block;
}

.modal-footer {
  display: block;
}

.acc{
  display: flex;
  width: 100%;
  background-color: white;
  border: 1.2px solid rgba(255, 255, 255, .5);
  box-shadow: 2px 2px 2px black;
  color: black;
}
.acc > .btn
{
  width: 90%;
  padding: 8px;
  text-shadow: 1px 1px 2px;
  /*font-size: 1.15em;*/
  background-color: white;
  text-align: left;
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

.acc > div
{
  width: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.lbl_l{
  font-size: .9em;
}
</style>

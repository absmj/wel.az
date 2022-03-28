<template>
    <Player v-if="film !== null" :film = "film" :type = "'1'" />
</template>

<script>
import {Player} from '@/components/Player.vue'
import {mapActions, mapGetters} from 'vuex'


export default ({
    // validate({params}){
    //     return /d/.test(params.id)
    // },
    data(){
        return{
            film: null,
        }
    },

    async asyncData({ params, store }){
        let id = params.id;

        if(store.state.films.length == 0){
            
            await store.dispatch("getFilm", id)
            await store.dispatch("getFilms")
            film = store.state.film;
        }
        else
            film = store.state.films.filter(v=>v.id==id)[0]
        
        document.getElementsByTagName('title')[0].innerHTML = `${$store.getters.nameFilm(film, 1, true)} - (${store.state.type == 1 ? store.state.lang[store.state.language].film : store.state.lang[store.state.language].series_}, ${this.film.p_year}) -  ${this.slogan}`;
        document.querySelector('head meta[name="description"]').setAttribute("content", store.getters.nameFilm(store.state.film, 2, true));
    // "film", "src", "lng_", "lng", "sub", "dubb", "type"
        return {film}
    }
})
</script>

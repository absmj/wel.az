<template>
    
    <Player v-if="film != undefined" :film = "film" :type = "'1'" />
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
            film: undefined,
        }
    },

    async asyncData({ params, store }){
        let id = params.id, film;
        console.log(film);
        if(store.state.films.length == 0){
            console.log(id)
            await store.dispatch("getFilm", id)
            await store.dispatch("getFilms")
            film = await store.state.film;
        }
        else
            film = await store.state.films.filter(v=>v.id==id)[0]

    // "film", "src", "lng_", "lng", "sub", "dubb", "type"
        return {film}
    }
})
</script>

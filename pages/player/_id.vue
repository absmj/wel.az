<template>
    <Player type="1" :film = "film"/>
</template>

<script>
import Player from '@/components/Player.vue'
import {mapActions, mapGetters} from 'vuex'


export default ({
    components: {
        Player
    },

    async asyncData({ params, store }){
        let id = params.id, film;
        if(store.state.films.length == 0){
            await store.dispatch("getFilm", id)
            film = await store.state.film;
        }
        else
            film = await store.state.films.filter(v=>v.id==id)[0]

    // "film", "src", "lng_", "lng", "sub", "dubb", "type"
        return {film}
    },

    async created(){
        await this.$store.dispatch("getFilms")
    }
})
</script>

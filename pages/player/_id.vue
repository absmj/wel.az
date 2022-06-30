<template>
    <Player v-if="$store.state.film != null" type="1" :film = "film"/>
</template>

<script>
import Player from '@/components/Player.vue'
import {mapActions, mapGetters} from 'vuex'


export default ({
    data(){
        return{
            // ready: false
        }
    },

    head () {
        return {
          title: this.$store.getters.nameFilm(this.film, 1) + ' - wel! - watch!, enjoy!, learn!',
          meta: [
            {
                hid: 'description',
                name: 'description',
                content: this.$store.getters.nameFilm(this.film, 2)
            }
          ]
        }
    },
    components: {
        Player
    },

    computed:{
        ready(){
            return this.film != undefined || this.film != null
        }
    },

    async asyncData({ params, store }){
        let id = params.id, film;
        if(store.state.films.length == 0){
            await store.dispatch("getFilm", id)
            await store.dispatch("getFilms")
            film = await store.state.film;

        }
        else
            film = await store.state.films.filter(v=>v.id==id)[0]

    // "film", "src", "lng_", "lng", "sub", "dubb", "type"
        return {film}
    },

    async created(){
        
    }
})
</script>

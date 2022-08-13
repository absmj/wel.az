<template>
    <Player v-if="$store.state.film != null" type="1"/>
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
          title: this.$store.getters.nameFilm(this.$store.state.film, 1) + ' - wel! - watch!, enjoy!, learn!',
          meta: [
            {
                hid: 'description',
                name: 'description',
                content: this.$store.getters.nameFilm(this.$store.state.film, 2)
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
        let id = params.id;
        if(!store.state.film){
            await store.dispatch("getFilm", id)
            await store.dispatch("getFilms")
        }
    },

    created(){
        
    }
})
</script>

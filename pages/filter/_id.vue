<template>

</template>

<script>
import {mapActions} from 'vuex'

export default {
    // head () {
    //     let filter = JSON.parse(this.f_);
    //     return {
    //       title: `${filter.g.map(v => this.$store.state.lang[this.$store.state.language].genres[v]).join(',')}`,
    //       meta: [
    //         {
    //             hid: 'description',
    //             name: 'description',
    //             // content: this.$store.getters.nameFilm(this.film, 2)
    //         }
    //       ]
    //     }
    // },

    async asyncData({ params, store , filter}){
        let f_ = Buffer.from(params.id, 'base64').toString();


        if( /(["'][gcdy]["']\:\[(\d+[,\d+]*)*\])*,(["'][rt]["']\:[\d+]*)*/gmi.test(f_)){
            await store.dispatch('filtering', JSON.parse(f_))

            store.dispatch('firstAsk', null)


            
        }
        return {f_}

    },

    async created(){
        await this.$store.dispatch("getFilms")
    }
    
}
</script>

<style>

</style>
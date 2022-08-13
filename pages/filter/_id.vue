<template>

</template>

<script>
import {mapActions} from 'vuex'

String.prototype._s = function(text){
    return text && this.replace("%s", text)
}

export default {
    head () {
        const filter = JSON.parse(this.f_);
        const genres = filter.g.map(v => this.$store.state.lang[this.$store.state.language].genres[v]).join(', ');
        const countries = filter.c.map(v => this.$store.state.lang[this.$store.state.language].countries[v]).join(', ');

        return {
          title: `${[this.$store.state.lang[this.$store.state.language].genresAs._s(genres), this.$store.state.lang[this.$store.state.language].countryAs._s(countries)].join(' və ')}`,
          meta: [
            {
                hid: 'description',
                name: 'description',
                // content: this.$store.getters.nameFilm(this.film, 2)
            }
          ]
        }
    },

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
        // window.location.reload();
    }
    
}
</script>

<style>

</style>
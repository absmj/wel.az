  import {lang} from '/lang.js'
  const qs = require("qs")
  const host = '';

  export const state = () => ({
    component: null,
    films: [],
    film: {},
    lang: lang,
    series: [],
    type: 1,
    filter: {g:[], c:[], d:[], y:[], r:''},
    language: 'az',
    dubbing: '',
    selected: 0,
    server: false,
    query: '',
    askAgain: false,
    firstAsk: null,
    result: 0
  })
  
  export const actions = {
    async getFilms({commit, state}, data = [1, 20]){

      const films = state.query.length > 0 ?
                        await this.$axios.$post(`${host}/search.php`, qs.stringify({s: state.query, m: data[0], mx: data[1], type: 1})) :
                        await this.$axios.$post(`${host}/index.php`, qs.stringify({...state.filter, p:data[0], m: data[1], type: 1, s: 1}))
      commit('setServer', true)
      commit('setFirstAsk', state.firstAsk !== null)
      commit('resultCount', films.length)
      console.log(films)
      films.length > 0 && commit('setFilms', films)
    },


    async getFilm({commit}, id){
      const film = await this.$axios.$get(`${host}/films.php?id=${id}`);
      console.log(film)
      commit('setFilm', film[0]);
    },

    setFilmByAsync({commit}, data){
      commit('setFilms', data)
    },

    search({commit}, data){
      commit('setServer', false)
      commit('setQuery', data)
    },

    select({commit}, id){
      commit('setSelected', id)  
    },

    changeLang({commit}, data){
      commit('setLanguage', data)
    },

    filter({commit}, data){
      commit('setServer', false)
      switch(data[1]){
        case 1:
          commit('setFilterGenre', [data[0]]);
          break;

        case 2:
          commit('setFilterCountry', [data[0]]);
          break;

        case 3:
          commit('setFilterYear', [data[0]]);
          break;

        case 4:
          commit('setFilterRating', [data[0]]);
          break;
      }
    },

    filtering({commit}, data){
        commit('setServer', false)
        commit('setFilter', data)
    },

    resetFilter({commit}){
        commit('resFilter')
    }
  }

  export const mutations = {

    setServer(state, data){
        state.server = data
    },

    resultCount(state, data){
      state.result = data
    },

    setFirstAsk(state, data){
      state.firstAsk = data
    },

    setComponent(state, data){
      state.component = data
    },

    setFilms(state, data){
      state.films = state.films.concat(data)
    },

    setFilm(state, data){
      state.film = data
    },

    resFilter(state){
      state.filter = [];
    },

    setFilter(state, data){
      state.filter = data
    },

    setFilterGenre(state, data) {
      state.filter.g = data
    },

    setFilterCountry(state, data) {
      state.filter.c = data
    },

    setFilterYear(state, data) {
      state.filter.y = data
    },

    setFilterRating(state, data) {
      state.filter.r = data
    },

    setLanguage(state, data){
      state.language = data
    },

    setQuery(state, data){
      state.query = data
    },

    setSelected(state, data){
      state.selected = data
    }
  }

  export const getters = {
      countData(state){
        return state.films.length
      },

      films(state, commit){
        if(Object.values(state.filter).filter(v=>v.length > 0).length > 0 && !state.server){
            let genre = new RegExp('(\\b' + state.filter.g.join('|') + '\\b)', 'gmi'),
            country = new RegExp('(\\b' + state.filter.c.join('|') + '\\b)', 'gmi'),
            dubbing = new RegExp('(\\b' + state.filter.d.join('|') + '\\b)', 'gmi'),
            year = new RegExp('(\\b' + state.filter.y.join('|') + '\\b)', 'gmi')

            return state.films.filter(v => { return genre.test(v.genre) && country.test(v.country) })
        }

        if(state.query.length > 0 && state.result > 0){
            const search = new RegExp(`${state.query.replace(/([\[\]\(\)\'\\\\/\.\?\*\^\$\~])/gm, '\\$1')}`, 'gmi');

            return state.films.filter(v => { return (search.test([...Object.values(v.name),...Object.values(v.w_title),...Object.values(v.w_content)])) })
        }

        return state.films;

      },

      highlight: state =>  (text = '') => {
        let query = state.query.replace(/(\[|\]|\{|\}|\.|\?|\||&|\^|\$|\(|\))/gmi, "\\\\" + "$1"),
            r = new RegExp('(^' + query + '|'+query+')', "gmi");
        console.log(text);
        if(r.test(text))
          return text.toString().replace(r, '<span style="background-color:yellow; color:red">$1</span>') || '';
        else
          return text;
      },

      nameFilm: (state) => (id, type = 1, onlyFilm = false) => {

        let t, l = state.language, 
            arr = !onlyFilm ? (type == 1 ? id.name : id.w_content):
                              (type == 1 ? id.name : type == 3 ? id.v_id : id.w_content) ;

        if(state.films.length > 0 || Object.keys(state.film).length > 0)
        {

          if(l== 'az')
          {
            t = arr.az == '' ? arr.tr : arr.az;
            t = (t == undefined || t == '') ? arr.ru : t;
            t = (t == undefined || t == '') ? arr.en : t;
            t = (t == undefined || t == '') ? arr.org : t;
          }

          else if(l == 'ru')
          {
            t = arr.ru == '' ? arr.en : arr.ru;
            t = (t == undefined || t == '') ? arr.org : t;
            t = (t == undefined || t == '') ? arr.az : t;
            t = (t == undefined || t == '') ? arr.tr : t;
          }
                      
          else if(l == 'tr')
          {
            t = arr.tr == '' ? arr.en : arr.tr;
            t = (t == '' || t == undefined) ? arr.az : t;
            t = (t == '' || t == undefined) ? arr.org : t;
            t = (t == '' || t == undefined) ? arr.ru : t;
          }

          else if(l == 'en')
          {
            t = arr.en == '' ? arr.org : arr.en;
            t = (t == '' || t == undefined) ? arr.ru : t;
            t = (t == '' || t == undefined) ? arr.az : t;
            t = (t == '' || t == undefined) ? arr.tr : t;
          }
          
      }
      

      return t;

    }
  }
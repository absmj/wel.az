import {lang} from '@/lang.js'
export const functions = {
    mixins: [lang],
    data(){
        return{
            slogan: 'wel! - watch!, enjoy!, learn!',
            btnAct: false,
            dubb: null,
            loaded:false,
            loadedC: false,
            search: '',
            screen: null,
            timer: null,
            lang: null,
            t: 1,
            f:{g:[],c:[],d:[],y:[],r:'', t: 1},
        }
    },

    mounted(){
      this.screen = window.screen.width;
      this.lang = lang
    },

    methods: {

      

        encodeURL(url)
        {
          return (url !== null || url !== '' || url !== undefined) ? encodeURI(url.replace(/\s+/gmi, "_")) : '';
        },

        GetDubbing(a)
          {
            let dubbing = [];

            if(a.v_id.az != '')
              dubbing.push(0);

            if(a.v_id.tr != '')
              dubbing.push(3);

            if(a.v_id.ru != '')
              dubbing.push(2);

            if(a.v_id.en != '')
              dubbing.push(1);

            return dubbing;
          },

        GetList(a)
          {
            let list = [],
                lists = a.length > 2 ? a.split(",") : [a];
            
            lists.forEach(value => list.push(value));
            return lists;
          },

        GetFilm(ar, type, lng, code, i, s, epi, srt, name){

               
            srt = srt || null;
            name = name || null;
            i = null || i;
            let season = s || null,
                episode = epi || null,
                e = this.GetFilmName(ar.v_id, "dubbing", code).split("_"),
                src = "http://cdn"+e[0]+".video.az/storage/" + (type == 2 ? "episode/" : "movie/") + e[1]+"video.mp4";

            
          
            document.getElementsByName('title').textContent = 
                (type ===  1 ? this.GetFilmName(ar.name, "name", code) : name) + 
                (type == 2 ? (' - '+this.GetFilmName(ar.w_title, 'name', code)||' - ') + ' ' : '') +
                (type == 2 ? season  + 'SE' + (i == 0 ? episode : i + 1) + 'EP ' + '(' + lng.series + ')' : ' (' + lng.film + ', '+ar.p_year+')') + ' | ' + this.slogan;

            // document.getElementsByName('meta').desc.setAttribute('content', this.GetFilmName(ar.w_content, "info", code) + ' | wel! - watch, enjoy, learn');
            this.$root.$emit("plyr_visible", true);
            this.$root.$emit("fdata", [ar, src, code, type, this.dubb, (srt !== null ? 1 : null), lng]);

          },
// 
          GetFilmName(arr, d, l)
          {
            let t;

            if(arr !== undefined)
            {


                    if(l == 'az')
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
                    
                    if(d === "dubbing") 
                        this.dubb = t == arr.az ? 0 : t == arr.en ? 1 : t == arr.ru ? 2 : t == arr.tr ? 3 : null;

                    // alert(t)
                    return t;

            }

          },

        toggleB(i)
          {
            return i == 1;
          },

        onLoaded() {
          this.loaded = true;
        },


        Hightlight(query, text)
          {
            query = query.replace(/(\[|\]|\{|\}|\.|\?|\||&|\^|\$|\(|\))/gmi, "\\\\" + "$1");
            let r = new RegExp('(^' + query + '|'+query+')', "gmi");
            if(r.test(text))
              return text.replace(r, '<strong>$1</strong>');
            else
              return text;

          },

          
        GetEpisodes(s, n, f){
            this.load = true;
            axios.post(config.url + 'series.php',  qs.stringify({s: s, i: f.id})).
                      then(response => { 
                                            this.$root.$emit("series", [n, response.data, f]); 
                                            this.load = false; 
                                        }, 
                            error =>   { this.load = false; return Promise.reject(error); });
          },


        async Search(s, min, max, t)
          {
            // this.load = false;
            this.messageClose = false;
            this.cb = false;
            if(this.timer)
            {
              // clearInterval(this.timer);
              this.timer = null;
            }

            this.timer = setTimeout(() => {

            axios.post(config.url + 'search.php', qs.stringify({s: s, m: min, mx: max, type: t})).then((response) => {if(response.data.length === 0) this.more = false; else this.searchingR = response.data; this.cb = true; this.errors = this.searchingR.length > 0 ? null : "Tapılmadı"; }, (error) =>{this.cb = true; this.errors = "İnternet əlaqəsi mövcud deyil"; this.load = false;  return Promise.reject(error) });

              // alert(this.searchingR + this.cb);

          }, 800);
        },


        async GetFilms(g, c, d, y, r, p, m, type, log, s){
            this.load = true;

            await axios_.post(config_.url + 'index.php', qs.stringify({g: g.join(","), c: c.join(","), y: y.join(","), d: d.join(","), r: r, p: p, m: m, type:type, 'log':log, s:s})).then(

              response => 
              { 
                if(response.data.length === 0) 
                  {
                    this.more = false;
                    this.$root.$emit("error", "Tapılmadı");  
                  }
                else 
                  {
    
                    this.load = false; 
                    this.$root.$emit("error", false);
                    this.$root.$emit("films", [type == this.f.t, response.data]);
                  }
              }, 

              error => 
              {
                this.$root.$emit("error", true);
                this.load = false;
                return Promise.reject(error)
              }
              
            );

            this.f.t = type



        },

    }
}


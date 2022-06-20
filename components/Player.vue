<template>
    <div id = "vlayer" ref="vlayer">
        <b-modal no-close-on-backdrop size="lg" id="modal-center" headerClass="d-none" footerClass = "d-none" bodyClass = "plyr_mdl" v-model="ply_m" centered ref = "mdl">
            <b-container class = "plyr_mdl" style="background-color:black; padding: 0">  
                <div id = "player" class="d-flex flex-column player">

                    <!-- Preload -->
                    <div class="loading" v-if = "loading == true">
                        <div class="ls img-fluid">
                            <i class = "fas fa-spinner __l_api text-white"></i>
                        </div>
                    </div>
                    
                    <!-- Close button -->
                    <router-link to = "/"><i @click = " __close_m()" class="text-white fas fa-times icn-close" style="right:3px; top:4px; font-size: 1.2em; z-index: 180"></i></router-link>
                    
                    <!-- Video Element -->
                    <video  v-if = "src != null" id="videoElement" @loadedmetadata = "LoadVideo" @canplaythrough = "loading = false" @playing="updatePaused" @pause="updatePaused" @onpause = "examming === 1 ? blur = 'blurred' : false" @timeupdate="Progress" :class = "blur" @loading = "loading = true" @waiting = "loading = true" @seeked="loading = false" @seeking = "loading = true" style="width:100%; height: 100%; transition: .95s" :src = "src" autoplay preload="auto" type="video/mp4" @ended = "exam.type === 0 ? examming = 1 : false, examming === 1 ? blur = 'blurred' : __close_m()"></video>

                    <!-- Exam Element -->
                    <div v-if = "exam.question != '' && examming == 1 && videoElement.paused == true">
                        <Exam @e-f = "ef" v-on:notice = "Notice" style="" :exam="exam.question" :exam_list = "[exam.question[0].exam, exam.question[1].exam, exam.question[2].exam, exam.question[3].exam, exam.question[4].exam]" :exam_from = "exam.from" :exam_to = "exam.to"></Exam>
                    </div>
                            
                    <!-- Controls -->
                    <div v-else id="m-pnl" style="z-index: 2">
                        <div id="shadow" class="c-shadow"  @mousemove = "shadow=1" :style = "{'opacity': shadow }" @mouseout = "LeftMouse">
                            <template v-if = "blur == '' && videoElement != null">  
                                <div class="d-flex flex-column justify-content-center align-items-center flex-nowrap flex-sm-row flex-sm-wrap justify-content-lg-start up-panel">

                                    

    <!--                                   <div class="d-flex ml-sm-auto"><button class="btn u-p-btn-style" type="button"><i class="icon-like u-s-btn-text"></i><span class="u-s-btn-text">417</span></button><button class="btn u-p-btn-style" type="button"><i class="icon-dislike"></i></button>
                                        <button
                                            class="btn u-p-btn-style" type="button"><i class="icon-eye"></i></button>
                                    </div> -->


                                    </div>

                                    <div class="d-flex flex-column flex-nowrap v-controls" style="z-index: 15">
                                        <div class="d-flex flex-column justify-content-center v-c-progress">
                                            <progress min="0" max="100" class="v-c-p__a" :value = "(videoElement.currentTime / videoElement.duration) * 100" @click="ChangeProgress"></progress>

                                            <template v-if="exam.type===1">
                                                <div v-for="(e, i) in film.examD" :key = "i">
                                                    <i @click="getExam(i)" class="fas fa-dot-circle text-white" style="color: red!important; position: absolute; top: -3%" :style = "{'left': Math.floor(e-3)+ '%'}"></i>
                                                </div>
                                            </template>

                                    </div>

                                    <div class="d-flex justify-content-between v-c-menu text-white">
                                        <div class="d-flex v-c-m-left">
                                            <div class="d-flex align-items-center v-c-btn">
                                                <i v-if = "videoElement != null && videoElement.paused == 1" class="fas fa-play" @click="play"></i>
                                                <i v-else-if = "videoElement != null && videoElement.paused == 0" class="fas fa-pause" @click="pause"></i>
                                            </div>
                                            <div v-if="loading != null" class="d-flex align-items-center v-c-m-time">
                                                <span>{{status}}/</span>
                                                <span>{{duration}}</span>
                                            </div>
                                            <div v-else class="d-flex align-items-center v-c-m-time">
                                                <span>{{lang[$store.state.language].loading}}</span>
                                            </div>
                                        </div>

                                        <div class="d-flex align-items-center v-c-m-left">
                                            <div class="d-flex v-c-btn">

                                                <div class="d-block visible v-c-m-contoller" id="s-c-panel" :style="{'transform': 'scaleY('+vlP+')'}">
                                                    <div class = "v-l-main" @click = "changeVolume" ref="vlmCon">
                                                    <div class="v-l-dec"></div>
                                                    <div class="v-l-act" :style='{ "height": volume + "px" }'></div>
                                                    </div>
                                                </div>

                                                <i v-on:click = "vlP = vlP == 1 ? 0 : 1" class="fas fa-volume-up" id="sound-controller"></i>
                                                </div>

                                            <div v-if = "film.srt != ''" class="d-flex justify-content-center v-c-btn" @click="s_d_panel = s_d_panel==true ? false : true; translated = null; notice = null; stg_panel = false; play;"><i class="fas fa-indent" id="srt_delay"></i>
                                            </div>

                                            <div class="d-flex justify-content-center v-c-btn" @click="s_d_panel=false, translated = null, notice = null, stg_panel = stg_panel== true ? false : true, stg_panel == false  ? play() : pause(), videoElement.paused == 0 ? stg_panel = false : stg_panel = true"><i class="fas fa-cog controller" id="settings"></i>
                                            </div>


                                            <div v-if="fullscreen==false">
                                                <div class="d-flex v-c-btn" @click = "openFullscreen"><i class="fas fa-window-maximize"></i></div>
                                            </div>
                                            <div v-else>
                                                <div class="d-flex v-c-btn" @click = "closeFullscreen"><i class="fas fa-window-minimize"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <!-- Subtitr -->
                        <div v-if = "examming == 0 && notice == null" style = "width: 100%; position:absolute; bottom:0; display: flex; justify-content: center;">
                            <div v-if = "subtitle.sentences != ''" class="subtitle">
                                <span @click = "translate" variant="outline-success" v-for = "(swords, index) in subtitle.sentences" :key = "index" :id = "index" ref="tooltip" class="a" style="cursor: pointer"> {{swords}} </span>
                            </div> 
                        </div>

                    </div>

                    <template>
                          <!--Subtitrlərin sinxronizasiyası -->
                          <div class="d-flex flex-column align-items-center m-auto p-i-opt" v-if="s_d_panel == true && videoElement.paused" style="  height: 120px;position:absolute;left:calc(-10em + 50%);top:calc(-60px + 50%);">
                            <div style="position:relative; width:100%;">
                                <h5 class="text-white text-center">{{lang[$store.state.language].syncSub.substr(0, 15) + '.'}}</h5><i class="fas fa-times icn-close" @click = "s_d_panel = false"></i></div>
                            <div class="t-line" style="background-color: rgba(255,67,26,0.44);"></div>
                            <div class="row" style="width: 100%">
                                <div class="col-2 d-flex" style="padding: 0;" @click = "sub_delay += sub_delay < 100 ? 10 : 0"><i class="fas fa-plus m-auto icn-btn"></i></div>
                                <div class="col-8 d-flex flex-column justify-content-center align-items-center">
                                    <h3 class="text-center text-white" style="margin:0; padding:0;">{{sub_delay}} s</h3>
                                </div>
                                <div class="col-2 d-flex" style="padding: 0;" @click = "sub_delay -= sub_delay > -100 ? 10 : 0"><i class="fas fa-minus m-auto icn-btn"></i></div>
                            </div>
                          </div>

                          <!-- Paremtrlər -->
                          <div class="m-auto p-i-opt" v-if="stg_panel == true">
                              <div style="position:relative">
                                  <h4 class="text-white text-center">{{lang[$store.state.language].settings}}</h4><i class="fas fa-times icn-close" @click = "stg_panel=false, videoElement.play()"></i></div>
                              <div class="m-auto t-line"></div>
                              <div class="d-flex align-items-center justify-content-around flex-column">
                                  <div class="d-flex justify-content-around align-items-center s-lang[$store.state.language]">
                                    <p class="text-white">{{lang[$store.state.language].dubbing}}</p>
                                    <div class="dropdown">
                                    <b-dropdown id="dropdown-right" right no-caret variant="primary" class="m-2 s-d">
                                        <template v-slot:button-content>
                                            <i class="fas fa-globe"></i><span>&nbsp;{{lang[$store.state.language].langs[dubb].substr(0, 3).toLowerCase()}} {{'  '}}</span>
                                        </template>
                                        <b-dropdown-item v-for = "(dub, i) in GetDubbing(film)" v-on:click = "changeDubbing(dub), crttime = videoElement.currentTime, dubb = dub" :key="i" href="#">{{lang[$store.state.language].langs[dub]}}</b-dropdown-item>
                                    </b-dropdown>
                                    </div>
                                  </div>

                                  <div v-if = "film.srt != ''" class="d-flex justify-content-around align-items-center s-lang[$store.state.language]">
                                    <p class="text-white">{{lang[$store.state.language].sublang}}</p>
                                    <div class="dropdown">
                                    <b-dropdown id="dropdown-right" right no-caret variant="primary" class="m-2 s-d">
                                        <template v-slot:button-content>
                                            <i class="fas fa-globe"></i><span>&nbsp;{{lang[$store.state.language].langs[1].substr(0, 3).toLowerCase()}} {{'  '}}</span>
                                        </template>
                                        <b-dropdown-item @click = "lng_s = 'en'">{{lang[$store.state.language].langs[1]}}</b-dropdown-item>
                                    </b-dropdown>
                                    </div>
                                  </div>


                                  <div class="d-flex justify-content-around align-items-center s-lang[$store.state.language]">
                                    <p class="text-white">{{lang[$store.state.language].trlang}}</p>
                                    <div class="dropdown n-b">
                                    <b-dropdown id="dropdown-right" right no-caret variant="primary" class="m-2 s-d">
                                        <template v-slot:button-content class="n-b">
                                            <i class="fas fa-globe"></i><span>&nbsp;{{lang[$store.state.language].langs[lng_t == 'az' ? 0 : (lng_t == 'ru' ? 2 : 3)].substr(0, 3).toLowerCase()}} {{'  '}}</span>
                                        </template>
                                        <b-dropdown-item @click = "lng_t = 'az'">{{lang[$store.state.language].langs[0]}}</b-dropdown-item>
                                        <b-dropdown-item @click = "lng_t = 'ru'">{{lang[$store.state.language].langs[2]}}</b-dropdown-item>
                                        <b-dropdown-item @click = "lng_t = 'tr'">{{lang[$store.state.language].langs[3]}}</b-dropdown-item>
                                    </b-dropdown>
                                    </div>
                                  </div>

                                  <div class="d-flex justify-content-around align-items-center s-lang[$store.state.language]">
                                    <p class="text-white">{{lang[$store.state.language].examtype}}</p>
                                    <div class="dropdown n-b">
                                    <b-dropdown id="dropdown-right" right no-caret variant="primary" class="m-2 s-d">
                                        <template v-slot:button-content class="n-b">
                                            <i class="fas fa-globe"></i><span>&nbsp;{{exam.type === 1 ? lang[$store.state.language].et1 : lang[$store.state.language].et2}}</span>
                                        </template>
                                        <b-dropdown-item @click = "exam.type = 1">{{lang[$store.state.language].et1}}</b-dropdown-item>
                                        <b-dropdown-item @click = "exam.type = 2">{{lang[$store.state.language].et2}}</b-dropdown-item>
                                    </b-dropdown>
                                    </div>
                                  </div>
                            


                                  <div class="d-flex justify-content-around align-items-center s-lang[$store.state.language]">
                                    <p class="text-white">{{lang[$store.state.language].examlang}}</p>
                                    <div class="dropdown n-b">
                                    <b-dropdown id="dropdown-right" right no-caret variant="primary" class="m-2 s-d">
                                        <template v-slot:button-content class="n-b">
                                            <i class="fas fa-globe"></i><span>&nbsp;{{lang[$store.state.language].langs[exam.to == 'az' ? 0 : (exam.to == 'ru' ? 2 : 3)].substr(0, 3).toLowerCase()}} {{'  '}}</span>
                                        </template>
                                        <b-dropdown-item @click = "exam.to = 'az', MakingExamPoints()">{{lang[$store.state.language].langs[0]}}</b-dropdown-item>
                                        <b-dropdown-item @click = "exam.to = 'ru', MakingExamPoints()">{{lang[$store.state.language].langs[2]}}</b-dropdown-item>
                                        <b-dropdown-item @click = "exam.to = 'tr', MakingExamPoints()">{{lang[$store.state.language].langs[3]}}</b-dropdown-item>
                                    </b-dropdown>
                                    </div>
                                  </div>
                            

                              </div>
                          </div>

                          
                          <!-- Nəticə -->
                          <div v-if = "notice != null" class="m-auto p-i-opt" style="width: 100%; height: 100%;">
                            <div class="row">
                                <div style="position:relative;" class="col-12 d-flex flex-column justify-content-around">
                                <h4 class="text-white text-center" v-html = "lang[$store.state.language].notices"></h4><i @click = "notice = null; result.correct = 0; result.incorrect=0; inc = []; result.unanswered = 0; it=0; blur = ''; exam.type === 0 ? __close_m() : play();" class="fas fa-times icn-close" style="font-size:1.2em"></i>
                                    <div class="d-flex justify-content-around">
                                        <div class="d-flex align-items-center"><i class="fas fa-check icn-btn" style="background-color: rgb(6,255,76);"></i>
                                            <h5 class="text-white" style="margin: 0;" v-html = "result.correct"></h5>
                                        </div>
                                        <div class="d-flex align-items-center"><i class="fas fa-times icn-btn" style="background-color: rgb(255,6,6);"></i>
                                            <h5 class="text-white" style="margin: 0;" v-html = "result.incorrect"></h5>
                                        </div>
                                        <div class="d-flex align-items-center"><i class="fas fa-question icn-btn" style="background-color: rgb(6,150,255);"></i>
                                            <h5 class="text-white" style="margin: 0;" v-html ="result.unanswered"></h5>
                                        </div>
                                    </div>
                                    <div class="mx-auto t-line" style="margin-bottom: 5px;margin-top: 10px;background-color: rgba(224,164,8,0.54);"></div>
                                </div>
                              </div>

                              
                                <div class="row d-flex flex-nowrap justify-content-center">
                                  <div class="col-1 text-white d-flex cntrl-btn"><i style="cursor:pointer;" class="fas fa-chevron-left" @click = "it = it > 0 ? it = it - 1 : it"></i></div>

                                  <div class="col-10 d-flex flex-column justify-content-start">
                                        <div class="d-flex justify-content-center align-items-center"><i v-if="notice[it].s == 1" class="fas fa-check icn-btn" style="background-color: rgb(6,255,76); width:25px; height: 25px"></i><i v-else-if="notice[it].s == 0" class="fas fa-times icn-btn" style="background-color: rgb(255,6,6);width:25px; height: 25px"></i><i v-else class="fas fa-question icn-btn" style="background-color: rgb(6,150,255);width:25px; height: 25px"></i>
                                            <h4 class="text-white" v-html = "notice[it].questions  + ' - ' + notice[it].answered"></h4>
                                        </div>
                                        <p class="text-white-50 text-center p-inf" v-html = "notice[it].p"></p>
                                        <p class="text-white" style="height: 90%; overflow-y: auto;" v-html = "notice[it].corrects"></p>
                                        <p class="text-white-50 text-center">{{it + 1}}/5</p>
                                </div>

                                <div class="col-1 text-white d-flex cntrl-btn"><i style="cursor:pointer;" class="fas fa-chevron-right" @click = "it = it < 4 ? it = it + 1 : it"></i></div>
                              </div>
                                
                        </div>

                        <!-- Tərcümə -->
                        <div v-if="translated != null && translated != 1 && translated[0].title != undefined && translated[0].title != null" class="m-auto p-i-opt">
                          <div style="position:relative;">
                              <h4 class="text-white p-0 m-0">{{translated[0].title}}</h4><span class="text-white-50">{{translated[0].n}}</span><i @click = "translated = null; play();" class="fas fa-times icn-close"></i>
                          </div>

                          <div class="row">
                              <div class="col-12 d-flex flex-column align-items-center p-0">
                                  <div class="t-line m-0"></div>
                                  <div class="tr-panel d-flex flex-nowrap justify-content-between" style="max-height: 200px; overflow-y: auto;">
                                      <div style="height: 100%" class="d-flex flex-column justify-content-center align-items-center"><i @click="ti = ti > 0 ? ti - 1 : 0" class="fas fa-chevron-left pr-2"></i></div>
                                      <p v-html = "translated[ti].content.replace(/\|/gmi, ', ')"></p>
                                      <div style="height: 100%" class="d-flex flex-column justify-content-center align-items-center"><i @click = "ti = (translated.length - 1) > ti ? ti + 1 : 0" class="fas fa-chevron-right"></i></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </template>
                  
                  </div>
            </b-container>
        </b-modal>  
    </div>
</template>
<script>
import {host} from '/config.js'
import Exam from '../components/Exam.vue'
import {functions} from '@/mixins.js'
import {mapState, mapGetters} from 'vuex'

let qs = require('qs')

export default {

  name: 'Player',
  components: {
      Exam
  },
  mixins: [functions],
  // props: ["film", "src", "lang[$store.state.language]_", "lang[$store.state.language]", "sub", "dubb", "type"],
  props: ["type", "film"],
  data(){
    return{
                src: null,
                videoElement: null,
                paused: null,
                status: null,
                duration: null,
                // desc: document.querySelector('head meta[name="description"]'),
                // title: document.getElementsByTagName("title"),
                volume: 80,
                vlP: 0,
                word: "",
                progress: null,
                subtitle: {
                             srt: null,
                             lang: "null",
                             sentences: []
                          },
                exam: {
                        to: 'tr',
                        from: 'en',
                        question: '',
                        type: 0,
                        status: true
                      },
                fullscreen: false,
                translated: null,
                ExamPoints: [],
                blur: '',
                examming: 0, 
                e_step: 0,
                notice: null,
                timeout: null,
                shadow: 0,
                sub_delay: 0,
                s_d_panel: false,
                stg_panel: false,
                tr_panel: false,
                v_pnl: 'scaleY(0)',
                lng_s: "en",
                lng: "tr",
                lng_f: "en",
                modal: 1,
                loading: true,
                mExam: true,
                result: {
                  correct: 0,
                  incorrect: 0,
                  unanswered: 0
                },
                it: 0,
                s: 0,
                dubbing: null,
                l_: 0,
                gEx: 0,
                crttime: null,
                ply_m: false,
                ti: 0

    }

  },
  methods: {

          GetExamPoints(){
            for(let i in this.film.exam)
            {
              if(i % 2 === 0) this.ExamPoints.push(this.film.exam[i]);
            }
            // alert(this.ExamPoints);
          },

          getExam(i)
          {
            this.e_step = i;
            setTimeout(() => { this.videoElement.pause() }, 500);
            this.blur = 'blurred';
            this.examming = 1;
            this.videoElement.currentTime = this.ExamPoints[i];
          },

          GetDubbing(a)
          {
            let dubbing = [];
           

            if(a.v_id.az != '')
              dubbing.push(0);

            if(a.v_id.en != '')
              dubbing.push(1);

            if(a.v_id.ru != '')
              dubbing.push(2);

            if(a.v_id.tr != '')
              dubbing.push(3);

            return dubbing;
          },

          changeDubbing(a)
          {
            let dubbing;
            this.l_ = a;
            // alert(a);
            switch(a)
            {
              case 0:
              dubbing = this.film.v_id.az;
              break;

              case 1:
              dubbing = this.film.v_id.en;
              break;

              case 2:
              dubbing = this.film.v_id.ru;
              break;

              case 3:
              dubbing = this.film.v_id.tr;
              break;
            }

            let link = dubbing.split("_");
            this.src = 'http://cdn'+link[0]+'.video.az/storage/' + (this.type === 2 ? 'episode' : 'movie')  + '/' +link[1]+'video.mp4';

      },


      LoadVideo(){
        this.videoElement = document.getElementById("videoElement");
        this.loading = true;
        // alert(this.lang[$store.state.language]_s + '/' + this.film.episode);
        if((this.type === 2 && this.sub !== null) || (this.type === 1 && this.film.srt.length > 0)) 
          this.Loadsrt();

        if(this.exam.status && this.exam.type === 1) this.GetExamPoints();

        setTimeout(() => this.MakingExamPoints(), 5000);


        
      },

      Loadsrt() {
            axios
                    .post(config.url + '/api.php', qs.stringify({'lng': (this.type === 2 ? this.lng_s + '/' + this.film.episode : this.lng_s), 'v_id': this.film.id}))
                    .then(response => (response.data != 0 ? this.subtitle.srt = response.data.srt : this.subtitle.srt = null));

            
            
            // if(this.subtitle != null) 
                    //alert(this.subtitle.srt); 

      },

      ef(exam)
      {
        this.examming = exam;
        if(this.examming == 2)
        {
          // setTimeout(() => { this.notice = null, this.videoElement.play(), this.blur = '' }, 5000);
          if(this.e_step < 3) 
            {
              this.MakingExamPoints();
              this.examming = 0;
              this.e_step++;
            }

            //alert(this.examming);
        } 
      },

      translate(event) {
          this.translated = null;
          this.word = event.target.innerHTML.toLowerCase();
          // alert(this.word);
          axios
                    .post(config.url + '/api.php', qs.stringify({'from': this.lng_f, 'lng': this.lng_t, 'a_s': 0, w: this.word.replace(/\s|\.|\r|\n|"|\*|\$/gi, "")}))
                    .then(response => {this.translated = response.data, this.videoElement.pause()});

            
      },

      fixTime(time){
            var sec_num = parseInt(time, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            return (hours == "00" ? '' : hours + ":") + minutes+':'+seconds;
      },


      updatePaused() {
        this.loading = false;
        this.duration = this.fixTime(this.videoElement.duration);
        this.status = this.fixTime(this.videoElement.currentTime);
      },

      autoplay(){

          if(this.paused === true)
            {
              if(this.crttime !== null) this.videoElement.currentTime = this.crttime;
            }

          this.loading = false;
          
          this.play();
          
          this.paused = false;
          
      },

      play() {
        this.videoElement.play();
        this.paused = false;
        this.s_d_panel = false;
        this.stg_panel = false;
      },

      pause() {

        this.videoElement.pause();
        this.paused = true;
        this.s_d_panel = false;
        this.stg_panel = false;
      },


      changeVolume(event){
          this.volume = event.target.offsetHeight - event.offsetY;
          // alert(this.volume);
         this.videoElement.volume = this.volume / event.target.offsetHeight;
      },

      ChangeSrc(){
        let crttime = this.videoElement.currentTime;
        //alert(crttime);
        this.videoElement.load();
        this.videoElement.currentTime = crttime;
      },


      Progress(){
        this.loading = false;
        this.status = this.fixTime(event.target.currentTime);

        this.progress = this.videoElement.currentTime / this.videoElement.duration;
        //alert(this.fixTime(event.target.currentTime));
        if(this.subtitle.srt != null) this.Subtitle(event.target.currentTime + this.sub_delay);

        if(this.ExamPoints[this.e_step] <= this.videoElement.currentTime && this.examming == 0 && this.exam.type === 1)
        {
            
            setTimeout(() => { this.videoElement.pause() }, 500);
            this.blur = 'blurred';
            this.examming = 1;         
          
        }
             
      },

      GetExam()
      {
        if(this.examming == 1)  this.blur = 'blurred';
      },



      ChangeProgress(event){
        let prgwidth = event.target.offsetWidth || false;
        if(prgwidth !== false)
        {
          this.progress = (event.offsetX / prgwidth) * this.videoElement.duration;
          this.videoElement.currentTime = this.progress;
        }
        event.preventDefault();
      },

      openFullscreen() {
              this.videoLayer = document.getElementById('player');
              if (this.videoLayer.requestFullscreen) {
                this.videoLayer.requestFullscreen();
              } else if (this.videoLayer.mozRequestFullScreen) { /* Firefox */
                this.videoLayer.mozRequestFullScreen();
              } else if (this.videoLayer.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                this.videoLayer.webkitRequestFullscreen();
              } else if (this.videoLayer.msRequestFullscreen) { /* IE/Edge */
                this.videoLayer.msRequestFullscreen();
              }
              this.fullscreen = true;
            },

            closeFullscreen() {
              if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
              } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
              }
              this.fullscreen = false;
            },
            Subtitle(time){
                for (var i = 0; i < this.subtitle.srt.length; i++){

                  if(typeof this.subtitle.srt[i].text == 'string')
                  {
                    if (this.subtitle.srt[i].startTime <= time){
                       this.subtitle.sentences = this.subtitle.srt[i].text.split(/\s|,+\s/gi);
                    }

                    if (this.subtitle.srt[i].endTime <= time){
                       this.subtitle.sentences = "";
                    }
                  }
                  else
                      this.subtitle.sentences = "";



                }
            },

            MakingExamPoints()
            {

                    this.$axios
                    .$post(host + 'api/exam/index.php', qs.stringify({'s': this.film.id, 't': this.exam.from, 'f': this.exam.to, 's_t': this.film.exam[this.e_step], 'e_t': this.film.exam[this.e_step + 1], 'sub': (this.type === 2 ? (this.sub !== null ? 1 : 0) : (this.film.srt.length > 0 ? 1 : 0))}))
                    .then(response => (this.exam.question = response.data.Exams));

            },

            Notice(exam)
            {
              this.notice = exam;

              for (var i = 0; i <= (this.notice.length - 1); i++) {
                  
                  if(this.notice[i].s == 0)
                  {
                      this.result.incorrect = this.result.incorrect + 1;
                  }
                  else if(this.notice[i].s == 1)
                  {
                    this.result.correct=this.result.correct + 1;
                  }
                  else
                    this.result.unanswered = this.result.unanswered + 1;
                  
              }
            },

            NotifyExam()
            {
              this.timeout = null;
            },

            __v_c(){
              this.v_pnl = this.v_pnl == "scaleY(0)" ? "scaleY(1)" : "scaleY(0)";
            },

            __c_pnl(){
              this.shadow = 1;
              // setTimeout(() => this.shadow = 0, 5000);
            },

            __close_m(){
              this.$root.$emit("player", false);
              this.$refs["mdl"].hide(() => delete this.videoElement);
              
            },

          GetSrc(a)
          {
            let b = a.replace("thumb.jpg", "video.mp4");
            return b;
          },

          LeftMouse(){
            setTimeout(() => this.shadow = 0, 5000);
          }
    },

    computed: {
      playing() { return !this.paused; },
    },

    watch:{
      ply_m: function(){
        if(!this.ply_m) this.$root.$emit("ply", false)
      }
    },

    async mounted(){

      this.$bvModal.show('modal-center');
      let e = await this.$store.getters.nameFilm(this.film, 3, true);
      e = e.split("_")
      this.src = "http://cdn"+e[0]+".video.az/storage/" + (this.type == 2 ? "episode/" : "movie/") + e[1]+"video.mp4";
      this.lng_t = this.lng_; this.exam.to = this.lng_; 


    },

    updated(){
      
    }
}

</script>

<style scoped>


h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


input[type=rang]
{
  -webkit-appearance: none;
  width: 100%;
  transform: rotate(90deg);
  background: transparent;
}

input[type=range]::-webkit-slider-thumb{
  -webkit-appearance: none;
  border: 1px solid #000;
  height: 75px;
  width: 25px;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  margin-top: -14px;
}

input[type=range]::-moz-range-thumb{
  border: 1px solid #000;
  height: 75px;
  width: 25px;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
}

input[type=range]::-ms-thumb{
  border: 1px solid #000;
  height: 75px;
  width: 25px;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
}

input[type=range]::-webkit-slider-runnable-track{

}


#videoElement{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 0;
}

.blurred{
  filter: blur(80px);
}

.rslts {
  width: 100%;
  height: 10em;
  font-size: .9em;
  color: white;
  padding: 5px;
}


input{
  display: block!important;
}

.p-i-opt {
  /*top: 12em;*/
  /*left: 19em;*/
  /*position: absolute;*/
  width: 20em;
  padding: 15px;
  /*margin-bottom: 2em;*/
  background-color: rgba(3,0,0,0.8);
  border-radius: 20px;
  /*margin: 0 auto;*/
  /*margin-bottom: auto;*/
  box-shadow: 0 0 45px 0 black;
  z-index: 9999!important;
  order: -1;
}

.icn-vrfy {
  padding-right: 5px;
}

#videoElement{
  width: 100%;
  height: 100%;
}

.icn-close {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.8em;
  color: rgba(139,139,139,0.64);
  cursor: pointer;
}



.icn-btn {
  display: flex!important;
  justify-content: center;
  margin-right: 10px;
  box-shadow: 1px 0px 54px 0 black;
  align-items: center;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background-color: #ff431a;
  cursor: pointer;
  color: white;
  font-size: 1.2em;
}

.rslts {
  width: 100%;
  height: 10em;
  font-size: .9em;
  color: white;
  padding: 5px;
}

p {
  padding: 0;
  margin: 2px;
}

.icn-vrfy {
  padding-right: 5px;
}

.icn-close {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.1em;
  color: rgba(139,139,139,0.64);
  cursor: pointer;
}

.s-select {
  background-color: transparent;
  color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.6);
  border-style: none;
  margin-top: 1px;
  margin-bottom: 1px;
}

optgroup, option {
  background-color: transparent!important;
}

.s-select:active, .s-select:hover {
  /*background-color: black!important;*/
  /*color: black;*/
}

.tr-panel {
  padding: 15px;
  width: 100%;
  font-size: .9em;
  color: white;
}

.t-line {
  width: 100%;
  height: .18em;
  border-radius: .1em;
  background-color: rgba(8,120,224,0.54);
  margin-bottom: .8em;
}

.video {
  position: relative;
  width: 100%;
  min-height: 480px;
  background-color: #000;
}

.v-controls {
  position: absolute;
  bottom: 0;
  max-height: 80px;
  height: 50px;
  width: 100%;
  /*background-color: rgba(255, 255, 255, .5);*/
}

.v-c-menu {
  box-sizing: border-box;
  width: 100%!important;
  padding-right: 15px;
  padding-left: 15px;
  /*font-size: 1em;*/
  /*color: #fff;*/
}

.v-c-btn {
  position: relative;
  width: 35px;
  padding: 10px;
  font-size: 1em;
  color: #fff;
  cursor: pointer;
}

.v-c-progress {
  position: relative;
  width: 100%!important;
  height: 10px;
  padding-left: 3%;
  padding-right: 3%;
}

.v-c-p-bar {
  width: 100%;
  border-radius: 50%;
}

.v-c-p__b {
  position: relative;
  height: 8px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, .5);
  border-radius: 50px;
}

progress{
  height: .6em;
  width: 100%;
  background: gray;
  color: white; 
  border-radius: 8px;
  cursor: pointer;


}

progress[value]::-webkit-progress-bar{
  border-radius: 8px;
  background:gray;
}

progress[value]::-webkit-progress-value{
  border-radius: 8px;
  background:white;
}

.ls{
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 2.75em;
}

.v-c-m-left {
  /*width: 800px;*/
  /*width: 15%;*/
}

.v-c-m-c-s-item {
  height: 90%;
  background-color: white;
  width: 6px!important;
  border-radius: 10px;
  cursor: pointer;
  transition: .75s;
  transition-timing-function: ease-in-out;
  transform-origin: bottom;
}

.v-c-m-contoller {
  position: relative;
  width: inherit;
  position: absolute;
  bottom: 50px;
  left: 0;
  height: 100px;
  background-color: rgba(13,10,10,0.6);
  border-radius: 7.5px;
  transition: .75s;
  transform: scaleY(0);
  transform-origin: bottom;
}

.v-l-main {
  width: .35em;
  position: relative;
  margin-top: 25px;
  height: 80px;
  left: calc((100% - .35em) / 2);
  z-index: 10;
  border-radius: .14em;
  cursor: pointer;
  border-radius: .12em;

}

.v-l-dec {
  position: absolute;
  background-color: rgba(255,255,255,0.71);
  max-height: 80px;
  bottom: 10px;
  height: 100%;
  transition: .56s;
  z-index: 0;
  width: inherit;
  border-radius: inherit;
}

.v-l-act {
  position: absolute;
  background-color: white;
  width: inherit;
  border-radius: inherit;
  max-height: 80px;
  bottom: 10px;
  height: 100%;
  transition: .56s;
  z-index: 1;
}

.loading{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
}


</style>


<template>
  <div class="container" style="padding: 0" v-if="sync == true">
        <div class="d-flex justify-content-center align-items-center video">
            <div class="exam-panel">
                <div class="d-flex justify-content-around e-p-timelines">
                    <div :class="['e-p-t-timeline', timeline(0)]"></div>
                    <div :class="['e-p-t-timeline', timeline(2)]"></div>
                    <div :class="['e-p-t-timeline', timeline(4)]"></div>
                    <div :class="['e-p-t-timeline', timeline(6)]"></div>
                    <div :class="['e-p-t-timeline', timeline(8)]"></div>
                </div>
                <div class="d-flex justify-content-around e-p-timelines" style="opacity: 1">
                    <div @animationend = 'sbm(null)' class="invisible e-p-t-timeline a active" id="f-q1" :style = '{ "animation-play-state": animation[0] + "!important" }'></div>
                    <div @animationend = 'sbm(null)' :class="['invisible', 'e-p-t-timeline', 'a', timeline(1)]" id="f-q2" :style = '{ "animation-play-state": animation[1] + "!important" }'></div>
                    <div @animationend = 'sbm(null)' :class="['invisible', 'e-p-t-timeline', 'a', timeline(3)]" id="f-q3" :style = '{ "animation-play-state": animation[2] + "!important" }'></div>
                    <div @animationend = 'sbm(null)' :class="['invisible', 'e-p-t-timeline', 'a', timeline(5)]" id="f-q4" :style = '{ "animation-play-state": animation[3] + "!important" }'></div>
                    <div @animationend = 'sbm(null)' :class="['invisible', 'e-p-t-timeline', 'a', timeline(7)]" id="f-q5" :style = '{ "animation-play-state": animation[4] + "!important" }'></div>
                </div>
                <div class="d-flex flex-column e-p-t-examming">
                    <div class="e-p-t-e-element exam-title">
                        <p v-html = "exam[q_id].content.examWord"></p>
                    </div>
                    <div class="flex-column e-p-t-e-element exam-variants">
                      <form method="post" :id='"exam-form-"+exam[0].exam' action="/">
                        <div class="form-check variant"><input :name="exam[q_id].exam" class="form-check-input d-none" type="radio" id="formCheck-1" :value="exam[q_id].content.id1" @click = "sbm" v-model = "selected"><label class="form-check-label" for="formCheck-1" v-html = "exam[q_id].content.variant1"></label></div>
                        <div class="form-check variant"><input :name="exam[q_id].exam" class="form-check-input d-none" type="radio" id="formCheck-2" :value="exam[q_id].content.id2" @click = "sbm" v-model = "selected"><label class="form-check-label" for="formCheck-2" v-html = "exam[q_id].content.variant2"></label></div>
                        <div class="form-check variant"><input :name="exam[q_id].exam" class="form-check-input d-none" type="radio" id="formCheck-3" :value="exam[q_id].content.id3" @click = "sbm" v-model = "selected"><label class="form-check-label" for="formCheck-3" v-html = "exam[q_id].content.variant3"></label></div>
                        <div class="form-check variant"><input :name="exam[q_id].exam" class="form-check-input d-none" type="radio" id="formCheck-4" :value="exam[q_id].content.id4" @click = "sbm" v-model = "selected"><label class="form-check-label" for="formCheck-4" v-html = "exam[q_id].content.variant4"></label></div>
                        <div class="form-check variant"><input :name="exam[q_id].exam" class="form-check-input d-none" type="radio" id="formCheck-5" :value="exam[q_id].content.id5" @click = "sbm" v-model = "selected"><label class="form-check-label" for="formCheck-5" v-html = "exam[q_id].content.variant5"></label></div>
                      </form>
                        
                      </div>
            </div>
          </div>
        </div>
    </div>

</template>
<script type="text/javascript">

import {functions} from '@/mixins.js'
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'

let qs = require('qs');

  export default {

  name: 'Exam',
  props: ['exam', 'exam_list', 'exam_to', 'exam_from'],
  data(){
    return {
      q_id: 0,
      time: 0,
      click: 0,
      checked: false,
      selected: true,
      animation: [],
      timelines: [],
      t_id: 0,
      a_end: true,
      notice: null,
      answer: null,
      sync: true,
      exam_answers: [],
      finish: false
    }
  },

  mounted(){
    //if(this.exam.length == 5) this.Examming();
    //this.$emit('child', this.exam_step);
  },



    methods:{

        checkRadio(){
            this.checked = true;
        },

        sbm(event){
          if(event != null) this.answer = event.target.value;
          this.uncheckAll();
          this.Examming(); 
          this.timelines.push('deactive');
          this.timelines.push('active'); 
          this.animation.push('paused');
          this.answer = '';
        },

        uncheckAll(){
          this.selected = false
        }, 

        Examming() {

          if(this.q_id < 4)
          {
            this.exam_answers.push(this.answer);
            this.q_id++;
            this.sync = true;
          }

          else if(this.q_id == 4)
          {
            this.exam_answers.push(this.answer);
            axios
                    .post(config.url + 'api/exam/exam.php', qs.stringify({'exam_id': this.exam_list.join(","), 'answer': this.exam_answers.join(","), 'from': this.exam_from, 'to': this.exam_to}))
                    .then(response => {this.notice = response.data.Notice, this.sync = true, this.$emit("e-f", 2), this.$emit("notice", this.notice)});
            
          }
          
          
          

        },

        timeline(index){
          return this.timelines[index];
        }
      

  }

}

</script>

<style type="text/css" scoped>
input {
  display: none;
}

label {
  font-size: 1.8rem;
  /*color: #ffffff;*/
  /*display: inline-block;*/
  padding: 0 0 0 .3em;
  cursor: pointer;
}

input + label {
  transition: color .25s ease;
}

input:checked + label {
  /*color: #5D5D5D;*/
  text-shadow: 0 0 10px black;
}

  .video{
    background-color: transparent;

    z-index: 999999!important;
    width: 100%;
  }

  .deactive{
    opacity: 1!important;
    background-color: white!important;
  }

  .e-p-t-timeline{
    width: 18%;
    opacity: .4;
    background-color: white;
    border-radius: 45px;
  }


</style>
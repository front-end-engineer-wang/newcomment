import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newList:[
      {
        id:1,
        title:'世界杯冠亚军欧洲杯同日出局',
        content:'欧洲杯淘汰赛，法国与瑞士的比赛，西班牙与克罗地亚的比赛都迎来了神剧情，瑞士与克罗地亚顽强坚持到了最后时刻。最终，西班牙顶住压力5-3晋级，而法国队7-8被淘汰出局，与克罗地亚一起，世界杯冠亚军都回家了。',
        comment:[
          {
            user:'wcq',
            content:'兄弟们，天台见',
            answer:[{
              user:'lww',
              answer:'兄弟，带上我'
            },{
              user:'lgk',
              answer:'兄弟看开点'
            }]
          }
        ],
      },
      {
        id:2,
        title:'景区有偿救援:谁该为"不走寻常路"买单?',
        content:'当游客不按规定，不听劝阻在景区遇险，救援产生的费用该由谁支付？最近有偿救援再度引发热议。今年6月，安徽省黄山市拟定了《黄山市山岳型景区有偿救援指导意见》（简称《意见》），拟将有偿救援的施行范围，从黄山风景名胜区（简称黄山景区）扩大到整个山岳型景区。',
        comment:[
          {
            user:'wcq',
            content:'支持有偿救援',
            answer:[{
              user:'lww',
              answer:'支持'
            }],
          }
        ],
      },
      {
        id:3,
        title:'hello world',
        content:'welcome to check my answer',
        comment:[{
          user:'wcq',
          content:'主要使用了vuex，数据结构是newlist（新闻列表）--{id，title，content，comment--{user,content,answer}}, 使用localStorage将数据保存到本地',
          answer:[]
        },{
          user:'wcq',
          content:'实现功能：添加新闻，添加评论，添加回复（1级），评论折叠，本地缓存数据清除',
          answer:[]
        }],
      },
    ]
  },
  mutations: {
    submitcomment(state,payload){
      state.newList.forEach((item)=>{
        if(item.id==payload.id){
          item.comment.push({
            user:'wcq',
            content:payload.comment,
            answer:[]
          })
        }
      })
    },
    addnew(state,payload){
      state.newList.push({
        id:state.newList.length+1,
        title:payload.title,
        content:payload.content,
        comment:payload.comment
      })
    },
    reply(state,payload){
      state.newList.forEach(item=>{
        if(item.id==payload.id){
          item.comment[payload.index].answer.push(payload.answer)
        }
      })
    },
    save(state){
      // localStorage.removeItem('newList')
      localStorage.setItem('newList',JSON.stringify(state.newList))
    },
    readdata(state){
      state.newList = JSON.parse(localStorage.getItem('newList'));
    }
  },
  actions: {
  },
  modules: {
  }
})

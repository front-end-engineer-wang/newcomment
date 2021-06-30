<template>
  <div class="home">
    <new-list :newlist="newlist"></new-list>
  </div>
</template>

<script>
// @ is an alias to /src
import newList from '../components/newList.vue'
export default {
  name: 'Home',
  components: {
    newList
  },
  data() {
    return {
      newlist: []
    }
  },
  mounted () {
    // this.$store.dispatch('getnewlist');由于不用调用接口，所以只是使用了同步方法commit而不是dispatch
    if(localStorage.getItem('newList'))
    {this.$store.commit('readdata')
    this.newlist=this.$store.state.newList;}
    else{
      this.newlist=this.$store.state.newList;
    }
    
  },
  beforeDestroy () {
    this.$store.commit('save');
  },
}
</script>

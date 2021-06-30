<template>
  <div class="newlist">
    <div class="newitem" v-for="(item, index) in newlist" :key="index">
      <div class="newtitle">
        <strong>{{ item.title }}</strong>
      </div>
      <div class="newcontent">{{ item.content }}</div>
      <button @click="tocomment(item.id)">查看评论</button>
    </div>
    <div class="newitem">
      <div class="morenew" @click="addnew">+添加新闻</div>
    </div>
    <add-new v-show="isshow" @addsuc='addnew'></add-new>
  </div>
</template>

<script>
import addNew from "../components/addNew.vue";
export default {
  components: {
    addNew,
  },
  data() {
      return {
          isshow: false,       
      }
  },
  props: {
    newlist: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    tocomment(id) {
      this.$router.push("/comment/" + id);
    },
    addnew() {
        this.isshow=!this.isshow
    },
  },
};
</script>

<style lang="scss" scoped>
.newlist {
  display: flex;
  flex-wrap: wrap;
  margin: 0 10%;
  justify-content: space-between;
}
.newitem {
  margin-top: 10px;
  width: 45%;
  height: 130px;
  border: 1px solid #eee;
}
.newtitle {
  height: 20px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
}
.newcontent {
  display: -webkit-box !important;
  text-overflow: ellipsis;
  height: 66px;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
button {
  margin-top: 10px;
  margin-left: 70%;
}
.morenew {
  height: 130px;
  line-height: 130px;
  text-align: center;
  color: rgb(23, 183, 223);
}
.morenew:hover {
  cursor: pointer;
}
</style>
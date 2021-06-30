<template>
  <div class="newitem">
    <h2 class="title">{{ newobj.title }}</h2>
    <p class="content">{{ newobj.content }}</p>
    <textarea
      placeholder="发表你的看法吧"
      cols="80"
      rows="10"
      v-model="comment"
      style="resize: none"
    ></textarea>
    <br />
    <button @click.prevent="submitcomment">提交评论</button>
    <div class="comment">
      <div class="topbar">
        <strong>{{ count }}条评论</strong>
        <span></span>
      </div>
      <div
        :class="{ comitem: isshow2[index], comitem2: !isshow2[index] }"
        v-for="(item, index) in newobj.comment"
        :key="index"
      >
        <div class="user">用户：{{ item.user }}</div>
        <span class="hidden" @click="hidden(index)"></span>
        <div class="content">评论：{{ item.content }}</div>
        <div class="answer" @click="showanswer(index)">
          回复({{ item.answer.length }})
        </div>
        <div v-show="isshow[index]">
          <textarea
            cols="60"
            rows="2"
            style="resize: none"
            v-model="answer"
          ></textarea>
          <span class="replybut" @click="reply(index)">回复</span>
          <div
            class="anlist"
            v-for="(item2, index2) in item.answer"
            :key="index2"
          >
            <div class="anuser">用户：{{ item2.user }}</div>
            <div class="ancontent">回复：{{ item2.answer }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newobj: {},
      comment: "",
      isshow: [],
      answer: "",
      isshow2: [],
    };
  },
  computed: {
    count() {
      if (this.newobj.comment) return this.newobj.comment.length;
      else return 0;
    },
  },
  created() {
    this.getnewobj();
    this.newobj.comment.forEach(() => {
      this.isshow.push(false);
      this.isshow2.push(true);
    });
  },
  methods: {
    getnewobj() {
      if (localStorage.getItem("newList")) {
        this.$store.commit("readdata");
      }
      this.newobj = this.$store.state.newList.filter((item) => {
        return item.id == this.$route.params.id;
      })[0];
    },
    submitcomment() {
      if (this.comment == "") {
        alert("不能提交空内容");
      } else {
        let obj = {
          id: this.$route.params.id,
          comment: this.comment,
        };
        this.$store.commit("submitcomment", obj);
        this.$store.commit("save");
        alert("提交成功");
        this.getnewobj();
        this.comment = "";
      }
    },
    showanswer(index) {
      this.$set(this.isshow, index, !this.isshow[index]);
    },
    reply(index) {
      if (this.answer == "") {
        alert("不能提交空内容");
      } else {
        let payload = {
          id: this.$route.params.id,
          index: index,
          answer: { user: "wcq", answer: this.answer },
        };
        this.$store.commit("reply", payload);
        this.answer = "";
        this.$store.commit("save");
      }
    },
    hidden(index) {
      this.$set(this.isshow2, index, !this.isshow2[index]);
    },
  },
  beforeDestroy() {
    this.$store.commit("save");
  },
};
</script>

<style lang="scss" scoped>
.newitem {
  margin: 0 auto;
  width: 70%;
}
.comment {
  margin-top: 10px;
  width: 70%;
  border: 1px solid #ebebeb;
}
.topbar {
  margin: 10px 10px;
}
.comitem {
  border-top: 1px solid #ebebeb;
  padding: 10px;
}
.comitem2 {
  border-top: 1px solid #ebebeb;
  padding: 10px;
  height: 20px;
  overflow: hidden;
}
.answer {
  color: rgb(23, 183, 223);
}
.answer:hover {
  cursor: pointer;
}
.anlist {
  margin-left: 20px;
}
.replybut {
  margin-left: 10px;
  height: 36px;
  color: rgb(23, 183, 223);
}
.replybut:hover {
  cursor: pointer;
}
.hidden {
  width: 0;
  height: 0;
  margin-left: 90%;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #217aff;
}
</style>
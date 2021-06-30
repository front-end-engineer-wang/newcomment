<template>
  <div>
    <form class="new">
      <textarea
        class="title"
        type="text"
        placeholder="输入标题"
        v-model="title"
        cols="30"
        rows="10"
      ></textarea>
      <textarea
        class="content"
        type="text"
        placeholder="输入内容"
        v-model="content"
        cols="30"
        rows="10"
      ></textarea>
      <div class="butbox">
        <button @click.prevent="addnew">提交</button>
        <button @click="canle">取消</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    addnew() {
      let payload = {
        title: this.title,
        content: this.content,
        comment: [],
      };
      this.$store.commit("addnew", payload);
      this.$emit("addsuc");
      this.title='';
      this.content='';
      this.$store.commit("save")
    },
    canle() {
      this.$emit("addsuc");
    },
  },
};
</script>

<style lang="scss" scoped>
.new {
  border: 2px solid #eee;
  position: fixed;
  padding: 12px 15px 10px 10px;
  left: 25%;
  top: 20%;
  background-color: rgb(24, 216, 206);
}
.title {
  width: 100%;
  height: 50px;
}
.content {
  width: 100%;
  height: 300px;
}
.butbox {
  margin-top: 10px;
  margin-left: 40%;
}
textarea {
  resize: none;
}
</style>
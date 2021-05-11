<template>
  <div id="body">
  <div class="home">
    <h1 class="title">Todo List</h1>
    <span class="flex">
        <form class="formsize">
          <input 
            class="writebox" 
            type="text" 
            name="todo" 
            v-model="newtext"
          />
        </form>
      <button 
        class="addbutton" 
        @click="ViewsCreate"
      >追加
      </button>
    </span>
    <span 
      class="flexbox" 
      v-for="item in todolist" :key="item.id"
      >
      <form class="formsizeupdata">
        <input 
          class="writebox" 
          type="text"
          name="todo" 
          v-model="item.text"
        />
      </form>
      <span>
        <button 
          class="updatabutton"
          @click="ViewsUpdata(item.text, item.id)"
        >更新
        </button>
        <button 
          class="deletebutton"
          @click="ViewsDelete(item.id)"
        >削除
        </button>
      </span>
    </span>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      newtext:"",
    }
  },
  created: function() {
      this.$store.dispatch("TodoRead");
    },

  computed: {
    todolist() {
      var todolist = this.$store.state.todolist;
      return todolist
    }
  },

  methods: {
    //createの関数
    ViewsCreate() {
      if(this.newtext) {
        this.$store.dispatch("TodoCreate", this.newtext);
        this.newtext = "";
      } else {
        return; //newnextが空の場合何もせずに返す。
      }
    },

   
    ViewsUpdata(updatatext, textid) {
      var originallist = this.$store.getters.gettodolist;
      //入力した項目(id)で入力した以前のtextと持ってくる即時関数
      var originaltext = (function(list) {
        for(var key of Object.keys(list)){
          if(list[key].id === textid) {
            return list[key].text;
          }
        }
      }(originallist));
      //内容が同じ場合、何もしない
      if(updatatext != originaltext)  
        this.$store.dispatch("TodoUpdata", [updatatext, textid]);
      else return;
    },

    //deleteの関数 
    ViewsDelete(id) {
      this.$store.dispatch("TodoDelete", id);
    }
  }
}
</script>
<style scoped>
.formsize {
  width: 90%;
}

.formsizeupdata {
  width:35%;
}

.title {
  font-size: 22px;
}
.flex {
  display:flex;
  margin-top: 15px;
  justify-content: space-between;
}

.flexbox {
  display:flex;
  margin-top: 15px;
  justify-content: space-between;
}

.writebox {
  width: 90%;
  height: 90%;
  border: 1.6px rgb(192, 192, 192) solid;
  border-radius: 5px;
}

button {
  border: 2px #000 solid;
  border-radius: 5px;
  padding: 5px 14px 5px 14px;
  font-size: 12px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all  0.3s ease;
}

.addbutton {
  color:#dc70fa;
  border-color: #dc70fa;

}

.addbutton:hover {
  color: #fff;
  background-color: #dc70fa;
}
.updatabutton {
  color:#fa9770;
  border-color: #fa9770;
  margin-right: 5px;

}

.updatabutton:hover {
  color: #fff;
  background-color: #fa9770;
}
.deletebutton {
  color:#71fadc;
  border-color: #71fadc;

}

.deletebutton:hover {
  color: #fff;
  background-color: #71fadc;
}

#body {
  position: relative;
}

.home {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 50%;
  position: absolute;
  left: 25%;
  margin-top: 10%;
}
</style>

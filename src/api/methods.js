import Api from "./index";

export default {
  // dbの初期の読み出し
  TodoReadApi() {
    return Api().get("todo")
  },
  //------CRUDでpreflight requestの表示を無くすため
  //------simple request(new URLSearchParams等)で飛ばそうと試みるが出来ず 
  //------Status Code 204なのでそのまま放置

  // create関数
  TodoCreateApi(newtext) {
    const params = new URLSearchParams();
    params.append("comment", newtext)
    return Api().post("todo", params);
  },

  // updata関数
  TodoUpdataApi(updata) {
    const params = new URLSearchParams();
    params.append("comment", updata[0])
    return Api().put("todo/" + updata[1], params);
  },

  //delete関数
  TodoDeleteAPi(deleteid) {
    return Api().delete("todo/" + deleteid)
  }
}
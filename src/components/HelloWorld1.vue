<template>
  <div class="hello" id="main">
   <!-- <img  class="im radius" src="static/images/1.png"  style="height: 200px;width: 200px" alt=""/>-->
    <ul>
        <li v-for="lis in pro">
          <div class="liDiv">
            <div
              class="textRight"
              style="width: 50%"
              >
              <img  class="im radius" src="../assets/img/7.jpg"  style="height: 200px;width: 200px"/>
            </div>
              <div class="box box_flex-direction_row textLeft borderColor1" style="width: 50% ;height: 200px;margin: 0 0 0 10px">
                <p @click="funAlert(lis.productId)" class="p0">{{lis.productId}}</p>
                <p class="p0">{{"产品ID："+lis.productId}}</p>
                <p class="p0">{{"产品名称："+lis.productName}}</p>
                <p class="p0">{{"产品价格："+lis.prodcutPrice}}</p>
                <p class="p0">{{"产品图片："+lis.prodcutImg}}</p>
              </div>
          </div>
        </li>
    </ul>
    <div  v-show="loading">
      <span class="infinite-scroll-text">{{tips}}</span>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import bs from '../assets/js/base'
console.log(bs.conifgurl)
bs.cons('侧是是是')
let str1 = '{ "name": "json", "sex": "man" }'
let jso = null
let list = []
let pro1 = []
export default {
  name: 'HelloWorld1',
  data () {
    return {
      msg: 'Welcome to Your Vue.js 1',
      ns: jso,
      liss: list,
      pro: pro1,
      timer: null,
      REQUIRE: true,
      loading: false,
      tips: '努力加载中...'
    }
  },
 /* mounted () {
    // 缓存指针
    let _this = this
    // 设置一个开关来避免重负请求数据
    let sw = true
    // 注册scroll事件并监听
    window.addEventListener('scroll', function () {
      // console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度
      // console.log(document.body.scrollTop); // 滚动高度
      // console.log(document.body.offsetHeight); // 文档高度
      // 判断是否滚动到底部
      if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
        console.log('sw:>>>>>>>>>>>>>')
        // 如果开关打开则加载数据
        // 将开关关闭
        // sw = false;
        this.initArray()
      }
    })
  },*/
  created: function () {
    this.getUrl()
    this.funjson()
    this.initArray()

    this.setTimer()
  },
  methods: {
    getjson () {
      axios.get('static/json/data.json').then((res) => {
        var result = res.data
        /* var ob=JSON.parse(result)
        console.log(ob.status)
        console.log(ob.result[0]) */
        console.log(result.status)
        console.log(result.result[0].productId)
        console.log(result)
        for (var vm in result.result) {
          var tempob = {}
          tempob.productId = result.result[vm].productId
          tempob.productName = result.result[vm].productName
          tempob.prodcutPrice = result.result[vm].prodcutPrice
          tempob.prodcutImg = result.result[vm].prodcutImg
          pro1.push(tempob)
        }
      })
    },
    getUrl: function () {
      console.log('' + this.$route.query.id + this.$route.query.name)
    },
    funjson: function () {
      this.ns = JSON.parse(str1).name
    },
    initArray () {
      for (let i = 0; i < 10; i++) {
        list.push('' + i)
      }
    },
    funAlert: function (msg) {
      alert(msg)
    },
    funScrool () {
      let me = this
      window.onscroll = function () {
        // 变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        // 变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        // 变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        // 滚动条到底部的条件
        if (scrollTop + windowHeight == scrollHeight) {
          // 写后台加载数据的函数
          me.initArray()// 在test3中调用test2的方法
        }
      }
    },
    setTimer () {
      setTimeout(() => {
        this.REQUIRE = true;
        this.loading = false;
        this.getjson()
      }, 5000);
    },
    scrollBottom() {
      // 变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 变量windowHeight是可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 变量scrollHeight是滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // 滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        // 写后台加载数据的函数
        //me.initArray()// 在test3中调用test2的方法
        this.REQUIRE = false;
        this.loading = true;
        this.tips = '努力加载中...';
        this.setTimer()
      }
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  mounted () {
    // 添加滚动事件，检测滚动到页面底部
    this.getjson()
    window.addEventListener('scroll', this.scrollBottom)
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    vertical-align: center;
    margin: 0 auto;
    padding: 10px 0 0 0;
  }
  a {
    color: #42b983;
  }
  .liDiv{
   /* display: flex;
    align-items: center;  !*垂直居中*!
    justify-content: center; !*水平居中*!*/
    text-align: center;
    margin:0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    /*水平居中*/
    //align-items: center; /*垂直居中*/
  }
  .im{
    height: 200px;
  }
  .p0{
    margin: 0 0 0 10px;
    padding: 0;
  }
  .radius{
    border-style: solid;
    border-radius: 100%;
    border-width: 2px;
    border-color: #f23023;
  }
  .borderColor1{
    border-style: solid;
    border-width: 1px;
    border-color:#f23023;
  }

</style>
<style>
  @import "../assets/css/base.css";
</style>
<style>
  @import "../assets/css/pagesheet.css";
</style>
<style>
  @import "../assets/css/inout.css";
</style>

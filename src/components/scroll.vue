//scroll.vue
<template lang="html">
  <div class="yo-scroll"  @touchstart="touchStart($event)"
       @touchmove="touchMove($event)" @touchend="touchEnd($event)" >
    <section class="inner">
      <!-- 使用时外面的标签会填在里面 -->
      <slot>
      </slot>
      <!-- 保持加载更多条在最下面 -->
      <footer class="load-more">
        <slot name="load-more">
          <span>{{loadMoreText}}</span>
        </slot>
      </footer>
      <div class="nullData" v-show="dataList.noFlag">暂无更多数据</div>
    </section>
  </div>
</template>
<style lang="less">
  /*:class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}"*/
  .yo-scroll {
    font-size: 24px;
    position: absolute; //关键
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto; //关键
    z-index: 100;
    height: auto;
    -webkit-overflow-scrolling: touch;
    .inner {
      position: absolute;
      /*top: -5rem;*/
      width: 100%;
      height: auto;
      transition-duration: 300ms;
      .load-more {
        height: 5rem;
        line-height: 5rem;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        display: none;
      }
      .nullData {//暂无更多数据样式
        font-size: 26px;
        color: #999999;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .down-tip,
      .refresh-tip,
      .up-tip {
        display: none;
      }
    }
  }

  .yo-scroll.touch .inner {
    transition-duration: 1s;
  }

  .yo-scroll.down .down-tip {
    display: block;
  }

  .yo-scroll.up .up-tip {
    display: block;
  }

  .yo-scroll.refresh .refresh-tip {
    display: block;
  }
</style>
<script>
export default {
  props: {
    offset: {
      type: Number,
      default: 100 // 默认高度
    },
    enableLoadMore: {
      type: Boolean,
      default: true
    },
    dataList: {
      default: false,
      required: false
    },
    onLoadMore: {
      type: Function,
      default: undefined,
      require: false
    }
  },
  data () {
    return {
      startX: 0,
      startY: 0,
      touching: false,
      isLoading: false,
      loadMoreText: '上拉加载更多'
    }
  },
  methods: {
    touchStart (e) {
      this.startY = e.targetTouches[0].pageY
      this.startX = e.targetTouches[0].pageX
      this.startScroll = this.$el.scrollTop || 0
      this.touching = true // 留着有用，不能删除
      this.dataList.noFlag = false
    },
    // 滑动中
    touchMove (e) {
      if (!this.enableLoadMore || this.dataList.noFlag || !this.touching) {
        return
      }
      let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
      if (diff > 0) {
        e.preventDefault()
      }
      this.loadMoreText = '上拉加载更多'
      this.$el.querySelector('.load-more').style.display = 'block'
    },

    touchEnd (e) {
      if (this.isLoading) {
        return
      }
      this.touching = false

      // 用于判断滑动是否在原地 ----begin
      let endX = e.changedTouches[0].pageX,
        endY = e.changedTouches[0].pageY,
        dy = this.startY - endY,
        dx = endX - this.startX

        // 如果滑动距离太短
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        // console.log("滑动距离太短")
        let more = this.$el.querySelector('.load-more')
        more.style.display = 'none' // 隐藏加载条
        return
      }

      if (!this.enableLoadMore || this.isLoading) {
        let more = this.$el.querySelector('.load-more')
        more.style.display = 'none' // 隐藏加载条
        return
      }

      let outerHeight = this.$el.clientHeight,
        innerHeight = this.$el.querySelector('.inner').clientHeight,
        scrollTop = this.$el.scrollTop,
        bottom = innerHeight - outerHeight - scrollTop

      if (bottom <= this.offset) {
        // 内容太少
        this.doLoadMore()
      } else {
        let more = this.$el.querySelector('.load-more')
        more.style.display = 'none' // 隐藏加载条
      }
    },

    doLoadMore () {
      this.isLoading = true
      this.loadMoreText = '正在加载...'
      this.onLoadMore(this.loadDone)
    },

    loadDone () {
      this.isLoading = false
      let more = this.$el.querySelector('.load-more')
      more.style.display = 'none' // 隐藏加载条
    }
  }
}
</script>

<template>
  <div @mouseenter="showContent" @mouseleave="closeContent">
    <div>
      <slot name='button'></slot>
    </div>
    <div
      ref="content"
      @mouseenter="showContent"
      @mouseleave="closeContent"
      :style="style"
      class="popover"
    >
      <div class="popover_content">
        <div class="popper_arrow" :style="arrowstyle"></div>
        <slot name='content'></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Popover',
  data () {
    return {
      style: {
        left: '200px',
        top: '300px',
        display: 'none'
      },
      arrowstyle: {
        left: '40px',
        top: '5px'
      }
    }
  },
  mounted () {
    if (this.appendSuccess) return
    this.$nextTick(() => {
      const body = document.querySelector(`body`)
      if (body.append) {
        body.append(this.$refs.content)
      } else {
        body.appendChild(this.$refs.content)
      }
    })
  },
  methods: {
    showContent () {
      this.style.display = 'block'
      // 设置气泡的位置
      this.style.left = this.$el.getBoundingClientRect().left - 24 + 'px'
      let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      this.style.top = this.$el.getBoundingClientRect().top + top + 'px'
    },
    closeContent () {
      this.style.display = 'none'
    }
  }
}
</script>
<style>
.popper_arrow {
  border-width: 0 7px 7px;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-color: transparent transparent white;
}
.popover {
  width: auto;
  position: absolute;
  transform-origin: center top;
  z-index: 2065;
  background: transparent;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 12px;
  word-break: break-all;
  padding-top: 10px;
  margin-top: 28px;
}
.popover_content {
  background: #fff;
  border: 1px solid #ebeef5;
  padding: 5px 12px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.maplist li {
  min-width: 70px;
  text-align: center;
  line-height: 25px;
  height: 25px;
  cursor: pointer;
  border-bottom: 1px solid #ef0f0f3b;
}
</style>

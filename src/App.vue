<template>
  <div class="main">
    <button @click="myAnimation = 'slide'">Slide</button>
    <button @click="myAnimation = 'fade'">Fade</button>
    <p>{{myAnimation}}</p>
    <button @click="show = !show">切り替え</button>
    <br><br>
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"

      @before-leaver="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled"
    >
      <div class="circle" v-if="show"></div>
    </transition>
    <br>
    <button @click="myComponent = 'ComponentA'">ComponentA</button>
    <button @click="myComponent = 'ComponentB'">ComponentB</button>
    <transition name="fade" mode="out-in">
      <component :is="myComponent"></component>
    </transition>
    <transition name="fade" mode="out-in">
      <p v-if="show" key="bye">さよなら</p>
      <p v-if="!show" key="hello">こんにちは</p>
    </transition>
    <transition 
      enter-active-class="animated bounce"
      appear
    >
      <p v-if="show">hello</p>
    </transition>
    <transition 
      :name="myAnimation"
      appear>
      <p v-if="show">bye</p>
    </transition>
  </div>
</template>

<script>
import ComponentA from "./components/ComponentA.vue";
import ComponentB from "./components/ComponentB.vue"

export default {
  components: {
    ComponentA,
    ComponentB,
  },
  data() {
    return {
      show: true,
      myAnimation: "slide",
      myComponent: "ComponentA"
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.transform ='scale(0)'
    },
    enter(el,done) {
      let scale = 0;
      const interval = setInterval(() => {
        el.style.transform = `scale(${scale})`;
        scale += 0.01
        if ( scale > 1) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterEnter() {

    },
    enterCancelled() {

    },
    beforeLeave() {

    },
    leave(el,done) {
      let scale = 1;
      const interval = setInterval(() => {
        el.style.transform = `scale(${scale})`;
        scale -= 0.01
        if ( scale < 0) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterLeave() {

    },
    leaveCancelled() {

    },
  }
};
</script>

<style scoped>
.circle {
  width: 200px;
  height: 200px;
  margin: auto;
  background-color: deeppink;
  border-radius: 100px;
}
.fade-enter {
  /* 現れるときの最初の状態 */
  opacity: 0;
}
.fade-enter-active {
  /* 現れるときのトランジションの状態 */
  transition: opacity 0.5s;
}
.fade-enter-to {
  /* 現れるときの最後の状態 */
  opacity: 1;
}
.fade-leave {
  /* 消えるときの最初の状態 */
  opacity: 1;
}
.fade-leave-active {
  /* 消えるときのトランジションの状態 */
  transition: opacity 0.5s;
}
.fade-leave-to {
  /* 消えるときの最後の状態 */
  opacity: 0;
  
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 0.5s;
  transition: opacity 0.5s;
}

.slide-leave-active {
  animation: slide-in 0.5s reverse;
  transition: opacity 0.5s;
}


@keyframes slide-in {
  from {
    transform: translateX(100px);
  }
  to {
    transform: translateX(0);
  }
}

.main {
  width: 70%;
  margin: auto;
  padding-top: 5rem;
  text-align: center;
}
</style>

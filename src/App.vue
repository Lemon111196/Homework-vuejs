<template>
  <div id="app">
    <!-- <p v-if="count <= 5">Have {{ count }} day to Tet holiday</p>
    <p v-else>Long time to meet you, fuck</p>
    <p v-if="count <= 5">5 left</p>
    <p v-else-if="count > 5 && count <= 10">5 to 10</p>
    <p v-else>More than 10</p>

    <p>{{ count }}</p>
    <ul>
      <li v-for="(item, index) in city" :key="index">{{ item }}</li>
    </ul>
    <button @click="countUp">Count Up</button>
    v-on = @click
    <button @click="countDown">Count Down</button> v-on = @click
    <p class="fullname"> {{ fullName }}</p>
    <p class="fullname"> {{ fullName }}</p>
    <button @click="changeComputed">Click me</button>
    <p class="fullname">fullName: {{ fullName }}</p>
    <p class="fullname">fullName - readonly: {{ fullNameReadOnly }}</p>
    <p v-bind:class="original ? 'original' : 'orange'">V-bind directives</p>
    <button @click="changeColor">Change Color</button>
    <form>
      <button type="submit" @click.prevent></button>
    </form>
    <p>___________________________________</p>
    <input type="text" v-model="message">
    <button > message</button>
    <p>{{ message }}</p>
    <br>
    <button>Delete</button>
    <p>___________________________________</p>
    <input type="text" v-model="formData.title" placeholder="title">
    <input type="text" v-model="formData.content" placeholder="content">
    <br>
    <button @click="onSubmit">Submit</button> -->
    <!-- <TodoList v-for="item in 5" :key="item">
    </TodoList> -->
    <!-- <todo-list></todo-list> -->
    <!-- <Demo></Demo> -->
    <!-- <ComponentTraining :classListProps="classList" :title="title"
    @table-click="logEverything"
    ></ComponentTraining> -->
    <component :is="currentComponent"></component>
    <CustomButton @click="onClick" variant="warning">Click</CustomButton>
    <div class="btn-gr">
      <b-button variant="primary" >Open Modal</b-button>
      <b-button variant="primary" @click="currentComponent = TodoList">Todo list</b-button>
      <b-button variant="primary" @click="currentComponent = Demo">Demo</b-button>
      <b-button variant="primary" @click="currentComponent = ComponentTraining">Component ComponentTraining</b-button>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TodoList from './components/TodoList.vue'
import Demo from './components/Demo.vue';
import ComponentTraining from './components/ComponentTraining.vue';
// import { BButton } from 'bootstrap-vue';
import CustomButton from './components/CustomButton.vue';
export default {
  name: 'App',
  components: {
    TodoList,
    Demo,
    ComponentTraining,
    CustomButton,
  },
  data() {
    return {
      TodoList,
      Demo,
      ComponentTraining,
      currentComponent: TodoList,
      count: 10,
      city: [
        'Hanoi', 'Da Nang', 'Sai Gon'
      ],
      firstName: 'Nguyễn Văn',
      lastName: 'A',
      firstName2: "Đinh Tiến",
      lastName2: "N",
      original: true,
      formData: {
        title: '',
        content: '',
      },
      message: '',
      title: 'Mark Table',
      classList: [
        {
          id: 353535,
          firstname: 'Nguyen',
          lastname: 'B',
          class: '1C',
          math: 9,
          physics: 10,
          chemistry: 9.5
        },
        {
          firstname: 'Le',
          lastname: 'A',
          class: '2C',
          math: 9.2,
          physics: 9.8,
          chemistry: 9
        },
        {
          firstname: 'Nguyen',
          lastname: 'B',
          class: '3C',
          math: 9.2,
          physics: 8.9,
          chemistry: 10
        },
      ],
      bbutton: [

      ],
    };
  },
  computed: {
    // fullName(){
    //   // return this.firstName + " " + this.lastName
    //   return `${this.firstName}${this.lastName}`;
    // },
    fullName: {
      get() {
        return `${this.firstName}${this.lastName}`;
      },
      set(value) {
        this.firstName = value;
      },
    },
    fullNameReadOnly() {
      return `${this.firstName2} ${this.lastName2}`;
    },
  },
  methods: {
    onClick(){
      console.log("love diu");
    },
    countUp() {
      // console.log("count");
      this.count = this.count + 1;
      // this.count = this.count - 1; = this.count--;
      this.count--;
    },
    fullName2() {
      return `${this.firstName}${this.lastName}`;
    },
    changeComputed() {
      this.fullName = "Le";
      this.fullNameReadOnly = "Dinh";
    },
    changeColor() {
      this.original = !this.original;
    },
    onSubmit(e) {
      console.log(e);
    },
    // handleChange(e){
    //   this.message = e.target.value;
    // }
    logEverything(item) {
      console.log(item);
    },
  }
}
</script>

<style>
.original {
  color: red;
}

.orange {
  color: orange;
}

.btn-gr {
  margin: 10px;
  display: flex;
  gap: 10px;
}

.btn-gr {
  display: flex;
  justify-content: end;
  align-items: flex-end;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>

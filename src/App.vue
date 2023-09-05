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
    <Demo></Demo>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TodoList from './components/TodoList.vue'
import Demo from './components/Demo.vue';
export default {
  name: 'App',
  components: {
    TodoList,
    Demo
  },
  data() {
    return {
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
</style>

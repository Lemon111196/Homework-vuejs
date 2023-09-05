<template>
  <div class='-container'>
    <!-- <p>{{ fullName }}</p> -->
    <div class="table-demo">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Full name</th>
            <th>Class</th>
            <th>Math</th>
            <th>Physics</th>
            <th>Chemistry</th>
            <th>Average</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in classList">
            <td>{{ index + 1 }}</td>
            <td>{{ fullName(item.firstname, item.lastname) }}</td>
            <td>{{ item.class }}</td>
            <td>{{ item.math }}</td>
            <td>{{ item.physics }}</td>
            <td>{{ item.chemistry }}</td>
            <td>{{ average(item.math, item.physics, item.chemistry) }}</td>
            <td><button class="btn btn-update" @click="openModal" >Update</button></td>
            <td><button class="btn btn-delete">Delete</button></td>
          </tr>
        </tbody>
      </table>
      <input type="number" v-model="plusMark">
    </div>
    <button class="btn btn-add" v-if="!isUpdate" @click="isAddNew">Add new</button>
    <div class="modal" v-if="showModal">
      <form @submit.prevent="addNew">
        <label for="">Full name: </label>
        <input type="text" class="inpt">
        <br>
        <label for="">Class: </label>
        <input type="text" class="inpt">
        <br>
        <label for="">Math: </label>
        <input type="number" class="inpt">
        <br>
        <label for="">Physics: </label>
        <input type="number" class="inpt">
        <br>
        <label for="">Chemistry: </label>
        <input type="number" class="inpt">
        <br>
        <div class="btn-all">
          <button class="btn btn-cancel" @click="closeModal">Cancel</button>
          <button class="btn btn-add" v-if="isAdd">Add new</button>
          <button class="btn btn-confirm" v-if="!isUpdate">Confirm</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {},
  data() {
    return {
      firstName: 'Nguyen',
      lastName: 'A',
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
      plusMark: null,
      showModal: false,
      isUpdate: false,
      isAdd: false,
    }
  },
  computed: {
    // fullName() {
    //   return `${this.firstName} ${this.lastName}`;
    // }
  },
  methods: {
    fullName(firstName, lastName) {
      return `${firstName} ${lastName}`;
    },
    average(math, physics, chemistry) {
      return (math + physics + chemistry) / 3;
    },
    openModal(){
      this.showModal= true;
    },
    closeModal() {
      this.showModal= false;
    },
    isAddNew(){
      this.showModal= true;
    },
  },
  watch: {
    plusMark() {
      this.classList = this.classList.map((item) => {
        console.log(typeof item.math);
        console.log(typeof this.plusMark);
        item.math = item.math + Number(this.plusMark)
        return item;
      })
    }
  }
}
</script>

<style scoped>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 10px;
}

.modal {
  position: fixed;
  left: 30px;
  top: 300px;
  overflow: auto;
  background-color: rgba(65, 160, 89, 0.4);
  margin: auto;
  padding: 10px;
  border: 1px solid #888;
  width: 30%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
}

.modal input {
  display: flex;
  height: 25px;
  width: 97%;
  justify-content: center;
  border-radius: 10px;
}

.modal h2 {
  text-align: center;
}

.btn {
  margin: 5px;
  width: 80px;
  height: 40px;
  /* background-color: crimson; */
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.btn-add {
  background-color: rgb(61, 191, 61);
}
.btn-add:hover {
  background-color: rgb(35, 116, 35);
}
.btn-update {
  background-color: rgb(202, 168, 20);
}
.btn-update:hover {
  background-color: rgb(123, 105, 23);
}
.btn-delete {
  background-color: crimson;
}
.btn-delete:hover {
  background-color: rgb(107, 24, 40);
}
.btn-cancel {
  background-color: #888;
}
.btn-cancel:hover {
  background-color: #535353;
}
.btn-confirm{
  background-color: rgb(192, 154, 56);
}
.btn-confirm:hover{
  background-color: rgb(108, 85, 28);
}

.modal button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-all{
  display: flex;
  justify-content: center;
}
</style>
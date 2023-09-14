<template>
    <div class='component-training-container'>
        <h2>{{ title }}</h2>
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in classListProps">
                        <td>{{ index + 1 }}</td>
                        <td>{{ `${item.firstname} ${item.lastname}` }}</td>
                        <td>{{ item.class }}</td>
                        <td>{{ item.math }}</td>
                        <td>{{ item.physics }}</td>
                        <td>{{ item.chemistry }}</td>
                        <td><button class="btn1 btn-update" @click="onClick(item)">Click</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br>
        <b-button pill variant="dark">Button</b-button>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        classListProps:{
            type: Array,
            // required: true,
            default: () => [{
                firstname: 'pewpie',
                lastname: 'pewpie',
            }],
            
        },
        title:{
            type: String,
            default: 'title'
        },
        logEverything:{
            type: Function,

        }
    },
    components: {},
    data() {
        return {
        }
    },
    methods: {
        onClick(item){
            // console.log(this.classListProps);
            this.$emit('table-click', item)
        },
    },
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
.btn1 {
  margin: 5px;
  width: 80px;
  height: 40px;
  /* background-color: crimson; */
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: rgb(64, 189, 234);
}
</style>
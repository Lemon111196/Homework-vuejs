<template>
  <div class='note-list-container'>
    <div class="note-list">
      <button variant="secondary" @click="openPostModal(false)">+</button>
      <div class="note-card" v-for="(item, index)  in noteList" :key="index"
        :class="item.status === 'IMPORTANT' ? 'border-danger' : item.status === 'HIGHLIGHT' ? 'border-warn' : 'border-sucess'">
        <div class="headerNote">
          <h3>{{ item.title }}</h3>
          <div class="iconNote">
            <img class="pointer" width="20" height="20" src="../../assets/icon/pencil.png" alt=""
              @click="openPostModal(true, item)">
            <img class="pointer" width="20" height="20" src="../../assets/icon/delete (1).png" alt=""
              @click="openDeleteModal(item)">
          </div>
        </div>
        <div class="badges">
          <b-badge class="badge-item" pill
            :variant="item.status === 'IMPORTANT' ? 'danger' : item.status === 'HIGHLIGHT' ? 'warning' : 'success'">{{
              item.status }}</b-badge>
        </div>
        <div class="contentNote">{{ item.content }}</div>
        <b-modal v-model="postModal" :title="isUpdate === true ? 'Update' : 'Create new note'" centered
          :oke-title="isUpdate === true ? 'Update' : 'Create'" @ok="validateCreateNote">
          <ValidationObserver tag="form" ref="create-form">
            <ValidationProvider rules="required" #default="{ errors }" name="Title">
              <b-form-group label="Title">
                <b-form-input v-model="formModal.title">
                </b-form-input>
                <small class="error">{{ errors[0] }}</small>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider rules="required" #default="{ errors }" name="Content">
              <b-form-group label="Content">
                <b-form-textarea rows="4" v-model="formModal.content">
                </b-form-textarea>
                <small class="error">{{ errors[0] }}</small>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider rules="required" #default="{ errors }" name="Status">
              <b-form-group label="Status">
                <b-form-select :options="options" v-model="formModal.status">
                </b-form-select>
                <small class="error">{{ errors[0] }}</small>
              </b-form-group>
            </ValidationProvider>
          </ValidationObserver>
        </b-modal>
        <div class="delete-modal">
          <b-modal v-model="deleteModal" ok-title="Delete" title="Delete" centered @ok="deleteNote" @hidden="closePostModal">
            <p>Are you sure?</p>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '@/service/apiService'
// import ModalNoteList from '@/components/ModalNoteList.vue'
import { ValidationObserver } from 'vee-validate';
import { ValidationProvider } from 'vee-validate';
import { required } from '@validations';
export default {
  name: 'noteListVue',
  props: {},
  components: {
    ValidationObserver, ValidationProvider
  },
  data() {
    return {
      required,
      formModal: {
        title: "",
        status: "",
        content: ""
      },
      noteList: [],
      options: [
        { value: "IMPORTANT", text: "Important" },
        { value: "HIGHLIGHT", text: "Highlight" },
        { value: "NORMAL", text: "Normal" }
      ],
      postModal: false,
      isUpdate: false,
      deleteModal: false,
      note: {},
    }
  },
  mounted() {
    this.getNoteList()
  },
  methods: {

    // closeDeleteModal() {
    //   this.deleteModal = false;  
    // },
    closePostModal() {
      this.postModal = false;
      this.resetForm();
    },
    resetForm() {
      this.formModal = {
        _id: '',
        title: '',
        content: '',
        status: ''
      },
        this.note = {}
    },
    async validateCreateNote(e) {
      e.preventDefault();
      const valid = await this.$refs["create-form"].validate();
      if (valid) {
        if (this.isUpdate) {
          this.updateNote()
        } else {
          this.createNote();
        }
      }
    },
    async getNoteList() {
      try {
        const response = await apiService.get("/note/list")
        console.log(response)
        this.noteList = response.data.notes;
      } catch (error) {
        this.$toast.error(error.response.data.success)
      }
    },
    openDropdown() {
      this.showDropDown = !this.showDropDown
    },
    openPostModal(isUpdate = false, item) {
      this.isUpdate = isUpdate;
      if (this.isUpdate) {
        this.getNoteDetail(item._id)
      }
      this.postModal = true;
    },
    openDeleteModal(item) {
      this.deleteModal = true;
      this.getNoteDetail(item._id);
    },
    async createNote() {
      console.log(this.formModal);
      try {
        const response = await apiService.post("note/create", this.formModal)
        console.log(response);
        this.$toast.success(response.data.message);
        // this.postModal = false;
        this.getNoteList()
        this.closePostModal();
        this.resetForm();
      } catch (error) {
        console.log(error);
        this.$toast.error(error);
      }
    },
    async getNoteDetail(id) {
      try {
        const response = await apiService.get(`/note/detail/${id}`)
        this.formModal = response.data.note;
        this.note = this.formModal;
      } catch (error) {
        this.$toast.error(error);
      }
    },
    async updateNote() {
      console.log(`first`);
      try {
        const response = await apiService.put(`/note/update/${this.note._id}`, this.formModal)
        this.$toast.success(response.data.message);
        this.closePostModal();
        this.getNoteList();
      } catch (error) {
        this.$toast.error(error);
      }
    },
    async deleteNote() {
      try {
        await apiService.delete(`/note/delete/${this.formModal._id}`)
        // console.log(response);
        // this.$toast.success(response.data.message);
        this.closePostModal();
        this.getNoteList();
      } catch (error) {
        this.$toast.error(error);
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.note-list button {
  font-weight: 100;
  width: 50px;
  height: 50px;
  border-radius: 60%;
  // position: absolute;
  // right: 20px;
  // top: 80vh;
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.note-list {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px 5%;
}


.note-card {
  border: 2px solid rgb(99, 190, 99);
  // box-shadow: 0 4px 4px rgb(99, 190, 99);
  width: 30%;
  // height: 100px; 
  // margin: 10px 5px;
  padding: 10px;
}

.headerNote {
  display: flex;
  justify-content: space-between;
}

.pointer {
  margin: 5px
}

.border-danger {
  border: 2px solid #dc3545;
}

.border-warn {
  border: 2px solid #ffc107;
}

.border-success {
  border: 2px solid #28a745;
}
</style>
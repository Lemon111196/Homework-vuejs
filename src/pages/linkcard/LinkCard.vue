<template>
    <div class='link-card-container'>
        <div class="link-card-list">
            <button variant="secondary" @click="openCreateModal">+</button>
            <div class="link-card" v-for="(item, index)  in linkCard" :key="index"
                :class="item.status === 'LEARNED' ? 'border-danger' : item.status === 'LEARNING' ? 'border-warn' : 'border-sucess'">
                <div class="headerLinkCard">
                    <h3>{{ item.title }}</h3>
                    <div class="iconLinkCard">
                        <img class="pointer" width="20" height="20" src="../../assets/icon/pencil.png" alt=""
                            @click="openPostModal(true, item)">
                        <img class="pointer" width="20" height="20" src="../../assets/icon/delete (1).png" alt=""
                            @click="openDeleteModal(item)">
                    </div>
                </div>
                <div class="badges">
                    <b-badge class="badge-item" pill
                        :variant="item.status === 'LEARNED' ? 'danger' : item.status === 'LEARNING' ? 'warning' : 'success'">{{
                            item.status }}</b-badge>
                </div>
                <div class="urlLinkCard">{{ item.url }}</div>
                <b-modal v-model="cardModal" :title="isUpdate ? 'Update' : 'Create new link card'" centered
                    :ok-title="isUpdate ? 'Update' : 'Create'" @ok="validateCreateLinkCard">
                    <ValidationObserver tag="form" ref="create-form">
                        <ValidationProvider rules="required" #default="{ errors }" name="Title">
                            <b-form-group label="Title">
                                <b-form-input v-model="formModal.title">
                                </b-form-input>
                                <small class="error">{{ errors[0] }}</small>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider rules="required" #default="{ errors }" name="URL">
                            <b-form-group label="URL">
                                <b-form-input rows="4" v-model="formModal.url">
                                </b-form-input>
                                <small class="error">{{ errors[0] }}</small>
                            </b-form-group>
                        </ValidationProvider>
                    </ValidationObserver>
                </b-modal>
                <div class="delete-modal">
                    <b-modal v-model="deleteModal" ok-title="Delete" title="Delete" centered @ok="deleteLinkCard"
                        @hidden="closePostModal">
                        <p>Are you sure?</p>
                    </b-modal>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import { ValidationProvider } from 'vee-validate';
import { required } from '@validations';
import apiService from '@/service/apiService'

export default {
    name: 'linkCardVue',
    props: {},
    components: {
        ValidationObserver, ValidationProvider
    },
    data() {
        return {
            required,
            formModal: {
                title: '',
                url: '',
                status: '',
            },
            cardModal: false,
            options: [
                { value: "TO LEARN", text: "To learn" },
                { value: "LEARNING", text: "Learning" },
                { value: "LEARNED", text: "Learned" },
            ],
            linkCard: [],
            link: {},
            deleteModal: false,
            isUpdate: false
        }
    },
    mounted() {
        this.getLinkCardList()
    },
    methods: {
        //**Close post modal** -----------------------------------------------------------------------
        closePostModal() {
            this.postModal = false;
            this.resetForm();
        },
        //**Validate Form ** -----------------------------------------------------------------------
        async validateCreateLinkCard(e) {
            e.preventDefault();
            const valid = await this.$refs["create-form"].validate();
            if (valid) {
                if (this.isUpdate) {
                    this.updateLinkCard()
                } else {
                    this.createLinkCard();
                }
            }
        },
        // **Reset Form ** -----------------------------------------------------------------------
        resetForm() {
            this.formModal = {
                _id: '',
                title: '',
                url: '',
                status: ''
            },
                this.link = {}
        },
        //**open Modal ** -----------------------------------------------------------------------
        openCreateModal() {
            this.cardModal = true;
            console.log(this.openCreateModal);
            console.log(this.formModal);
        },
        //** GET Card List ** -----------------------------------------------------------------------
        async getLinkCardList() {
            try {
                const response = await apiService.get("/linkcard/list")
                console.log(response)
                this.noteList = response.data.notes;
            } catch (error) {
                this.$toast.error(error.response.data.success)
            }
        },
        //** Create Card List ** -----------------------------------------------------------------------
        async createLinkCard() {
            try {
                const response = await apiService.post("linkcard/create", this.formModal)
                console.log(response);
                this.$toast.success(response.data.message);
                // this.postModal = false;
                this.getLinkCardList()
                // this.closePostModal();
                // this.resetForm();
            } catch (error) {
                console.log(error);
                this.$toast.error(error);
            }
        },
        //** Update Card List ** -----------------------------------------------------------------------
        async updateLinkCard() {
            console.log(`first`);
            try {
                const response = await apiService.put(`/linkcard/update/${this.note._id}`, this.formModal)
                this.$toast.success(response.data.message);
                this.closePostModal();
                this.getLinkCardList();
            } catch (error) {
                this.$toast.error(error);
            }
        },
        async deleteLinkCard() {
            try {
                await apiService.delete(`/linkcard/delete/${this.formModal._id}`)
                // console.log(response);
                // this.$toast.success(response.data.message);
                this.closePostModal();
                this.getLinkCardList();
            } catch (error) {
                this.$toast.error(error);
            }
        }
    },
}
</script>

<style lang='scss' scoped>
.link-card-list button {
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

.link-card-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    gap: 20px 5%;
}


.link-card {
    border: 2px solid rgb(99, 190, 99);
    // box-shadow: 0 4px 4px rgb(99, 190, 99);
    width: 30%;
    // height: 100px; 
    // margin: 10px 5px;
    padding: 10px;
}

.headerLinkCard {
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
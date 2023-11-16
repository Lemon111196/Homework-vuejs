const state = {
    isAuthenticated: false,
};
//tất cả các biến trong này đều có thể lấy ra để dùng trog các màn mà k cần import
const getters = {};
//như computed
const actions = {
    verifyAuth(context) {
        context.commit("VERIFY_AUTH")
        // console.log('context' ,context);
        // console.log('context2' ,context.state);
        // console.log('payload' ,payload);
    }

};
//chứa các hàm bên trong tương tự như methods
const mutations = {
    "VERIFY_AUTH"(state) {
        // console.log(state, payload);
        state.isAuthenticated = true;
    }
};
//thay đổi các biến trong state
export default {
    state,
    getters,
    actions,
    mutations,
};
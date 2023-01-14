import axios from "@/helper/axios";
import CryptoJs from 'crypto-js';


const state = {
    token: sessionStorage.getItem('to-hu') ? sessionStorage.getItem('to-hu') : null, // token
    request: sessionStorage.getItem('request') ? (sessionStorage.getItem('request')) : {},
    requestor: sessionStorage.getItem('kai-tono') ? (sessionStorage.getItem('kai-tono')) : {}, //requestor
    message: sessionStorage.getItem('message') ? sessionStorage.getItem('message') : '',
    approvers: sessionStorage.getItem('kai-wha-kaae') ? sessionStorage.getItem('kai-wha-kaae') : {}, // approvers
    isNotApprover: null,
    isApprover: sessionStorage.getItem('umg-uny-azi') ? sessionStorage.getItem('umg-uny-azi') : null,
    approver: sessionStorage.getItem('wha-ka-ae') ? sessionStorage.getItem('wha-ka-ae') : '',

}

const getters = {
    auth: state => state.token,
    getRequest: state => state.request,
    getRequestor: state => state.requestor,
    getMessage: state => state.message,
    getIsApprover: state => state.isApprover,
    getIsNotApprover: state => state.isNotApprover,
    getApprover: state => state.approver,
    getApprovers: state => state.approvers,
    errorGetter: () => {
        throw new Error('Error from getter!')
    }
}

const mutations = {
    setToken: (state, token) => (state.token = token),
    setRequest: (state, request) => (state.request = request),
    setRequestor: (state, requestor) => (state.requestor = requestor),
    setMessage: (state, message) => (state.message = message),
    setIsApprover: (state, isApprover) => (state.isApprover = isApprover),
    setIsNotApprover: (state, isNotApprover) => (state.isNotApprover = isNotApprover),
    setApprover: (state, approver) => (state.approver = approver),
    setApprovers: (state, approvers) => (state.approvers = approvers),
}

const actions = {

    async signIn() {
        const response = await axios.get('/signin', {
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            }
        })

        return response
    },
    
    async storeLoggedUser({ commit }, payload) {

        let user = payload.user;
        let approvers = payload.approvers;

        const response = await axios.post(`login`,{userId: user.userId } ,{
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            }
        })

        if (response.data.token) {
            if (user.task == 'TELLER' || user.task == 'BM' || user.task == 'ABM') {
                commit('setIsApprover', false);
                sessionStorage.setItem('umg-uny-azi', false) // isApprover
            } else {
                commit('setIsApprover', true);
                sessionStorage.setItem('umg-uny-azi', true) // isApprover
            }

            const cipherUser = CryptoJs.AES.encrypt(JSON.stringify(user), 'BoJunYiXiaoShiZhenDe');

            const encData = CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(cipherUser));

            const cipherApprover = CryptoJs.AES.encrypt(JSON.stringify(approvers), 'BoJunYiXiaoShiZhenDe');

            const encApprover = CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(cipherApprover));

            sessionStorage.setItem('kai-tono', encData); // requestor
            sessionStorage.setItem('to-hu', response.data.token);// token
            sessionStorage.setItem('kai-wha-kaae', encApprover); // approvers
            sessionStorage.setItem('wha-ka-ae', user.task)

            commit('setRequestor', encData);
            commit('setToken', response.data.token);
            commit('setApprovers', encApprover);
            commit('setApprover', user.task)

            let resCode = "0";

            return { resCode: resCode, approvers: approvers};
        } else {
            let resCode = '1';
            return resCode;
        }

    },

    async userLogout({ commit }) {
        let response = "";

        commit('setToken', null);
        commit('setRequestor', {});
        commit('setRequest', {})
        sessionStorage.removeItem('kai-tono')
        sessionStorage.removeItem('to-hu');
        sessionStorage.removeItem('request');

        if (!sessionStorage.getItem('to-hu')) {

            // response = "http://localhost:61746/mlhuillier-philippines-online-request";
            response = "http://10.4.8.132/OnlineRequestSystem/mlhuillier-philippines-online-request";

            return response
        }


    },

}

export default {
    state,
    getters,
    mutations,
    actions
}
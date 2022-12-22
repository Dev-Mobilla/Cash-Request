import axios from "@/helper/axios";
import CryptoJs from 'crypto-js';


const state = {
    token: sessionStorage.getItem('to-hu') ? sessionStorage.getItem('to-hu') : null, // token
    request: sessionStorage.getItem('request') ? (sessionStorage.getItem('request')) : {},
    requestor: sessionStorage.getItem('kai-tono') ? (sessionStorage.getItem('kai-tono')) : {}, //requestor
    message: sessionStorage.getItem('message') ? sessionStorage.getItem('message') : '',
    approvers: sessionStorage.getItem('kai-wha-kaae') ? sessionStorage.getItem('kai-wha-kaae') : {}, // approvers
    // user: localStorage.getItem('kai-whi-whi') ? localStorage.getItem('kai-whi-whi') : {},
    // token: localStorage.getItem('to-hu') ? localStorage.getItem('to-hu') : null,
    // request: localStorage.getItem('request') ? JSON.parse(localStorage.getItem('request')) : {},
    // requestor: localStorage.getItem('kai-tono') ? (localStorage.getItem('kai-tono')) : {},
    // message: localStorage.getItem('message') ? localStorage.getItem('message') : '',
    // approvers: localStorage.getItem('kai-wha-kaae') ? localStorage.getItem('kai-wha-kaae') : {},
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
    async setUserRole({ commit }, payload) {
        const response = await axios.post(`/getUserRole`, { email: payload.email }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json',
                "x-access-token": state.token
            }
        })
        if (response.data.rows.length === 0) {
            commit('setIsApprover', false)
            commit('setIsNotApprover', true)
        } else {

            let approver = ''
            const array = response.data.rows[0]

            for (const key in array) {
                if (array[key] != null) {
                    approver = key
                }
            }

            commit('setApprover', approver)
            commit('setIsApprover', true)
            commit('setIsNotApprover', false)

        }
        return response
    },
    async storeLoggedUser({ commit }, payload) {

        let user = payload.user;
        let approvers = payload.approvers;

        const response = await axios.get(`login/${user.userId}`, {
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
            commit('setToken', user.token);
            commit('setApprovers', encApprover);
            commit('setApprover', user.task)

            let resCode = "0";

            return resCode;
        } else {
            let resCode = '1';
            return resCode;
        }

    },

    async userLogout({ commit }) {
        // const token = localStorage.getItem('token')

        // const decToken = CryptoJs.enc.Base64.parse(token).toString(CryptoJs.enc.Utf8);

        // const bytes = CryptoJs.AES.decrypt(decToken, 'SECRET').toString(CryptoJs.enc.Utf8);

        // const decryptedToken = bytes;

        // const response = await axios.get(`/logout?token=${decryptedToken}`, {
        //     headers: {
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Accept": 'application/json'
        //         }
        //     }
        // })
        let response = "";

        commit('setToken', null);
        commit('setRequestor', {});
        commit('setRequest', {})
        sessionStorage.removeItem('kai-tono')
        sessionStorage.removeItem('to-hu');
        sessionStorage.removeItem('request');

        if (!sessionStorage.getItem('to-hu')) {

            response = "http://localhost:61746/mlhuillier-philippines-online-request";

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
import axios from "@/helper/axios";
import CryptoJs from 'crypto-js';
import store from "..";


const state = {
    token: sessionStorage.getItem('to-hu') ? sessionStorage.getItem('to-hu') : null, // token
    request: sessionStorage.getItem('request') ? (sessionStorage.getItem('request')) : {},
    requestor: sessionStorage.getItem('kai-tono') ? (sessionStorage.getItem('kai-tono')) : {}, //requestor
    message: sessionStorage.getItem('message') ? sessionStorage.getItem('message') : '',
    approvers: sessionStorage.getItem('kai-wha-kaae') ? sessionStorage.getItem('kai-wha-kaae') : {}, // approvers
    isNotApprover: null,
    isApprover: sessionStorage.getItem('umg-uny-azi') ? sessionStorage.getItem('umg-uny-azi') : null,
    approver: sessionStorage.getItem('wha-ka-ae') ? sessionStorage.getItem('wha-ka-ae') : '',
    email: sessionStorage.getItem('īmēra') ? sessionStorage.getItem('īmēra') : '',
    approverEmail: sessionStorage.getItem('wha-ka-īmēra') ? sessionStorage.getItem('wha-ka-īmēra'): ''

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
    getEmail: state => state.email,
    getApproversEmail: state => state.approverEmail,
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
    setEmail: (state, email) => (state.email = email),
    setApproversEmail: (state, approverEmail) => (state.approverEmail = approverEmail)
}

const actions = {

    async getMaxIdCash({ commit }, payload) {
        let headers = {
            "accept": "application/json",
            "Content-Type": "application/json",
            "x-access-token": payload.auth
        }
        const response = await axios.get('/getMaxId', {
            headers: headers
        })

        commit('setToken', payload.auth)
        // console.log('dsfs',response);
        return response
    },

    async storeLoggedUser({ commit }, payload) {

        let user = payload.user;
        let approvers = payload.approvers;
        console.log(payload);

        const response = await axios.post(`login`, { userId: user.userId, branch: user.bedrnm, resId: user.resId, zone: user.zonecode, jobTitle: user.jobTitle }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            }
        })
        if (response.data.token && response.data.email) {

            const getEmailRes = await store.dispatch('getAllApproverEmail', { approvers: approvers, zone: user.zonecode,  jobTitle: user.jobTitle, token: response.data.token });

            if (getEmailRes.resCode == 0) {

                if (user.jobTitle == 'TELLER' || user.jobTitle == 'BM' || user.jobTitle == 'ABM' ||
                    user.jobTitle == 'BM/BOSMAN' || user.jobTitle == 'LPTL/BM/LPT/BOSMAN' || user.jobTitle == 'LPT/BM-A/BOSMAN' ||
                    user.jobTitle == 'ASST. BM' || user.jobTitle == 'LPT/BM-R' || user.jobTitle == 'LPT-A/BOSMAN' ||
                    user.jobTitle == 'BRANCH STAFF' || user.jobTitle == 'ABM/BOSMAN' || user.jobTitle == 'LPT/BM-R/BOSMAN' ||
                    user.jobTitle == 'LPT-A' || user.jobTitle == 'ABM/LPT-A/BOSMAN' || user.jobTitle == 'ABM/LPT-A') {
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

                const cipherEmail = CryptoJs.AES.encrypt(JSON.stringify(response.data.email), 'BoJunYiXiaoShiZhenDe');

                const encEmail = CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(cipherEmail));

                sessionStorage.setItem('īmēra', encEmail);// email
                sessionStorage.setItem('kai-tono', encData); // requestor
                sessionStorage.setItem('to-hu', response.data.token);// token
                sessionStorage.setItem('kai-wha-kaae', encApprover); // approvers
                sessionStorage.setItem('wha-ka-ae', user.jobTitle)

                commit('setRequestor', encData);
                commit('setToken', response.data.token);
                commit('setApprovers', encApprover);
                commit('setApprover', user.jobTitle)
                commit('setEmail', encEmail);

                let resCode = "0";

                return { resCode: resCode, approvers: approvers };
            }else{
    
                return { resCode: getEmailRes.resCode,  message: getEmailRes.message, message2: getEmailRes.message2  };
            }



        } else {
            let resCode = response.data.resCode;

            return { resCode: resCode, message: response.data.message };
        }

    },
    async getAllApproverEmail({ commit }, payload) {

        let approvers = payload.approvers
        let zone = payload.zone
        let jobTitle = payload.jobTitle
        let token = payload.token

        const response = await axios.post(`getAllApproversEmail`, { approvers: approvers, zone: zone, jobTitle: jobTitle }, {

            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json',
                "x-access-token": token
            }
        })

        if (response.data.resCode == 0) {

            const cipherApprover = CryptoJs.AES.encrypt(JSON.stringify(response.data.result), 'BoJunYiXiaoShiZhenDe');
            const encApprover = CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(cipherApprover));

            sessionStorage.setItem('wha-ka-īmēra', encApprover); // approversemail

            commit('setApproversEmail', encApprover);

            return response.data

        }else{
            return response.data
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
            // response = "http://10.0.10.44/OnlineRequestSystem/mlhuillier-philippines-online-request";


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
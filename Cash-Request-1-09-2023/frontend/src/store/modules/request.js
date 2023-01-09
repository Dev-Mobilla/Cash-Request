import axios from "@/helper/axios";
import CryptoJs from 'crypto-js';


const state = {
    requestsByEmailCash: [],
    requestsByEmailRevolving: [],
    requestByControlNoCash: [],
    requestByControlNoRevolving: [],
    loading: '',
    allRequestForApprovalCash: [],
    allRequestForApprovalRevolving: [],
    token: sessionStorage.getItem('to-hu') ? sessionStorage.getItem('to-hu') : null, // token
}

const getters = {
    getRequestsByEmailCash: state => state.requestsByEmailCash,
    getRequestsByEmailRevolving: state => state.requestsByEmailRevolving,
    getRequestByControlNoCash: state => state.requestByControlNoCash,
    getRequestByControlNoRevolving: state => state.requestByControlNoRevolving,
    getLoading: state => state.loading,
    getAllRequestForApprovalCash: state => state.allRequestForApprovalCash,
    getAllRequestForApprovalRevolving: state => state.allRequestForApprovalRevolving
}

const mutations = {
    setRequestsByEmail: (state, requestsByEmailCash) => (state.requestsByEmailCash = requestsByEmailCash),
    setRequestsByEmailRevolving: (state, requestsByEmailRevolving) => (state.requestsByEmailRevolving = requestsByEmailRevolving),
    setRequestByControlNoCash: (state, requestByControlNoCash) => (state.requestByControlNoCash = requestByControlNoCash),
    setRequestByControlNoRf: (state, requestByControlNoRevolving) => (state.requestByControlNoRevolving = requestByControlNoRevolving),
    setLoading: (state, loading) => (state.loading = loading),
    setAllRequestForApprovalCash: (state, allRequestForApprovalCash) => (state.allRequestForApprovalCash = allRequestForApprovalCash),
    setAllRequestForApprovalRevolving: (state, allRequestForApprovalRevolving) => (state.allRequestForApprovalRevolving = allRequestForApprovalRevolving)
}

const actions = {

    // CASH ADVANCE
    async getAllRequestsByIdnumberCash({ commit }, payload) {
        const response = await axios.post(`/getAllRequestsCa/`, { idNumber: payload.idNumber, status: payload.status }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json',
                "x-access-token": state.token
            }
        })
        // console.log(response);
        commit('setRequestsByEmail', response.data)
        return response
        // if (!response.data.length == 0) {
        //     return response;
        // } else {
        //     return response
        // }
    },
    async getAllRequestsByIdnumberRf({ commit }, payload) {
        const response = await axios.post(`/getAllRequestsRf`, { idNumber: payload.idNumber, status: payload.status }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json',
                "x-access-token": state.token
            }
        })
        // console.log(response);
        if (!response.data.length == 0) {
            commit('setRequestsByEmailRevolving', response.data)
            return response;
        } else {
            return response
        }
    },
    async getRequestByControlNoRf({ commit }, payload) {
        const response = await axios.post(`/getRequestByControlNoRf`, { controlNo: payload.controlNo }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json',
                "x-access-token": state.token
            }
        });
        commit('setRequestByControlNoRf', response.data.request)
        return response;
        // if (!response.data.request.length == 0) {
        //     commit('setRequestByControlNoRf', response.data)
        //     return response;
        // } else {
        //     return response
        // }
    },
    async getRequestByControlNoCash({ commit }, payload) {

        const response = await axios.post(`/getRequestByControlNoCash`, { controlNo: payload.controlNo }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json',
                "x-access-token": state.token
            }
        });
        commit('setRequestByControlNoCash', response.data.request)
        return response
        // if (!response.data.request.length == 0) {
        //     commit('setRequestByControlNoCash', response.data)
        //     return response
        // } else {
        //     return response
        // }
    },
    async ApprovalResponse({ commit }, payload) {
        console.log(payload);

        if (payload.requestType === "cashAdvance") {
            const response = await axios.post(`/requestStatus/${payload.controlNo}/${payload.approver}`,
                {
                    comment: payload.comment,
                    response: payload.response
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": 'application/json',
                        "x-access-token": state.token
                    }
                })
            console.log(response);
            return response

        } else if (payload.requestType === "revolvingFund") {
            const response = await axios.post(`/rfRequestFlow/${payload.controlNo}/${payload.approver}`,
                {
                    comment: payload.comment,
                    response: payload.response
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": 'application/json',
                        "x-access-token": state.token
                    }
                })
            return response
        }
        commit('setLoading', false)
        // return response
    },
    async getApprovalRequest({ commit }, payload) {

        const decControlNo = CryptoJs.enc.Base64.parse(payload.controlNo).toString(CryptoJs.enc.Utf8);

        const ControlNobytes = CryptoJs.AES.decrypt(decControlNo, 'SECRET').toString(CryptoJs.enc.Utf8);

        if (ControlNobytes.includes('CA-')) {
            const responseCash = await axios.post(`getRequestByControlNoCash`, { controlNo: ControlNobytes }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                    "x-access-token": state.token
                }
            })
            if (!responseCash.data.length == 0) {
                commit('setRequestByControlNoCash', responseCash.data)
                return responseCash.data.rows
            } else {
                return responseCash.data.rows
            }

        } else if (ControlNobytes.includes('RF-')) {
            const responseRf = await axios.post(`/getRequestByControlNoRf`, { controlNo: ControlNobytes }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                    "x-access-token": state.token
                }
            });
            if (!responseRf.data.request.length == 0) {
                commit('setRequestByControlNoRf', responseRf.data)
                return responseRf.data.request;
            } else {
                return responseRf.data.request
            }
        }

    },
    async getAllRequestsForApprovalCash({ commit }, payload) {
        const response = await axios.post(`/getAllRequestsForApprovalCash`,
            {
                status: payload.status,
                approver: payload.approver,
                fullname: payload.fullname
            }, {

            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json',
                "x-access-token": state.token
            }
        })
        commit('setAllRequestForApprovalCash', response.data.request)
        //     return response.data
        // }
        return response


    },
    async getAllRequestsForApprovalRevolving({ commit }, payload) {

        const response = await axios.post(`/getAllRequestsForApprovalRevolving`,
            {
                status: payload.status,
                approver: payload.approver,
                fullname: payload.fullname
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                    "x-access-token": state.token
                }
            })


        // if (!response.data.rows.length == 0) {
        commit('setAllRequestForApprovalRevolving', response.data.request)
        //     return response.data
        // }
        return response


    },
    // async CancelCashRequest({ commit }, payload) {
    //     console.log(commit);

    //     const response = await axios.post('/cancelCashRequest', { controlNo: payload.controlNo }, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": 'application/json'
    //         }
    //     })

    //     return response
    // },
    // async CancelRevRequest({ commit }, payload) {
    //     console.log(commit);

    //     const response = await axios.post('/cancelRevRequest', { controlNo: payload.controlNo }, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": 'application/json'
    //         }
    //     })

    //     return response
    // }

}

export default {
    state,
    getters,
    mutations,
    actions
}
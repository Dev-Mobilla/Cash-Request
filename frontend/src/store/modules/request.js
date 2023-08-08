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
    approvedRequestMonthCash: [],
    approvedRequestMonthRevolving: [],
    UpdateCashRequestDetailsByControlNo: [],
    UpdateRevolvingRequestDetailsByControlNo: [],
    CancelCashRequest: [],
    CancelRevRequest: [],
    token: sessionStorage.getItem('to-hu') ? sessionStorage.getItem('to-hu') : null, // token
}

const getters = {
    getRequestsByEmailCash: state => state.requestsByEmailCash,
    getRequestsByEmailRevolving: state => state.requestsByEmailRevolving,
    getRequestByControlNoCash: state => state.requestByControlNoCash,
    getRequestByControlNoRevolving: state => state.requestByControlNoRevolving,
    getLoading: state => state.loading,
    getAllRequestForApprovalCash: state => state.allRequestForApprovalCash,
    getAllRequestForApprovalRevolving: state => state.allRequestForApprovalRevolving,
    getApprovedRequestMonthCash: state => state.approvedRequestMonthCash,
    getApprovedRequestMonthRevolving: state => state.approvedRequestMonthRevolving,
    getUpdateCashRequestDetailsByControlNo: state => state.UpdateCashRequestDetailsByControlNo,
    getUpdateRevolvingRequestDetailsByControlNo: state => state.UpdateRevolvingRequestDetailsByControlNo,
    getCancelCashRequest: state => state.CancelCashRequest,
    getCancelRevRequest: state => state.CancelRevRequest,
}

const mutations = {
    setRequestsByEmail: (state, requestsByEmailCash) => (state.requestsByEmailCash = requestsByEmailCash),
    setRequestsByEmailRevolving: (state, requestsByEmailRevolving) => (state.requestsByEmailRevolving = requestsByEmailRevolving),
    setRequestByControlNoCash: (state, requestByControlNoCash) => (state.requestByControlNoCash = requestByControlNoCash),
    setRequestByControlNoRf: (state, requestByControlNoRevolving) => (state.requestByControlNoRevolving = requestByControlNoRevolving),
    setLoading: (state, loading) => (state.loading = loading),
    setAllRequestForApprovalCash: (state, allRequestForApprovalCash) => (state.allRequestForApprovalCash = allRequestForApprovalCash),
    setAllRequestForApprovalRevolving: (state, allRequestForApprovalRevolving) => (state.allRequestForApprovalRevolving = allRequestForApprovalRevolving),
    setApprovedRequestMonthCash: (state, approvedRequestMonthCash) => (state.approvedRequestMonthCash = approvedRequestMonthCash),
    setApprovedRequestMonthRevolving: (state, approvedRequestMonthRevolving) => (state.approvedRequestMonthRevolving = approvedRequestMonthRevolving),
    setUpdateCashRequestDetailsByControlNo: (state, UpdateCashRequestDetailsByControlNo) => (state.UpdateCashRequestDetailsByControlNo = UpdateCashRequestDetailsByControlNo),
    setUpdateRevolvingRequestDetailsByControlNo: (state, UpdateRevolvingRequestDetailsByControlNo) => (state.UpdateRevolvingRequestDetailsByControlNo = UpdateRevolvingRequestDetailsByControlNo),
    setCancelCashRequest: (state, CancelCashRequest) => (state.CancelCashRequest = CancelCashRequest),
    setCancelRevRequest: (state, CancelRevRequest) => (state.CancelRevRequest = CancelRevRequest),
}



const headers = {
    "Content-Type": "application/json",
    "Accept": 'application/json',
    "x-access-token": sessionStorage.getItem('to-hu')
}

const actions = {

    // CASH ADVANCE
    async getAllRequestsByIdnumberCash({ commit }, payload) {
        const response = await axios.post(`/getAllRequestsCa/`, { idNumber: payload.idNumber, status: payload.status, IsApprover: payload.IsApprover, token: sessionStorage.getItem('to-hu') }, {
            headers
        })
        commit('setRequestsByEmail', response.data)
        return response
    },
    async getAllRequestsByIdnumberRf({ commit }, payload) {
        const response = await axios.post(`/getAllRequestsRf`, { idNumber: payload.idNumber, status: payload.status, IsApprover: payload.IsApprover, token: sessionStorage.getItem('to-hu') }, {
            headers
        })
        if (!response.data.length == 0) {
            commit('setRequestsByEmailRevolving', response.data)
            return response;
        } else {
            return response
        }
    },
    async getRequestByControlNoRf({ commit }, payload) {
        const response = await axios.post(`/getRequestByControlNoRf`, { controlNo: payload.controlNo, token: sessionStorage.getItem('to-hu') }, {
            headers
        });
        commit('setRequestByControlNoRf', response.data.request)
        return response;
    },
    async getRequestByControlNoCash({ commit }, payload) {

        const response = await axios.post(`/getRequestByControlNoCash`, { controlNo: payload.controlNo, token: sessionStorage.getItem('to-hu') }, {
            headers
        });
        commit('setRequestByControlNoCash', response.data.request)
        return response
    },
    async ApprovalResponse({ commit }, payload) {

        if (payload.requestType === "cashAdvance") {
            const response = await axios.post(`/requestStatus/${payload.controlNo}/${payload.approver}`,
                {
                    comment: payload.comment,
                    response: payload.response,
                    duration: payload.duration,
                    token: sessionStorage.getItem('to-hu'),
                    next_approver_email: payload.nextApproverEmail,
                    approver_email: payload.approverEmail
                },
                {
                    headers
                })
            return response

        } else if (payload.requestType === "revolvingFund") {
            const response = await axios.post(`/rfRequestFlow/${payload.controlNo}/${payload.approver}`,
                {
                    comment: payload.comment,
                    response: payload.response,
                    duration: payload.duration,
                    token: sessionStorage.getItem('to-hu'),
                    next_approver_email: payload.nextApproverEmail,
                    approver_email: payload.approverEmail
                },
                {
                    headers
                })
            return response
        }
        commit('setLoading', false)
    },
    async getApprovalRequest({ commit }, payload) {

        const decControlNo = CryptoJs.enc.Base64.parse(payload.controlNo).toString(CryptoJs.enc.Utf8);

        const ControlNobytes = CryptoJs.AES.decrypt(decControlNo, 'SECRET').toString(CryptoJs.enc.Utf8);

        if (ControlNobytes.includes('CA-')) {
            const responseCash = await axios.post(`getRequestByControlNoCash`, { controlNo: ControlNobytes }, {
                headers
            })
            if (!responseCash.data.length == 0) {
                commit('setRequestByControlNoCash', responseCash.data)
                return responseCash.data.rows
            } else {
                return responseCash.data.rows
            }

        } else if (ControlNobytes.includes('RF-')) {
            const responseRf = await axios.post(`/getRequestByControlNoRf`, { controlNo: ControlNobytes, token: sessionStorage.getItem('to-hu') }, {
                headers
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
                fullname: payload.fullname,
                token: sessionStorage.getItem('to-hu')
            }, {

            headers
        })
        commit('setAllRequestForApprovalCash', response.data.request)

        return response


    },
    async getAllRequestsForApprovalRevolving({ commit }, payload) {

        const response = await axios.post(`/getAllRequestsForApprovalRevolving`,
            {
                status: payload.status,
                approver: payload.approver,
                fullname: payload.fullname,
                token: sessionStorage.getItem('to-hu')
            },
            {
                headers
            })

        commit('setAllRequestForApprovalRevolving', response.data.request)

        return response


    },
    getApprovedRequestMonthCash({ commit }, payload) {
        const response = axios.post('getApprovedRequestMonthCash',
            {
                fullname: payload.fullname,
                approver: payload.approver,
                status: payload.status,
                token: sessionStorage.getItem('to-hu')
            },
            {
                headers
            }
        )
        commit('setApprovedRequestMonthCash', response.data)

        return response
    },
    getApprovedRequestMonthRevolving({ commit }, payload) {
        const response = axios.post('getApprovedRequestMonthRevolving',
            {
                fullname: payload.fullname,
                approver: payload.approver,
                status: payload.status,
                token: sessionStorage.getItem('to-hu')
            },
            {
                headers
            }
        )
        commit('setApprovedRequestMonthRevolving', response.data)

        return response
    },

    async UpdateCashRequestDetailsByControlNo({ commit }, payload) {
        const response = await axios.post('updateCashRequestDetailsByControlNo',
            {
                amount: payload.amount,
                arrivalDate: payload.arrivalDate,
                departureDate: payload.departureDate,
                travelDate: payload.travelDate,
                purpose: payload.purpose,
                controlNo: payload.controlNo,
                token: sessionStorage.getItem('to-hu')
            },
            {
                headers
            }
        )
        commit('setUpdateCashRequestDetailsByControlNo', response.data)

        return response
    },
    async UpdateRevolvingRequestDetailsByControlNo({ commit }, payload) {
        const response = await axios.post('UpdateRevolvingRequestDetailsByControlNo',
            {
                period: {
                    month: payload.period.month,
                    year: payload.period.year
                },
                rfAllowance: payload.rfAllowance,
                pendingRf: payload.pendingRf,
                cashOnHand: payload.cashOnHand,
                transpo: payload.transpo,
                officeSupplies: payload.officeSupplies,
                meals: payload.meals,
                others: payload.others,
                total: payload.total,
                purpose: payload.purpose,
                controlNo: payload.controlNo,
                token: sessionStorage.getItem('to-hu')
            },
            {
                headers
            }
        )
        commit('setUpdateRevolvingRequestDetailsByControlNo', response.data)

        return response
    },
    async CancelCashRequest({ commit }, payload) {

        const response = await axios.post('/cancelCashRequest', { controlNo: payload.controlNo, duration: payload.duration }, {
            headers
        })
        commit('setCancelCashRequest', response.data)

        return response
    },
    async CancelRevRequest({ commit }, payload) {

        const response = await axios.post('/cancelRevRequest', { controlNo: payload.controlNo, duration: payload.duration }, {
            headers
        })
        commit('setCancelRevRequest', response.data)

        return response
    }

}

export default {
    state,
    getters,
    mutations,
    actions
}
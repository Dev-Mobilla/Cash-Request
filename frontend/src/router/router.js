import Vue from "vue";
import VueRouter from 'vue-router';

import CashAdvanceComponent from '../components/CreateRequest/CashAdvanceComponent.vue';
import RevolvingFundComponent from '../components/CreateRequest/RevolvingFundComponent.vue';
import CA_successComponent from '../components/Notification/CA_successComponent.vue';
import RF_successComponent from '../components/Notification/RF_successComponent.vue';
import NotFoundComponent from '../components/Notification/NotFound.vue';
import OpenRequest from '../components/OpenRequests/OpenRequest.vue';
import OpenRequestDetailsCash from '../components/OpenRequests/OpenRequestDetailsCash.vue';
import OpenRequestDetailsRevolving from '../components/OpenRequests/OpenRequestDetailsRevolving.vue';
import ConfirmationComponent from '../components/Confirmation/Confirmation.vue';
import ForApprovalDetailsCash from '../components/Approvers/ForApprovalDetailsCash.vue';
import ForApprovalDetailsRevolving from '../components/Approvers/ForApprovalDetailsRevolving.vue';
import CloseRequest from '../components/CloseRequest/CloseRequest.vue';
import CloseRequestDetailsCash from '../components/CloseRequest/CloseRequestDetailsCash.vue'
import CloseRequestDetailsRevolving from '../components/CloseRequest/CloseRequestDetailsRevolving.vue'
import RequestCancelled from '../components/Notification/RequestCancelled.vue';
import MainComponent from '../components/Public/Main.vue';
import SamplePdf from '../components/sample.vue';
import ErrorComponent from '../components/Public/ErrorComponent.vue';
import SuccesWthError from '../components/Public/SuccessWthError.vue'


import NavigationBar from '../views/NavigationBar.vue'

import store from "@/store";

Vue.use(VueRouter);


const routes = [
    {
        path: '/sample',
        name: 'PDF',
        component: SamplePdf,
    },
    {
        path: '/',
        name: 'MAIN',
        component: MainComponent,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('to-hu')) {

                if (from.fullPath == '/') {
                    router.push({ path: '/home/open-request' })

                } else {
                    router.push({ path: from.fullPath })
                }
            } else {
                next();
            }
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: NavigationBar,
        beforeEnter: async (to, from, next) => {
            console.log(Object.keys(to.query));
            if (!Object.keys(to.query).length == 0 && Object.keys(to.query)[0] == 'fullname') { // if not empty
                localStorage.setItem('success', false);

                if (!sessionStorage.getItem('to-hu') || sessionStorage.getItem('to-hu') === "undefined") { //no to-hu || undefined

                    const response = await store.dispatch('storeLoggedUser',
                        {
                            user: {
                                fullname: to.query.fullname,
                                userId: to.query.userId,
                                resId: to.query.resId,
                                jobTitle: to.query.jobTitle,
                                task: to.query.task,
                                zonecode: to.query.zonecode,
                                bedrnm: to.query.bedrnm,
                                area: to.query.area,
                                areaCode: to.query.areaCode,
                                region: to.query.region,
                                token: to.query.token
                            },
                            approvers: {
                                amName: to.query.amName,
                                amId: to.query.amId,
                                rmName: to.query.rmName,
                                rmId: to.query.rmId,
                                ramName: to.query.ramName,
                                ramId: to.query.ramId,
                                asstName: to.query.asstName,
                                asstId: to.query.asstId,
                                vpoName: to.query.vpoName,
                                vpoId: to.query.vpoId,
                            }
                        }
                    );

                    if (response.resCode == "0") {
                        let approver = response.approvers;

                        let approverRole = store.getters.getApprover;

                        if (approverRole == 'TELLER' || approverRole == 'BM' || approverRole == 'ABM' ||
                            approverRole == 'BM/BOSMAN' || approverRole == 'LPTL/BM/LPT/BOSMAN' || approverRole == 'LPT/BM-A/BOSMAN' ||
                            approverRole == 'ASST. BM' || approverRole == 'LPT/BM-R' || approverRole == 'LPT-A/BOSMAN' ||
                            approverRole == 'BRANCH STAFF' || approverRole == 'ABM/BOSMAN' || approverRole == 'LPT/BM-R/BOSMAN' ||
                            approverRole == 'LPT-A' || approverRole == 'ABM/LPT-A/BOSMAN' || approverRole == 'ABM/LPT-A'
                        ) {

                            if (approver.amName == "" || approver.rmName == "" || approver.ramName == "") {
                                sessionStorage.setItem('approvers', true)
                            } else {
                                sessionStorage.setItem('approvers', false)
                            }
                        } else if (approverRole == 'AREA MANAGER') {
                            if (approver.rmName == "" || approver.ramName == "") {
                                sessionStorage.setItem('approvers', true)
                            } else {
                                sessionStorage.setItem('approvers', false)
                            }
                        } else if (approverRole == 'REGIONAL MAN') {
                            if (approver.ramName == "") {
                                sessionStorage.setItem('approvers', true)
                            } else {
                                sessionStorage.setItem('approvers', false)
                            }
                        }
                        else {
                            sessionStorage.setItem('approvers', false)
                        }

                        next({ path: 'home/open-request' });
                        // window.location.reload()

                    } else {
                        sessionStorage.removeItem('to-hu');
                        setTimeout(() => {
                            router.push({ path: '/error-login', query: { message: response.message, message2: response.message2 } })
                            // window.location.href = "http://localhost:61746/mlhuillier-philippines-online-request"
                            // window.location.href = "http://10.0.10.44/OnlineRequestSystem/mlhuillier-philippines-online-request"
                            // window.location.href = "http://10.4.8.132/OnlineRequestSystem/mlhuillier-philippines-online-request"
                        }, 500);
                    }

                }
                else {

                    next();
                    // window.location.reload()
                }

            } else {
                if (!sessionStorage.getItem('to-hu') || sessionStorage.getItem('to-hu') === "undefined" || store.getters.auth == null) {
                    // window.location.href = "http://localhost:61746/mlhuillier-philippines-online-request"
                    window.location.href = "http://10.4.8.132/OnlineRequestSystem/mlhuillier-philippines-online-request"
                    // window.location.href = "http://10.0.10.44/OnlineRequestSystem/mlhuillier-philippines-online-request"
                }
                else {
                    setTimeout(() => {

                        next();

                    }, 200);
                }
            }

        },
        children: [
            {
                path: 'create-request/cash-advance',
                name: 'CASH ADVANCE',
                component: CashAdvanceComponent,
                beforeEnter: (to, from, next) => {
                    if (sessionStorage.getItem('to-hu') && sessionStorage.getItem('kai-tono')) {
                        next();
                    } else {
                        sessionStorage.removeItem('to-hu')
                        next({ path: '/' });
                    }
                },
            },
            {
                path: 'create-request/revolving-fund',
                name: 'REVOLVING FUND REQUEST',
                component: RevolvingFundComponent,
                beforeEnter: (to, from, next) => {
                    if (sessionStorage.getItem('to-hu') && sessionStorage.getItem('kai-tono')) {
                        next();
                    } else {
                        sessionStorage.removeItem('to-hu')
                        next({ path: '/' });
                    }
                },
            },
            {
                path: 'ca_success',
                name: 'CASH ADVANCE REQUEST RESULTS',
                component: CA_successComponent,
                props: true,
                beforeEnter: (to, from, next) => {
                    if (localStorage.getItem('success')) {
                        next();
                    } else {
                        next({ path: from.fullPath });
                    }
                }
            },
            {
                path: 'rf_success',
                name: 'REVOLVING FUND REQUEST RESULTS',
                component: RF_successComponent,
                props: true,
                beforeEnter: (to, from, next) => {
                    if (localStorage.getItem('success')) {
                        next();
                    } else {
                        next({ path: from.fullPath });
                    }
                }
            },
            {
                path: 'open-request',
                name: 'OPEN REQUEST',
                component: OpenRequest,
                beforeEnter: (to, from, next) => {
                    if (sessionStorage.getItem('to-hu') && sessionStorage.getItem('kai-tono')) {
                        next();
                    } else {
                        sessionStorage.removeItem('to-hu')
                        next({ path: '/' });
                    }
                }
            },
            {
                path: 'open-request/cash-advance',
                name: 'OPEN REQUEST BY CONTROL NO CASH ADVANCE',
                component: OpenRequestDetailsCash,
                beforeEnter: (to, from, next) => {
                    if (sessionStorage.getItem('to-hu') && sessionStorage.getItem('kai-tono')) {
                        next();
                    } else if (store.getters.auth == null) {
                        // sessionStorage.removeItem('to-hu')
                        next({ path: '/' });
                    }
                },
            },
            {
                path: 'open-request/revolving-fund',
                name: 'OPEN REQUEST BY CONTROL NO REVOVLING FUND',
                component: OpenRequestDetailsRevolving,
                beforeEnter: (to, from, next) => {
                    if (sessionStorage.getItem('to-hu') && sessionStorage.getItem('kai-tono')) {
                        next();
                    } else {
                        sessionStorage.removeItem('to-hu')
                        next({ path: '/' });
                    }
                },
            },
            {
                path: 'open-request/cash-advance/for-approval',
                name: 'OPEN REQUEST BY CONTROL NO CASH ADVANCE FOR APPROVAL',
                component: ForApprovalDetailsCash,
                beforeEnter: (to, from, next) => {
                    if (sessionStorage.getItem('to-hu') && sessionStorage.getItem('kai-tono')) {
                        next();
                    } else {
                        sessionStorage.removeItem('to-hu')
                        next({ path: '/' });
                    }
                },
            },
            {
                path: 'open-request/revolving-fund/for-approval',
                name: 'OPEN REQUEST BY CONTROL NO REVOVLING FUND FOR APPROVAL',
                component: ForApprovalDetailsRevolving,
                beforeEnter: (to, from, next) => {
                    if (sessionStorage.getItem('to-hu') && sessionStorage.getItem('kai-tono')) {
                        next();
                    } else {
                        sessionStorage.removeItem('to-hu')
                        next({ path: '/' });
                    }
                },
            },
            {
                path: 'close-request',
                name: 'CLOSE REQUEST',
                component: CloseRequest,
                beforeEnter: (to, from, next) => {
                    if (sessionStorage.getItem('to-hu') && sessionStorage.getItem('kai-tono')) {
                        next();
                    } else {
                        sessionStorage.removeItem('to-hu')
                        next({ path: '/' });
                    }
                }
            },
            {
                path: 'close-request/cash-advance',
                name: 'CLOSE REQUEST BY CONTROL NO CASH ADVANCE',
                component: CloseRequestDetailsCash,
                beforeEnter: (to, from, next) => {
                    if (sessionStorage.getItem('to-hu') && sessionStorage.getItem('kai-tono')) {
                        next();
                    } else {
                        sessionStorage.removeItem('to-hu')
                        next({ path: '/' });
                    }
                },
            },
            {
                path: 'close-request/revolving-fund',
                name: 'CLOSE REQUEST BY CONTROL NO REVOVLING FUND',
                component: CloseRequestDetailsRevolving,
                beforeEnter: (to, from, next) => {
                    if (sessionStorage.getItem('to-hu') && sessionStorage.getItem('kai-tono')) {
                        next();
                    } else {
                        sessionStorage.removeItem('to-hu')
                        next({ path: '/' });
                    }
                },
            },
        ]
    },
    {
        path: '/cancelled/:controlNo',
        name: 'Cancelled',
        component: RequestCancelled,
        beforeEnter: (to, from, next) => {
            if (to.params.controlNo.match('CA-') || to.params.controlNo.match('RF-')) {
                next();
            } else {
                next({ name: 'Not Found' });
            }
        }
    },
    {
        path: '/confirmation',
        name: 'CONFIRMATION',
        component: ConfirmationComponent,
    },
    {
        path: '*',
        name: 'Not Found',
        component: NotFoundComponent
    },
    {
        path: '/error',
        name: 'Error',
        component: ErrorComponent,
        beforeEnter: (to, from, next) => {
            if (sessionStorage.getItem('to-hu') && sessionStorage.getItem('kai-tono')) {
                next();
            } else {
                sessionStorage.removeItem('to-hu')
                next({ path: '/' });
            }
        },
    },
    {
        path: '/success-error',
        name: 'Success Error',
        component: SuccesWthError,
        beforeEnter: (to, from, next) => {
            if (sessionStorage.getItem('to-hu') && sessionStorage.getItem('kai-tono')) {
                next();
            } else {
                sessionStorage.removeItem('to-hu')
                next({ path: '/' });
            }
        },
    },
    {
        path: '/error-login',
        name: 'Error-Login',
        component: ErrorComponent,
    },
];

const router = new VueRouter({
    // mode:"history",
    base: '/',
    routes
})

export default router
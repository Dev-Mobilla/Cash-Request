import Vue from "vue";
import VueRouter from 'vue-router';

import CashAdvanceComponent from '../components/CreateRequest/CashAdvanceComponent.vue';
import RevolvingFundComponent from '../components/CreateRequest/RevolvingFundComponent.vue';
import CA_successComponent from '../components/Notification/CA_successComponent.vue';
import RF_successComponent from '../components/Notification/RF_successComponent.vue';
import AlertComponent from '../components/Notification/Alert.vue';
import NotifComponent from '../components/Notification/Notif.vue';
import CommentComponent from '../components/Comment.vue';
import NotFoundComponent from '../components/Notification/NotFound.vue';
import LoginComponent from '../components/Public/LoginComponent.vue';
import OpenRequest from '../components/OpenRequests/OpenRequest.vue';
import OpenRequestDetailsCash from '../components/OpenRequests/OpenRequestDetailsCash.vue';
import OpenRequestDetailsRevolving from '../components/OpenRequests/OpenRequestDetailsRevolving.vue';
import ConfirmationComponent from '../components/Confirmation/Confirmation.vue';
import ApprovalComponent from '../components/Approval.vue';
import ForApprovalDetailsCash from '../components/Approvers/ForApprovalDetailsCash.vue';
import ForApprovalDetailsRevolving from '../components/Approvers/ForApprovalDetailsRevolving.vue';
import CloseRequest from '../components/CloseRequest/CloseRequest.vue';
import CloseRequestDetailsCash from '../components/CloseRequest/CloseRequestDetailsCash.vue'
import CloseRequestDetailsRevolving from '../components/CloseRequest/CloseRequestDetailsRevolving.vue'
import RequestCancelled from '../components/Notification/RequestCancelled.vue'
// import MLPinLogin from '../components/Public/MLPinLogin.vue'


import NavigationBar from '../views/NavigationBar.vue'

import store from "@/store";

Vue.use(VueRouter);


const routes = [
    // {
    //     path:'/',
    //     name:'MLPIN LOGIN',
    //     component: MLPinLogin
    // },
    {
        path: '/',
        name: 'LOGIN',
        component: LoginComponent,
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
            console.log(!Object.keys(to.query).length == 0);
            if (!Object.keys(to.query).length == 0) {
                localStorage.setItem('success', false);
                console.log('dsfdg');

                if (!sessionStorage.getItem('to-hu') || sessionStorage.getItem('to-hu') === "undefined") { //no to-hu || undefined
                    console.log('nimeroy');
                    // if (to.query.user) { //user is not undefined
                    // sessionStorage.setItem('to-hu', JSON.stringify(to.query.to-hu))
                    console.log(to.query);

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
                                region: to.query.region,
                                token: to.query.token
                            },
                            approvers: {
                                amName: to.query.amName,
                                rmName: to.query.rmName,
                                ramName: to.query.ramName,
                                asstName: to.query.asstName,
                                vpoName: to.query.vpoName,
                            }
                        }
                    );
                    console.log(response);
                    if (response == "0") {
                        next({ path: '/home' });
                        window.location.reload()
                    } else {
                        sessionStorage.removeItem('to-hu');
                        setTimeout(() => {
                            window.location.href = "http://localhost:61746/mlhuillier-philippines-online-request"
                        }, 300);
                    }

                }
                else {
                    console.log('dsfsdg');
                    next()
                }

            }else{
                if (!sessionStorage.getItem('to-hu') || sessionStorage.getItem('to-hu') === "undefined") {

                    window.location.href = "http://localhost:61746/mlhuillier-philippines-online-request"
                    
                } else {
                    next();
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
                    } else {
                        sessionStorage.removeItem('to-hu')
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
        path: '/alert/:controlNo',
        name: 'Alert',
        component: AlertComponent,
        beforeEnter: (to, from, next) => {
            if (to.params.controlNo.match('CA-') || to.params.controlNo.match('RF-')) {
                next();
            } else {
                next({ name: 'Not Found' });
            }
        }
    },
    {
        path: '/response/:controlNo',
        name: 'Notif',
        component: NotifComponent,
        beforeEnter: (to, from, next) => {
            if (to.params.controlNo.match('CA-') || to.params.controlNo.match('RF-')) {
                next();
            } else {
                next({ name: 'Not Found' });
            }
        }
    },
    {
        path: '/alert-comment/:controlNo',
        name: 'Comment',
        component: CommentComponent,
        beforeEnter: (to, from, next) => {
            if (to.params.controlNo.match('CA-') || to.params.controlNo.match('RF-')) {
                next();
            } else {
                next({ name: 'Not Found' });
            }
        }
    },
    {
        path: '/request-approval',
        name: 'Approval',
        component: ApprovalComponent,
        beforeEnter: (to, from, next) => {

            const checkQuery = Object.keys(to.query)

            if (checkQuery.length === 0) {
                next({ name: 'Not Found' })
            }
            else {
                next()
            }
        }
    },
    {
        path: '/confirmation',
        name: 'CONFIRMATION',
        component: ConfirmationComponent,
        // beforeEnter: (to, from, next) => {
        //     if (sessionStorage.getItem('to-hu') && sessionStorage.getItem('kai-tono')) {
        //         next();
        //     } else {
        //         sessionStorage.removeItem('to-hu')
        //         next({ path: '/' });
        //     }
        // },
    },

    // {
    //     path: '/home',
    //     name: 'Main',
    //     component: MainComponent,
    //     children: [
    //         {
    //             path: 'menu',
    //             name: 'BRANCH REQUEST',
    //             component: MenuComponent,
    //             beforeEnter: async (to, from, next) => {
    //                 localStorage.setItem('success', false);
    //                 if (!localStorage.getItem('to-hu')) { //no token
    //                     if (to.query.kai-whi-whi) { //kai-whi-whi is not undefined
    //                         localStorage.setItem('token', JSON.stringify(to.query.token))
    //                         const response = await store.dispatch('storeLoggedUser',
    //                             {
    //                                 user: to.query.user,
    //                                 token: to.query.token
    //                             }
    //                         );
    //                         if (response.data.rows.length === 0) {
    //                             localStorage.removeItem('token');
    //                             setTimeout(() => {
    //                                 router.push({ path: '/' })
    //                                 router.go();
    //                             }, 300);

    //                         } else {
    //                             next();
    //                         }
    //                     } else {
    //                         localStorage.removeItem('token');
    //                         router.push({ path: '/' })
    //                         router.go()
    //                     }

    //                 }
    //                 else {
    //                     next()

    //                 }

    //             },
    //         },
    // {
    //     path: '/cash-advance',
    //     name: 'CASH ADVANCE',
    //     component: CashAdvanceComponent,
    // beforeEnter: (to, from, next) => {
    //     if (localStorage.getItem('token') && localStorage.getItem('user')) {
    //         next();
    //     } else {
    //         localStorage.removeItem('token')
    //         next({ path: '/' });
    //     }
    // }

    // },
    //         {
    //             path: 'revolving-fund',
    //             name: 'REVOLVING FUND REQUEST',
    //             component: RevolvingFundComponent,
    //             beforeEnter: (to, from, next) => {
    //                 if (localStorage.getItem('token')) {
    //                     next();
    //                 } else {
    //                     localStorage.removeItem('token')
    //                     next({ path: '/' });
    //                 }
    //             }
    //         },
    // {
    //     path: '/ca_success',
    //     name: 'CASH ADVANCE REQUEST RESULTS',
    //     component: CA_successComponent,
    //     props: true,
    //     beforeEnter: (to, from, next) => {
    //         if (JSON.parse(localStorage.getItem('success'))) {
    //             next();
    //         } else {
    //             next({ path: from.fullPath });
    //         }
    //     }
    // },
    // {
    //     path: '/rf_success',
    //     name: 'REVOLVING FUND REQUEST RESULTS',
    //     component: RF_successComponent,
    //     props: true,
    //     beforeEnter: (to, from, next) => {
    //         if (JSON.parse(localStorage.getItem('success'))) {
    //             next();
    //         } else {
    //             next({ path: from.fullPath });
    //         }
    //     }
    // },
    //     ],

    // },
    {
        path: '*',
        name: 'Not Found',
        component: NotFoundComponent
    },
];

const router = new VueRouter({
    // mode:"history",
    base: '/',
    routes
})

export default router
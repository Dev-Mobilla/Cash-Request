<template>
    <v-container>
        <v-card width="55%" class="mx-auto pb-3 mt-10" style="border-left: 13px solid red;border-radius:6px 6px 0px 0px">
            <div class="ml-5 mb-3 pt-5">
                <p style="font-size: 30px;font-weight: 500;">
                    Request <span style="text-transform:capitalize;">{{ $router.currentRoute.query.status }}</span>
                </p>
                <p style="color: #616161;">This request has already been cancelled.</p>
            </div>
        </v-card>
        <div style="width:14%" class="mx-auto mt-7">
            <v-btn to="/home/open-request" text plain color="red darken-3" class="white--text pt-5 pb-5"
                style="font-size: 18px;">
                Back Home
            </v-btn>
        </div>
    </v-container>
</template>

<script>
export default {
    name: 'RequestCancelled',
    data() {
        return {
            year: new Date().getFullYear(),
        }
    }
}
</script>
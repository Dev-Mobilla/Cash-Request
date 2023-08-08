<template>
    <v-dialog v-model="dialogSuccess" width="450" persistent hide-overlay transition="slide-y-transition" style="position: absolute;">
        <v-card class="pt-1 pb-1" style="border-left: 5px solid green;">
            <div style="display: flex;align-items: center;margin: 0px 12px;">
                <div>
                    <v-icon color="green" size="55" left>mdi-check-circle-outline</v-icon>
                </div>
                <div style="display: flex;flex-direction: column;margin-top: 15px;">
                    <h2>Success</h2>
                    <p>Your changes have been saved.</p>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['isSuccess'],
    data() {
        return {
            // dialogSuccess: isSuccess
        }
    },
    computed: {
        dialogSuccess() {
            return this.isSuccess
        }
    }
}
</script>
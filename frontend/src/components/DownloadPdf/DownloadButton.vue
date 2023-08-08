<template>
    <v-container class="m-auto mb-1 mt-2" style="max-width: 85%;">
        <v-row>
            <v-col cols="12" md="12" sm="12" align="end">
                <v-btn color="red darken-4" class="white--text" max-width="150" @click="downloadAsPdf">
                    <!-- <v-icon class="mr-1">mdi-file-pdf-box</v-icon> -->
                    <span style="font-size: 12px;">download as pdf</span>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import html2pdf from 'html2pdf.js';

export default {
    name: 'DownloadButton',
    props: ['name', 'content'],
    data() {
        return {

        }
    },
    methods: {
        downloadAsPdf(){
            console.log(this.content);
            let ContentBody =  this.content.downloadContentVue.$el

            let options = {
                margin: 0,
                filename: `${this.name}.pdf`,
                // html2canvas:  { scale: 2 },
                jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
            }

           setTimeout(() => {

            ContentBody.removeAttribute('hidden')
            console.log(ContentBody);
            html2pdf(ContentBody, options)

           }, 350);
            setTimeout(() => {
                ContentBody.setAttribute('hidden', 'hidden')
            }, 355);
        }
    }
}
</script>
<style>
    .myClass{
        display: block;
    }
</style>
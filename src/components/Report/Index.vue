<template>
  <div id="wrapper">
    <sidebar-component></sidebar-component>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <navbar-component></navbar-component>
        <div class="container-fluid">
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">
                Cetak Report Transaksi
              </h6>
            </div>
            <div class="card-body">
              <form class="form-group" @submit.prevent="tampil">
                  <label>Bulan</label>
                  <select class="form-control" v-model="report.bulan">
                      <option value="01">Januari</option>
                      <option value="02">Februari</option>
                      <option value="03">Maret</option>
                      <option value="04">April</option>
                      <option value="05">Mei</option>
                      <option value="06">Juni</option>
                      <option value="07">Juli</option>
                      <option value="08">Agustus</option>
                      <option value="09">September</option>
                      <option value="10">Oktober</option>
                      <option value="11">November</option>
                      <option value="12">Desember</option>

                  </select>
                  <label >Tahun</label>
                  <select class="form-control" v-model="report.tahun">
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                  </select>
                  <button type="submit" class="btn btn-sm btn-info">Tampilkan</button>
              </form>
              <div class="report">
                  <VueHtml2pdf
                    :show-layout="true"
                    :float-layout="false"
                    :enable-download="false"
                    :preview-modal="true"
                    :paginate-elements-by-height="1440"
                    filename="report_transaksi"
                    :pdf-quality="2"
                    :manual-pagination="false"
                    pdf-format="a4"
                    pdf-orientation="portrait"
                    pdf-content-width="800px"
                    ref="html2pdf"
                    >
                    <section slot="pdf-content">
                        <h1>Report Transaksi</h1>
                        <h3>Laundry Online</h3>
                        <h5>Jalan Danau Ranau No. 1, Malang</h5>
                        <table>
                          <thead>
                            <tr>
                              <th>No. </th>
                              <th>Member</th>
                              <th>Tanggal Transaksi</th>
                              <th>Tanggal Pembayaran</th>
                              <th>Nominal Pembayaran</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(t, index) in transaksi" :key="index">
                              <td>{{ index + 1 }}</td>
                              <td>{{ t.nama }}</td>
                              <td>{{ t.tgl_order | moment("DD/MM/YYYY") }}</td>
                              <td v-if="t.tgl_bayar === null">-</td>
                                      <td v-else>
                                        {{ t.tgl_bayar | moment("DD/MM/YYYY") }}
                                      </td>
                              <td v-if="t.total === null">Rp.0</td>
                                      <td v-else>
                                        {{ t.total}}
                                      </td>
                            </tr>
                          </tbody>
                        </table>
                    </section> </VueHtml2pdf> <button type="button" @click="generateReport"> Buat Report</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
h1,h3,h5 { text-align : center; }
.report{
  width: 800px;
  margin: 20px auto 0 auto          ;
}
table {
  margin: 25px 20px;
  border-collapse: collapse;
  width: 760px;
}
thead tr {
  background-color: #5465ff;
  color: floralwhite;
  text-align: left;
}
th, td {
  padding: 5px;
}
tbody tr{
  border-bottom: 1px solid #eee;
}
tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}
tbody tr:last-of-type{
  border-bottom: 2px solid #0010a3;
}
button{
  width: 120px;
  height: 25px;
  margin-top: 20px;
  margin-left: 20px;
  border: none;
  background-color: #788bff;
  color: white;
  border-radius: 3px;
}
button:hover{
  background-color: #335fff;
}
button:active{
  background-color: #0028b8;
}
</style>
<script>

export default {
data() {
  return{
    report : {},
    transaksi : {}
  }
},
created(){
  var date = new Date()
  this.report.tahun = date.getFullYear()
  this.report.bulan = ("0" + (date.getMonth() + 1)).slice(-2)
},
methods :{
  tampil() {
    this.axios.post('http://localhost/lat_laundry/public/api/report', this.report, {headers : {'Authorization' : 'Bearer' + this.$store.state.token }})
    .then(res => {
      this.transaksi = res.data
    })
    .catch(err => console.log(err ))
  },
  generateReport() {

      this.$refs.html2pdf.generatePdf()
  }
},
}
</script>
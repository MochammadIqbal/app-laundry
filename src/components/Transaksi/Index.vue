<template>
  <div id="wrapper">
    <sidebar-component></sidebar-component>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <navbar-component></navbar-component>
        <div class="container-fluid">
          <h1 class="h3 mb-4 text-gray-800">Data Transaksi</h1>
          <div class="row">
            <div class="col-lg-12">
              <div class="card shadow mb-4">
                <div class="card-body">
                  <div class="table-responsive">
                    <router-link
                      to="/transaksi/tambah"
                      class="btn btn-info btn-icon-split"
                    >
                      <span class="icon text-white-50">
                        <i class="fas fa-plus"></i>
                      </span>

                      <span class="text">Tambah</span>
                    </router-link>
                    <table
                      class="table table bordered mt-3"
                      width="100%"
                      cellspacing="0"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nama Member</th>
                          <th>Tanggal Order</th>
                          <th>Status</th>
                          <th>Aksi</th>
                        </tr>x
                      </thead>
                      <tbody>
                        <tr v-for="(t, index) in transaksi" :key="index">
                          <td>{{ index + 1 }}</td>
                          <td>{{ t.nama }}</td>
                          <td>{{ t.tgl_order | moment ("DD/MM/YYYY")}}</td>
                          <td>
                            <span v-if="t.status == 'baru'" class="badge bg-info text-light">baru</span>
                            <span v-if="t.status == 'proses'" class="badge bg-warning text-light">proses</span>
                            <span v-if="t.status == 'selesai'" class="badge bg-success text-light">selesai</span>
                            <span v-if="t.status == 'diambil'" class="badge bg-secondary text-light">diambil</span>
                          </td>
                          <td>
                            <router-link class="btn btn-success btn-circle mr-1" :to="{name: 'detailtransaksi', params : {id : t.id_transaksi}}"><i class="far fa-eye"></i></router-link>
                            <router-link class="btn btn-warning  btn-circle mr-1" :to="{name: 'edittransaksi', params : {id : t.id_transaksi}}"><i class="fas fa-pen"></i></router-link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer-component></footer-component>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            transaksi : {},
        }
    },
    created() {
      this.axios.get("http://localhost/lat_laundry/public/api/transaksi", {
        headers: { Authorization: "Bearer" + this.$store.state.token },
      })
      .then((res) => {
        this.transaksi = res.data;
      });

    },
    methods : {
        
    }
}
</script>
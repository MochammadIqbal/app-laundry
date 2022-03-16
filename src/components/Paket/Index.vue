<template>
  <div id="wrapper">
    <sidebar-component></sidebar-component>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <navbar-component></navbar-component>
        <div class="container-fluid">
          <h1 class="h3 mb-4 text-gray-800">Data Paket</h1>

          <div class="row">
            <div class="col-lg-12">
              <div class="card shadow mb-4">
                <div class="card body"></div>
                <div class="table-responsive">
                  <router-link
                    to="/paket/tambah"
                    class="btn btn-info btn-icon-split"
                  >
                    <span class="icon text-white-50">
                      <i class="fas fa-plus"></i>
                    </span>
                    <span class="text">Tambah Paket</span>
                  </router-link>
                  <table
                    class="table table-bordered mt-3"
                    width="100%"
                    cellspacing="0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Jenis</th>
                        <th>Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="p in paket" :key="p.id_paket">
                        <td>{{ p.id_paket }}</td>
                        <td>{{ p.jenis }}</td>
                        <td>{{ p.harga }}</td>
                        <td>
                          <router-link
                            :to="{
                              name: 'detailpaket',
                              params: { id: p.id_paket },
                            }"
                            class="btn btn-success btn-circle"
                          >
                            <i class="far fa-eye"></i>
                          </router-link>
                          <router-link
                            :to="{
                              name: 'editpaket',
                              params: { id: p.id_paket },
                            }"
                            class="btn btn-warning btn-circle"
                          >
                            <i class="fas fa-pen"></i>
                          </router-link>
                          <button
                            type="button"
                            @click="hapus(p.id_paket)"
                            class="btn btn-danger btn-circle"
                          >
                            <i class="fas fa-trash"></i>
                          </button>
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
      <footer-component></footer-component>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      paket: {},
    };
  },
  created() {
    this.axios
      .get("http://localhost/lat_laundry/public/api/paket", {
        headers: { Authorization: "Bearer" + this.$store.state.token },
      })
      .then((res) => {
        this.paket = res.data;
      });
  },
  methods: {
    hapus(id_paket) {
      this.axios
        .delete(`http://localhost/lat_laundry/public/api/paket/${id_paket}`, {
          headers: { Authorization: "Bearer" + this.$store.state.token },
        })
        .then(() => {
          let i = this.paket.map((item) => item.id_paket).indexOf(id_paket);
          this.paket.splice(i, 1);
        });
    },
  },
};
</script>

<template>
  <div id="wrapper">
    <sidebar-component></sidebar-component>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <navbar-component></navbar-component>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-10">
              <div class="row">
                <div class="col">
                  <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="row">
                            <div class="col">
                              <div
                                class="
                                  text-xs
                                  font-weight-bold
                                  text-primary text-uppercase
                                "
                              >
                                Member
                              </div>
                              <div
                                class="
                                  h6
                                  mb-0
                                  font-weight-bold
                                  text-gray-800
                                  mb-2
                                "
                              >
                                {{ transaksi.nama }}
                              </div>
                              <div
                                class="
                                  text-xs
                                  font-weight-bold
                                  text-primary text-uppercase
                                "
                              >
                                Tanggal Order
                              </div>
                              <div
                                class="
                                  h6
                                  mb-0
                                  font-weight-bold
                                  text-gray-800
                                  mb-2
                                "
                              >
                                {{ transaksi.tgl_order | moment("DD/MM/YYYY") }}
                              </div>
                              <div
                                class="
                                  text-xs
                                  font-weight-bold
                                  text-primary text-uppercase
                                "
                              >
                                Batas Waktu
                              </div>
                              <div
                                class="
                                  h6
                                  mb-0
                                  font-weight-bold
                                  text-gray-800
                                  mb-2
                                "
                              >
                                {{
                                  transaksi.batas_waktu | moment("DD/MM/YYYY")
                                }}
                              </div>
                            </div>
                            <div class="col">
                              <div
                                class="
                                  text-xs
                                  font-weight-bold
                                  text-primary text-uppercase
                                "
                              >
                                Status Laundry
                              </div>
                              <div
                                class="
                                  h6
                                  mb-0
                                  font-weight-bold
                                  text-gray-800
                                  mb-2
                                "
                              >
                                {{ transaksi.status }}
                              </div>
                              
                              <div
                                class="
                                  text-xs
                                  font-weight-bold
                                  text-primary text-uppercase
                                "
                              >
                                Tanggal Bayar
                              </div>
                              <div
                                v-if="transaksi.tgl_bayar == null"
                                class="
                                  h6
                                  mb-0
                                  font-weight-bold
                                  text-gray-800
                                  mb-2
                                "
                              >
                                -
                              </div>
                              <div
                                v-else
                                class="
                                  h6
                                  mb-0
                                  font-weight-bold
                                  text-gray-800
                                  mb-2
                                "
                              >
                                {{ transaksi.tgl_bayar | moment("DD/MM/YYYY") }}
                              </div>
                              <div
                                class="
                                  text-xs
                                  font-weight-bold
                                  text-primary text-uppercase
                                "
                              >
                                Status Pembayaran
                              </div>
                              <div
                                v-if="transaksi.dibayar == 'belum dibayar'"
                                class="
                                  h6
                                  mb-0
                                  font-weight-bold
                                  text-gray-800
                                  mb-2
                                "
                              >
                                Belum Dibayar
                              </div>
                              <div
                                v-else
                                class="
                                  h6
                                  mb-0
                                  font-weight-bold
                                  text-gray-800
                                  mb-2
                                "
                              >
                                Dibayar
                              </div>
                            </div>
                          </div>
                          <div class="row mt-3">
                            <div class="col">
                              <button
                                :disabled="disableStatus"
                                type="button"
                                class="btn btn-warning"
                                @click="ubahStatus(id_transaksi)"
                              >
                                Ubah Status Laundry
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">
                    Detail Transaksi
                  </h6>
                </div>
                <div class="card-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Jenis</th>
                        <th>Jumlah (Kg / Satuan)</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(d, index) in detail" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ d.jenis }}</td>
                        <td>{{ d.quantity }}</td>
                        <td>{{ d.subtotal }}</td>
                      </tr>
                      <tr v-if="total != ''">
                        <td colspan="3" class="text-right">Total</td>
                        <td>
                          <h6 class="font-weight-bold">Rp {{ total }}</h6>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    :disabled="disableBayar"
                    type="button"
                    class="btn btn-success mr-3"
                    @click="bayar"
                  >
                    Bayar
                  </button>
                  <router-link
                    v-if="
                      transaksi.status != 'diambil' &&
                      transaksi.status != 'selesai' &&
                      transaksi.dibayar != 'dibayar'
                    "
                    :to="{
                      name: 'tambah_detail',
                      params: { id: this.id_transaksi },
                    }"
                    class="btn btn-primary"
                    >Tambah Detail Transaksi</router-link
                  >
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
      id_transaksi: this.$route.params.id,
      transaksi: {},
      detail: {},
      total: "",
    };
  },
  created() {
    this.axios
      .get(
        `http://localhost/lat_laundry/public/api/transaksi/${this.id_transaksi}`,
        { headers: { Authorization: `Bearer` + this.$store.state.token } }
      )
      .then((res) => {
        this.transaksi = res.data;
      })
      .catch((err) => console.log(err));
    //
    this.axios
      .get(
        `http://localhost/lat_laundry/public/api/transaksi/detil/${this.id_transaksi}`,
        { headers: { Authorization: `Bearer` + this.$store.state.token } }
      )
      .then((res) => {
        this.detail = res.data;
      })
      .catch((err) => console.log(err));
    //
    this.axios
      .get(
        `http://localhost/lat_laundry/public/api/transaksi/total/${this.id_transaksi}`,
        { headers: { Authorization: `Bearer` + this.$store.state.token } }
      )
      .then((res) => {
        this.total = res.data.total;
      })
      .catch((err) => console.log(err));
  },
  computed: {
    disableStatus() {
      if (
        this.transaksi.status == "selesai" ||
        this.transaksi.status == "diambil" ||
        this.detail.length == 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    disableBayar() {
      if (
        this.transaksi.status == "baru" ||
        this.transaksi.status == "proses" ||
        this.transaksi.status == "diambil"
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ubahStatus() {
      if (this.transaksi.status == "baru") {
        this.transaksi.status == "proses"
      } else {
        this.transaksi.status == "selesai"
      }

      this.axios
        .post(
          `http://localhost/lat_laundry/public/api/transaksi/status/${this.id_transaksi}`,
          this.transaksi,
          { headers: { Authorization: `Bearer` + this.$store.state.token } }
        )
        .then(() => {
          this.$router.go(1);
        })
        .catch((err) => console.log(err));
    },
    bayar() {
      this.axios
        .post(
          `http://localhost/lat_laundry/public/api/transaksi/bayar/${this.id_transaksi}`,
          this.transaksi,
          { headers: { Authorization: `Bearer` + this.$store.state.token } }
        )
        .then(() => {
          this.$router.go(1);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<template>
  <div id="wrapper">
    <sidebar-component></sidebar-component>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <navbar-component></navbar-component>
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-8">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">
                    Tambah Paket
                  </h6>
                </div>
                <div class="card-body">
                  <form @submit.prevent="tambah">
                    <div class="form-group">
                      <label>Jenis</label>
                    <select class="form-control" v-model="paket.jenis">
                      <option value="Cuci kering">Cuci kering</option>
                      <option value="Cuci setrika">Cuci seetrika</option>
                      <option value="Sprei kecil">Sprei kecil</option>
                      <option value="Sprei besar">Sprei besar</option>
                      <option value="Bed cover">Bed cover</option>
                    </select>
                    </div>
                    <div class="form-group">
                      <label>Harga</label>
                      <textarea
                        rows="4"
                        class="form-control"
                        v-model="paket.harga"
                      ></textarea>
                    </div>
                    <button type="submit" class="btn btn-success btn-block">
                      Simpan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <!-- <h1 class="h3 mb-4 text-gray-800">Data Member</h1> -->
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
  methods: {
    tambah() {
      this.axios
        .post("http://localhost/lat_laundry/public/api/paket", this.paket, {
          headers: { Authorization: `Bearer` + this.$store.state.token },
        })

        .then(() => {
          this.$router.push("/paket");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
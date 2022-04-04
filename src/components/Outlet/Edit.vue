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
                    Edit Data Outlet
                  </h6>
                </div>
                <div class="card-body">
                  <form @submit.prevent="edit">
                    <div class="form-group">
                      <label>Nama Outlet</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="outlet.nama_outlet"
                      />
                    </div>
                    <div class="form-group">
                      <label>Alamat</label>
                      <textarea
                        rows="4"
                        class="form-control"
                        v-model="outlet.alamat"
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
      outlet: {},
    };
  },
  created() {
    var data = JSON.parse(this.$store.state.datauser);
    var role = data.role;
    if (role == "kasir" || role == "owner") {
      this.$swal("Anda tidak dapat mengakses halaman ini");
      this.$router.push("/");
    }
    this.axios
      .get(`http://localhost/lat_laundry/public/api/outlet/${this.$route.params.id}`, {
        headers: { Authorization: `Bearer ` + this.$store.state.token },
      })
      .then((res) => {
        this.outlet = res.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    edit() {
      this.axios
        .put(`http://localhost/lat_laundry/public/api/outlet/${this.$route.params.id}`, this.outlet, {
          headers: { Authorization: `Bearer ` + this.$store.state.token },
        })
        .then(() => {
          this.$router.push("/outlet");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
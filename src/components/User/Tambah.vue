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
                    Tambah Data User
                  </h6>
                </div>
                <div class="card-body">
                  <form @submit.prevent="tambah">
                    <div class="form-group">
                      <label>Nama</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="user.name"
                      />
                    </div>
                    <div class="form-group">
                      <label>Username</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="user.username"
                      />
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        class="form-control"
                        v-model="user.password"
                      />
                    </div>
                    <div class="form-group">
                      <label>Role</label>
                      <select class="form-control" v-model="user.role">
                        <option value="admin">Admin</option>
                        <option value="kasir">Kasir</option>
                        <option value="owner">Owner</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Outlet</label>
                      <select
                        class="form-control"
                        placeholder="Pick Outlet"
                        id="exampleFormControlSelect2"
                        v-model="user.id_outlet"
                      >
                        <option
                          v-for="(o, index) in outlet"
                          :key="index"
                          :value="o.id_outlet"
                        >
                          {{ o.nama_outlet }}
                        </option>
                      </select>
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
      user: {},
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
      .get("http://localhost/lat_laundry/public/api/outlet", {
        headers: { Authorization: `Bearer ` + this.$store.state.token },
      })
      .then((res) => {
        this.outlet = res.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    tambah() {
      this.axios
        .post(
          "http://localhost/lat_laundry/public/api/insert_user",
          this.user,
          { headers: { Authorization: `Bearer ` + this.$store.state.token } }
        )
        .then((res) => {
          if (res.data.success) {
            // this.$router.push("/member");
            this.$swal("Sukses", res.data.message, "success");
            this.$router.push("/user");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
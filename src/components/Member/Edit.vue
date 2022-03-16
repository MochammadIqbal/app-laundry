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
                    Edit Data Member
                  </h6>
                </div>
                <div class="card-body">
                  <form @submit.prevent="edit">
                    <div class="form-group">
                      <label>Nama</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="ubah.nama"
                      />
                    </div>

                    <div class="form-group">
                      <label>Alamat</label>
                      <textarea
                        class="form-control"
                        rows="3"
                        v-model="ubah.alamat"
                      />
                    </div>

                    <div class="form-group">
                      <label>Jenis Kelamin</label>
                      <br />
                      <div
                        class="btn-group btn-group-toggle"
                        data-toggle="buttons"
                      >
                        <label
                          v-if="member.jenis_kelamin == 'Laki-laki'"
                          class="btn btn-secondary active"
                          checked
                        >
                          <input
                            type="radio"
                            value="Laki-laki"
                            v-model="ubah.jenis_kelamin"
                          />Laki-laki
                        </label>
                        <label v-else class="btn btn-secondary">
                          <input
                            type="radio"
                            value="Laki-laki"
                            v-model="ubah.jenis_kelamin"
                          />Laki-laki
                        </label>
                        &nbsp;
                        <label
                          v-if="ubah.jenis_kelamin == 'Perempuan'"
                          class="btn btn-secondary active"
                          checked
                        >
                          <input
                            type="radio"
                            value="Perempuan"
                            v-model="ubah.jenis_kelamin"
                          />Perempuan
                        </label>
                        <label v-else class="btn btn-secondary">
                          <input
                            type="radio"
                            value="Perempuan"
                            v-model="ubah.jenis_kelamin"
                          />Perempuan
                        </label>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>No Telp</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="ubah.tlp"
                      />
                    </div>
                    <div class="card-footer">
                      <button class="btn btn-primary" type="submit">
                        Simpan
                      </button>
                    </div>
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
      member: {},
      ubah: {},
    };
  },
  created() {
    this.axios
      .get(
        `http://localhost/lat_laundry/public/api/member/${this.$route.params.id}`,
        { headers: { Authorization: `Bearer` + this.$store.state.token } }
      )
      .then((res) => {
        this.member = res.data;
      });
  },
  methods: {
    edit() {
      this.axios
        .put(
          `http://localhost/lat_laundry/public/api/member/${this.$route.params.id}`,
          this.ubah,
          { headers: { Authorization: `Bearer` + this.$store.state.token } }
        )

        .then(() => {
          this.$router.push("/member");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
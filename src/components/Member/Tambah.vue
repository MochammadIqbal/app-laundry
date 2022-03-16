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
                    Tambah Data Member
                  </h6>
                </div>
                <div class="card-body">
                  <form @submit.prevent="tambah">
                    <div class="form-group">
                      <label>Nama</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="member.nama"
                      />
                    </div>
                    <div class="form-group">
                      <label>Alamat</label>
                      <textarea
                        rows="4"
                        class="form-control"
                        v-model="member.alamat"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label>Jenis kelamin</label>
                      <div
                        class="btn-group btn-group-toggle"
                        data-toggle="buttons"
                      >
                        <label class="btn btn-secondary">
                          <input type="radio" value="Laki-laki" v-model="member.jenis_kelamin" />
                          Laki-laki
                        </label>
                        <label class="btn btn-secondary">
                          <input type="radio" value="Perempuan" v-model="member.jenis_kelamin" />
                          Perempuan
                        </label>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>tlp</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="member.tlp"
                      />
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
      member: {},
    }
  },
  methods: {
    tambah() {
      this.axios.post("http://localhost/lat_laundry/public/api/member", this.member, 
                    { headers: {Authorization : `Bearer` + this.$store.state.token}})

        .then(() => {
            this.$router.push("/member");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
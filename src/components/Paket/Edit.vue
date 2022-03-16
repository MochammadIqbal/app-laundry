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
                    Edit Data Paket
                  </h6>
                </div>
                <div class="card-body">
                  <form @submit.prevent="edit">
                    <div class="form-group">
                      <label>Jenis</label>
                    <select class="form-control" v-model="ubah.jenis">
                      <option value="Cuci kering">Cuci kering</option>
                      <option value="Cuci setrika">Cuci setrika</option>
                      <option value="Sprei kecil">Sprei kecil</option>
                      <option value="Sprei besar">Sprei besar</option>
                      <option value="Bed cover">Bed Cover</option>
                    </select>
                    </div>

                    <div class="form-group">
                      <label>Harga</label>
                      <textarea
                        class="form-control"
                        rows="3"
                        v-model="ubah.harga"
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
      paket: {},
      ubah: {},
    };
  },
  created() {
    this.axios
      .get(
        `http://localhost/lat_laundry/public/api/paket/${this.$route.params.id}`,
        { headers: { Authorization: `Bearer` + this.$store.state.token } }
      )
      .then((res) => {
        this.paket = res.data;
      });
  },
  methods: {
    edit() {
      this.axios
        .put(
          `http://localhost/lat_laundry/public/api/paket/${this.$route.params.id}`,
          this.ubah,
          { headers: { Authorization: `Bearer` + this.$store.state.token } }
        )

        .then(() => {
          this.$router.push("/paket");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
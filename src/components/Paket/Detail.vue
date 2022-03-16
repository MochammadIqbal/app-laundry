<template>
  <div id="wrapper">
    <sidebar-component></sidebar-component>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <navbar-component></navbar-component>
        <div class="container-fluid">
          <h1 class="h4 mb-4 text-gray-800">Detail Paket</h1>
          <div class="row">
            <div class="col-lg-8">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-blod text-primary">Data Paket</h6>
                </div>
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-md-4 text-center">
                      <i class="far fa-user fa-7x text-gray-300"></i>
                    </div>
                    <div class="col auto" v-for="p in paket" :key="p.id_paket">
                      <div
                        class="
                          text-xs
                          font-weight-bold
                          text-primary text-uppercase
                        "
                      >
                        Jenis Paket
                      </div>
                      <div class="h6 mb-0 font-weight-bold text-gray-800 mb-2">
                        {{ p.jenis }}
                      </div>
                      <div
                        class="
                          text-xs
                          font-weight-bold
                          text-primary text-uppercase
                        "
                      >
                        Harga
                      </div>
                      <div class="h6 mb-0 font-weight-bold text-gray-800 mb-2">
                        {{ p.harga }}
                      </div>
                    </div>
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
      paket: {},
    };
  },
   created() {
     this.axios.get(`http://localhost/lat_laundry/public/api/paket/${this.$route.params.id}`,
         { headers: { Authorization: `Bearer` + this.$store.state.token } })
       .then((res) => {
         this.paket = res.data;
       })
       .catch(err => console.log(err))
   },
};
</script>


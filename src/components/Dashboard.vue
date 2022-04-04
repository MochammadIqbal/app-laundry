<template>
  <div id="wrapper">
    <sidebar-component></sidebar-component>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <navbar-component></navbar-component>

        <div class="container-fluid">
          <!-- Page Heading -->
          <h1></h1>
          <h1 class="h4 mb-4 text-gray-800">Selamat datang, {{ nama }}</h1>

          <div class="row">
            <!-- Jumlah member -->
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div
                        class="
                          text-xs
                          font-weight-bold
                          text-primary text-uppercase
                          mb-1
                        "
                      >
                        Member
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {{ data.member }}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-users fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Jumlah laundry baru -->
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div
                        class="
                          text-xs
                          font-weight-bold
                          text-warning text-uppercase
                          mb-1
                        "
                      >
                        Laundry Baru
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {{ data.baru }}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-tshirt fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Jumlah laundry proses -->
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div
                        class="
                          text-xs
                          font-weight-bold
                          text-success text-uppercase
                          mb-1
                        "
                      >
                        Proses Laundry
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {{ data.proses }}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-spinner fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pendapatan -->
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div
                        class="
                          text-xs
                          font-weight-bold
                          text-info text-uppercase
                          mb-1
                        "
                      >
                        Pendapatan
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        Rp {{ data.pendapatan }}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-money-bill fa-2x text-gray-300"></i>
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
      nama: "",
      data: {},
    };
  },
  created() {
    var data = JSON.parse(this.$store.state.datauser);
    this.nama = data.nama;

    var outlet = JSON.parse(this.$store.state.dataoutlet);
    var namaoutlet = outlet.nama_outlet;
    this.nama_outlet = namaoutlet;

    this.axios
      .get("http://localhost/lat_laundry/public/api/dashboard", {
        headers: { Authorization: "Bearer " + this.$store.state.token },
      })
      .then((res) => {
        this.data = res.data;
      });
  },
};
</script>
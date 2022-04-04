<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div
          class="card o-hidden border-0 border-bottom-primary shadow-lg my-5"
        >
          <div class="card-body p-5">
            <div class="text-center">
              <div class="h4 text-gray-900 mb-4">Selamat Datang</div>
            </div>
            <form class="user" @submit.prevent="login">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control form-control-user"
                  placeholder="Masukkan username"
                  v-model="account.username"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control form-control-user"
                  placeholder="Masukkan password"
                  v-model="account.password"
                />
              </div>
              <!-- <router-link to="/"> -->
                <button
                  type="submit"
                  class="btn btn-primary btn-user btn-block"
                >
                  Login
                </button>
              <!-- </router-link> -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      account: {},
    };
  },
  methods: {
    login() {
      this.axios
        .post(
          "http://localhost/lat_laundry/public/api/login",
          this.account
        )

        .then(res => {  
          if((res.data.success)) {
            this.$store.commit("setToken", res.data.token);
            this.$store.commit("setUser", JSON.stringify(res.data.user));
            this.$store.commit('setOutlet', JSON.stringify(res.data.outlet)) 
            this.$router.push("/");
          }else{
            this.$swal('Username atau Password salah')
          }
        })
    },
  },
};
</script>
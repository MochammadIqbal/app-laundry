<template>
  <div id="wrapper">
    <sidebar-component></sidebar-component>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <navbar-component></navbar-component>
        <div class="container-fluid">
          <h1 class="h3 mb-4 text-gray-800">Data Member</h1>

          <div class="row">
            <div class="col-lg-12">
              <div class="card shadow mb-4">
                <div class="card body"></div>

                <div class="table-responsive">
                  <router-link
                    to="/member/tambah"
                    class="btn btn-info btn-icon-split"
                  >
                    <span class="icon text-white-50">
                      <i class="fas fa-plus"></i>
                    </span>
                    <span class="text">Tambah</span>
                  </router-link>
                  <table
                    class="table table-bordered mt-3"
                    width="100%"
                    cellspacing="0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>jk</th>
                        <th>tlp</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="m in member" :key="m.id_members">
                        <td>{{ m.id_member }}</td>
                        <td>{{ m.nama }}</td>
                        <td>{{ m.alamat }}</td>
                        <td>{{ m.jenis_kelamin }}</td>
                        <td>{{ m.tlp }}</td>
                        <td>
                          <router-link
                            :to="{
                              name: 'detailmember',
                              params: { id: m.id_member },
                            }"
                            class="btn btn-success btn-circle"
                          >
                            <i class="far fa-eye"></i>
                          </router-link>
                          <router-link
                            :to="{
                              name: 'editmember',
                              params: { id: m.id_member },
                            }"
                            class="btn btn-warning btn-square"
                          >
                            <i class="fas fa-pen"></i>
                          </router-link>
                          <button
                            type="button"
                            @click="hapus(m.id_member)"
                            class="btn btn-danger btn-square"
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
      member: {},
    };
  },
  created() {
    this.axios
      .get("http://localhost/lat_laundry/public/api/member", {
        headers: { Authorization: "Bearer" + this.$store.state.token },
      })
      .then((res) => {
        this.member = res.data;
      });
  },
  methods: {
    hapus(id_member) {
        this.$swal({
             title: "Hapus Data Member",
               text: "Apakah anda yakin menghapus data member ini?",
               icon: 'waning',
               showDenyButton: true,
               //showCancelButton: "false",
               confirmButtonText: "Ya",
               denyButtonText: "Tidak",

             }).then((result) => {
               console.log(result)
               if(result.isConfirmed){
                 this.axios
                        .delete(`http://localhost/lat_laundry/public/api/member/${id_member}`, {
                        headers: { Authorization: "Bearer " + this.$store.state.token },
                        })
                        .then((res) => {
                        if(res.data.success) {
                        this.$swal("Sukses", res.data.message, "success")
                        let i = this.member.map((item) => item.id_member).indexOf(id_member);
                        this.member.splice(i, 1);
                        this.getData()
                        
                        // this.$swal(res.data.message)
                        }
                    })
               } else {
                   this.$swal({
                       title: "Batal",
                       text : 'Data Member tidak jadi dihapus',
                       icon: 'error',
                       confirmButtonText: "OK"
                   })
               }
           })
        }
    
},
};
</script>

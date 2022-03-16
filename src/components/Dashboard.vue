<template>
  <div id="wrapper">
    <sidebar-component></sidebar-component>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <navbar-component></navbar-component>
        <div class="container-fluid">
          <!-- <h1 class="h3 mb-4 text-gray-800">Blank Page</h1> -->
          <h1>Selamat datang, {{role}}</h1>
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
      role: "",
    };
  },
  created() {
    var user = JSON.parse(this.$store.state.datauser);
    this.role = user.role;
  },
};
</script>

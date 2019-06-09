<template>
  <div>
    <User :type="type"/>
  </div>
</template>

<script>

  import User from '../../components/User/User'

  export default {
    components: {
      User
    },
    data(){
      return {
        type: 3 //2:教师 3:用户
      }
    }
  }
</script>

<style media="screen">
  .function {
    display: inline-block;
    margin-bottom: 10px;
  }

  .page {
    margin: 0 35%
  }

  .searchInput {
    width: 200px;
  }

  .functionRight {
    display: inline-block;
    float: right;
  }

</style>

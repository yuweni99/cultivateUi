<template>
  <div>
    <User :type="type"/>
  </div>
</template>

<script>
  import User from '../../components/User/User'
  export default {
    components: {User},
    data(){
      return {
        type: 2 //2:教师 3:用户
      }
    }
  }
</script>

<style media="screen">

</style>

<template>
  <Permission :type="type"/>
</template>

<script>
  import Permission from '../../components/Permission/Permission'
  export default{
    data(){
      return {
        type: 1 //许可管理
      }
    },
    components: {
      Permission
    }
  }
</script>

<style>
</style>

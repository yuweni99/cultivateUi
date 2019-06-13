<template>
    <div>
      <el-table
        :data="userCourseTeachers"
        v-loading="loading"
        border>
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="teacherName"
          label="教师名称">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="findTeacher(scope.row.id)">查看课时
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import * as userApi from '../../api/user'
    export default {
      data(){
        return {
          loading: true, //遮罩效果
          userCourseTeachers: [] //用户课程
        }
      },
      methods: {
        //查看课时
        findTeacher(){
          this.$router.push("/home/studentTeaching");
        },
        //查询对应的课程
        async findAll(){

          const result = await userApi.findCourse();

          if(result.success){ //查询到数据
            this.userCourseTeachers.push(result.object);
            this.loading = false;
          }else{
            this.$message(result.message);
          }

        }
      },
      mounted() {
        this.findAll();
      }
    }
</script>

<style>

</style>

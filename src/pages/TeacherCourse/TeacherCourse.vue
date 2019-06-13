<template>
  <div class="testProject">
    <div class="function">
      <el-input class="searchInput"
                placeholder="请输入课程名称"
                icon="search"
                v-model="pageRequestParams.searchName">
      </el-input>
      <el-button class="searchButton" @click="pageQuery">搜索</el-button>
    </div>
    <div class="functionRight">

    </div>
    <div>
      <el-table
        :data="teacherCourseMaps"
        v-loading="loading"
        border>
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="totalPeople"
          sortable
          label="可选总人数">
        </el-table-column>
        <el-table-column
          prop="selectCourseNum"
          sortable
          label="已选人数">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="openCourseUserPage(scope.row.id)">查看已选课同学
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page"
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"
                     :page-sizes="[5, 10, 20]"
                     :page-size="pageRequestParams.pageSize"
                     background
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pageData.total">
      </el-pagination>
    </div>

    <div>
      <el-dialog :visible="dialogVisible" title="学生列表" :before-close="closeCourseUserPage">
        <CourseUser :ctId="ctId"/>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import CourseUser from '../../components/CourseUser/CourseUser'
  import * as courseTeacherApi from '../../api/courseTeacher'
  export default {
    components: {
      CourseUser
    },
    data() {
      return {
        ctId: '', //老师课程id
        dialogVisible: false, //是否打开组件
        loading: true, //加载动画
        teacherCourseMaps: [],
        //用户选择的记录
        pageRequestParams: {
          pageSize: 5, //每页记录数默认为5
          pageNum: 1, //起始页
          searchName: '', //搜索字段
        },
        pageData: {
          total: 1, //总记录数
        },
      }
    },
    methods: {
      closeCourseUserPage(){
        this.dialogVisible = false;
      },
      //更改页码触发
      handleCurrentChange(val) {
        this.pageRequestParams.pageNum = val;
        this.pageQuery();
      },
      //更改每页记录数触发
      handleSizeChange(val) {
        this.pageRequestParams.pageSize = val;
        this.pageQuery();
      },
      //分页查询数据
      async pageQuery() {

        const {pageSize, pageNum, searchName} = this.pageRequestParams;
        //构建搜索过滤对象
        const searchCourse = {searchName};
        const result = await courseTeacherApi.getPageQueryTeacherCourse(pageNum, pageSize, searchCourse);

        if (result.success) {
          //获取课程集合
          const {list, total} = result.queryResult;
          this.teacherCourseMaps = list; //数据
          this.pageData.total = total; //总记录数
          //关闭遮罩
          this.loading = false;

        } else {
          this.$message(result.message);
        }
      },
      //查询已选课的同学
      openCourseUserPage(id){
        this.ctId = id;
        this.dialogVisible = true;
      }

    },
    mounted() {
      this.pageQuery();
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

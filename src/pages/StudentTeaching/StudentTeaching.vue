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
        :data="studentTeachings"
        v-loading="loading"
        border>
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>

        <el-table-column
          prop="userName"
          label="用户名称">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="teachingTitle"
          label="课时标题">
        </el-table-column>
        <el-table-column
          prop="teachingDescription"
          label="课时描述">
        </el-table-column>
        <!--<el-table-column
          prop="teachingId"
          label="课时描述">
        </el-table-column>-->
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
  </div>
</template>

<script>
  import * as studentTeachingApi from '../../api/studentTeaching'
  export default {
    data() {
      return {
        loading: true, //加载动画
        studentTeachings: [],
        dialogVisible: false,
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
        const result = await studentTeachingApi.getStudentTeachingPageQuery(pageNum, pageSize, searchCourse);

        if (result.success) {
          //获取课程集合
          const {list, total} = result.queryResult;
          this.studentTeachings = this.handelAlias(list); //数据
          this.pageData.total = total; //总记录数
          //关闭遮罩
          this.loading = false;

        } else {
          this.$message(result.message);
        }
      },
      handelAlias(studentTeachings){
        return studentTeachings;
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

  .myclearfix:after { /*伪元素是行内元素 正常浏览器清除浮动方法*/
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .myclearfix {
    *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
  }
</style>

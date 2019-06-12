<template>
  <div class="testProject">
    <div class="function">
      <el-input class="searchInput"
                placeholder="课程名称/课时标题/课时描述"
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
          prop="title"
          label="课时标题">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="statusName"
          width="100"
          label="课程状态">
        </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="toEdit(scope.row.id,3)">查看详情
            </el-button>

            <el-button
              v-if="scope.row.status === '1'"
              size="mini"
              type="danger"
              @click="findCurrentTeachingUser(scope.row.id,1)">查看同学
            </el-button>
              <el-button
                v-if="scope.row.status === '0' || scope.row.status === '3'"
                size="mini"
                type="danger"
                @click="fixInAdvanceTeaching(scope.row.id,1)">预约
              </el-button>
              <el-button
                v-if="scope.row.status === '1'"
                size="mini"
                type="danger"
                @click="fixInAdvanceTeaching(scope.row.id,3)">取消预约
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
      <el-dialog :visible="dialogVisible" title="查看课时详情" :before-close="changeEditPageState">
        <el-form v-loading="!studentTeachingInfo.id" status-icon ref="teachingFrom" :model="studentTeachingInfo"  label-width="150px">
          <el-form-item  label="课时名称">
            <el-input disabled v-model="studentTeachingInfo.title"/>
          </el-form-item>
          <el-form-item  label="课时描述">
            <el-input disabled v-model="studentTeachingInfo.description"/>
          </el-form-item>
          <el-form-item  label="课程名称">
            <el-input disabled v-model="studentTeachingInfo.courseName"/>
          </el-form-item>
          <el-form-item  label="上课教师">
            <el-input disabled v-model="studentTeachingInfo.teacherName"/>
          </el-form-item>
          <el-form-item  label="上课教室">
            <el-input disabled v-model="studentTeachingInfo.classroomName"/>
          </el-form-item>
          <el-form-item  label="上课日期">
            <el-input disabled type="date" v-model="studentTeachingInfo.teachingDate"/>
          </el-form-item>
          <el-form-item  label="上课时间">
            <el-input disabled :value="`${studentTeachingInfo.startTime}~${studentTeachingInfo.endTime}`"/>
          </el-form-item>
          <el-form-item  label="上课状态">
            <el-input disabled v-model="studentTeachingInfo.statusName"/>
          </el-form-item>
          <el-form-item>
            <el-button @click="changeEditPageState">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import * as studentTeachingApi from '../../api/studentTeaching'
  export default {
    data() {
      return {
        studentTeachingInfo: {}, //学生课程相关信息
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
          this.studentTeachings = list; //数据
          this.pageData.total = total; //总记录数
          //关闭遮罩
          this.loading = false;

        } else {
          this.$message(result.message);
        }
      },
      //查看当前课时下的学生
      findCurrentTeachingUser(){



      },
      //查看详细信息
      async toEdit(id){
        this.changeEditPageState();

        //查询相关信息
        const result = await studentTeachingApi.findBeInterrelated(id);

        if(result.success){
          this.studentTeachingInfo = result.object;
        }else{
          this.$message(result.message);
        }
      },
      //预定课时
      async fixInAdvanceTeaching(id,status){
        const result = await studentTeachingApi.fixInAdvanceTeaching(id,status);

        if(result.success){
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          //刷新页面
          this.pageQuery();
        }else{
          this.$message(result.message);
        }

      },
      changeEditPageState() {
        const {dialogVisible} = this;
        this.dialogVisible = !dialogVisible;
        if (!this.dialogVisible) {
          this.studentTeachingInfo = {}; //清空课时对象
        }

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

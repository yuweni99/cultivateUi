<template>
  <div class="testProject">
    <div class="function">
      <el-input class="searchInput"
                placeholder="课程名称/课程描述"
                icon="search"
                v-model="pageRequestParams.searchName">
      </el-input>
      <el-button class="searchButton" @click="pageQuery">搜索</el-button>
    </div>
    <div>
      <el-table
        :data="courses"
        border
        v-loading="loading"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          prop="id">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>

        <el-table-column
          prop="name"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="description"
          label="课程描述">
        </el-table-column>
        <el-table-column
          prop="teachingNum"
          sortable
          label="课程课时">
        </el-table-column>
        <el-table-column
          prop="totalPeople"
          sortable
          label="课程总人数">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="selectCourse(scope.row.id)">老师选择课程
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
      <el-dialog :visible="dialogVisible" :title="title" :before-close="changeEditPageState">
        <el-form v-loading="!course.id && !isAdd" status-icon ref="courseForm" :model="course" :rules="rules"
                 label-width="150px">
          <el-form-item label="课程名称:" prop="name">
            <el-input v-model="course.name"/>
          </el-form-item>
          <el-form-item label="课程描述:" prop="description">
            <el-input v-model="course.description"/>
          </el-form-item>
          <el-form-item label="课程课时:" prop="teachingNum">
            <el-input type="number" v-model="course.teachingNum"/>
          </el-form-item>
          <el-form-item label="课程总人数:" prop="totalPeople">
            <el-input type="number" v-model="course.totalPeople"/>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="changeEditPageState">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  import * as courseApi from '../../api/course'
  import * as courseTeacherApi from '../../api/courseTeacher'

  const BASE_URL = 'http://127.0.0.1:8080';
  export default {
    data() {
      return {
        importCourseUrl: `${BASE_URL}/excel/courseImport`,
        isAdd: false,
        course: {
          id: '',
          name: '',
          description: '',
          teachingNum: '',
          totalPeople: '',
          createTime: '',
          updateTime: '',
        },
        pageRequestParams: {
          pageSize: 5, //每页记录数默认为5
          pageNum: 1, //起始页
          searchName: '', //搜索字段
        },
        pageData: {
          total: 1, //总记录数
        },
        loading: true, //遮罩效果
        ids: [],
        dialogVisible: false,
        courses: [], //课程数组
        title: '', //弹框层标题
        message: '',
      }
    },
    methods: {
      //选择课程
      async selectCourse(id){
        const result = await courseTeacherApi.selectCourse(id);

        if(result.success){
          this.$message({
            message: '选课成功',
            type: 'info'
          });

          this.pageQuery();
        }else{
          this.message(result.message);
        }

      },


      handleSelectionChange(val) {
        this.ids = val.map((item) => item.id);
      },
      //删除选中的数据
      openEditPage(isAdd) { //type true为添加,false为修改
        this.isAdd = isAdd;
        this.title = isAdd ? '添加课程信息' : '修改课程信息';
        this.changeEditPageState();
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
        const result = await courseApi.pageQueryTeacherCanSelectCourse(pageNum, pageSize, searchCourse);

        if (result.success) {
          //获取课程集合
          const {list, total} = result.queryResult;
          this.courses = list; //数据
          this.pageData.total = total; //总记录数
          //关闭遮罩
          this.loading = false;

        } else {
          this.$message(result.message);
        }
      },
    },
    mounted() {
      this.pageQuery();
    },
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

  .file-upload {
    width: 60px;
    height: 26px;
    position: relative;
    overflow: hidden;
    border: 1px solid #0F996B;
    display: inline-block;
    border-radius: 4px;
    font-size: 12px;
    color: #0F996B;
    text-align: center;
    line-height: 26px;
    float: right;
    margin: 10px 0 auto auto;
  }

  .file-upload-input {
    background-color: transparent;
    position: absolute;
    width: 999px;
    height: 999px;
    top: -10px;
    right: -10px;
    cursor: pointer;
  }

</style>

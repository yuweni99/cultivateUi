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
    <div class="functionRight">
      <el-button @click="exportCourse">导出课程</el-button>
      <el-button type="success" @click="openEditPage(true)">添加</el-button>
      <el-button type="primary" @click="delSelect">删除选中</el-button>
    </div>
    <div class="file-upload">
      <div class="file-upload-text">导入课程</div>
      <input name="file" @change="importCourse" class="file-upload-input" id="file" type="file"
             accept="application/vnd.ms-excel">
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
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="修改时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="toEdit(scope.row.id)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="delCourse(scope.row.id)">删除
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
  import {uploadFile} from '../../utils/uploadUtils'

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
        rules: {
          id: [
            {required: true, message: 'id不能为空', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '课程名称不能为空', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '课程描述不能为空', trigger: 'blur'}
          ],
          teachingNum: [
            {required: true, message: '课程课时不能为空', trigger: 'blur'}
          ],
          totalPeople: [
            {required: true, message: '课程总人数不能为空', trigger: 'blur'}
          ],
          createTime: [
            {required: true, message: '课程创建时间不能为空', trigger: 'blur'}
          ],
          updateTime: [
            {required: true, message: '课程修改时间不能为空', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      // 表格内删除按钮点击实现
      async toEdit(id) {
        //打开弹出层页面
        this.openEditPage(false);
        //查询课程信息
        const result = await courseApi.getCourse(id);
        if (result.success) {
          const {object} = result;
          this.course = object;
        } else {
          this.$message(result.message);
          //关闭弹出层界面
          this.changeEditPageState();
        }

      },
      //删除
      delCourse(id) {
        this.dels([id]);
      },
      handleSelectionChange(val) {
        this.ids = val.map((item) => item.id);
      },
      //非空校验
      validator(rule, value, callback, message) {
        if (!value) {
          callback(new Error(message));
        } else {
          callback();
        }
      },
      //删除选中的数据
      delSelect() {
        //校验
        const {ids} = this;
        if (!ids.length) {
          this.$notify({
            title: '警告',
            message: '请选择要删除的数据',
            type: 'warning'
          });
          return;
        }

        this.dels(this.ids);

      },
      //删除课程集合调用方法
      dels(ids) {

        this.$confirm('请注意，删除的数据不可恢复!!!', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {


          //发送请求删除数据
          const result = await courseApi.delCourses(ids);

          const type = result.success ? 'success' : 'info';

          const {success, message} = result;
          if (success) { //删除成功
            //刷新页面
            this.pageQuery();
          }

          this.$message({
            type,
            message
          });

        });

      },

      openEditPage(isAdd) { //type true为添加,false为修改
        this.isAdd = isAdd;
        this.title = isAdd ? '添加课程信息' : '修改课程信息';
        this.changeEditPageState();
      },
      //更改弹出层页面状态
      changeEditPageState() {
        const {dialogVisible} = this;
        this.dialogVisible = !dialogVisible;
        //动态计算课程信息
        //如果是关闭，则清空校验错误信息
        if (!this.dialogVisible) {
          //清空表单数据校验信息
          this.$refs.courseForm.resetFields();
          this.course = {};
        }

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
        const result = await courseApi.getCoursePageQuery(pageNum, pageSize, searchCourse);

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
      //保存数据
      save() {

        //校验表单
        this.$refs.courseForm.validate(async (valid) => {
          if (valid) {

            const {course} = this;
            const result = await courseApi.saveCourse(course);

            if (result.success) {  //成功

              //讲修改后的新数据保存到课程集合中
              const course = result.object; //新的课程信息

              this.saveCourse(course);

              this.$message({
                message: '操作成功',
                type: 'success'
              });
              //关闭弹出层
              this.changeEditPageState();
            } else { //失败
              this.$message(result.message);
            }

          } else {
            return false;
          }
        });


      },
      //保存或修改新课程信息
      saveCourse(course) {

        //获取课程集合
        const {courses} = this;

        //根据id查询下标
        const index = courses.findIndex((c) => c.id === course.id);
        if (index !== -1) { //存在则为修改的数据
          courses.splice(index, 1, course);
        } else { //添加的新数据
          courses.splice(courses.length - 1, 1); //删除最后一个数据
          courses.unshift(course); //头部添加一个新数据
        }

        this.courses = courses;
      },
      exportCourse() {
        location.href = `${BASE_URL}/excel/courseExport`
      },
      async importCourse(event) {

        let file = event.target.files[0];

        let param = new FormData(); //创建form对象
        param.append('file', file);//通过append向form对象添加数据

        if (!param.get('file').name) {
          return;
        }

        const importCourseUrl = this.importCourseUrl; //上传地址

        const result = await uploadFile(importCourseUrl, param);

        if (result.success) {
          this.$message({
            message: '导入成功',
            type: 'info'
          });

          this.pageQuery();
        } else {
          this.$message(result.message);
        }

        event.target.name = undefined;


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

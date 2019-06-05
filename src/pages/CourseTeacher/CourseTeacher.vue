<template>
  <div class="testProject">
    <div class="function">
      <el-input class="searchInput"
                placeholder="请输入课程名称"
                icon="search"
                v-model="searchName">
      </el-input>
      <el-button class="searchButton">搜索</el-button>
    </div>
    <div class="functionRight">
      <el-button type="success" @click="onNewClick">添加</el-button>
      <el-button type="primary" @click="delSelect">删除选中</el-button>
    </div>
    <div class="myclearfix">
      <el-table
        :data="courseTeachers"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          prop="id">
        </el-table-column>
        <el-table-column
          prop="id"
          label="课程教师id">
        </el-table-column>

        <el-table-column
          prop="courseId"
          label="课程id">
        </el-table-column>
        <el-table-column
          prop="teacherId"
          label="教师id">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page"
                     background
                     layout="prev, pager, next"
                     :page-size="5"
                     :total="20">
      </el-pagination>
    </div>
    <div>
      <el-dialog :visible="dialogVisible" title="测试" :before-close="handleClose">
        <el-form ref="courseTeacherForm" :model="courseTeacher" :rules="rules" label-width="100px">
          <el-form-item label="课程教师id" prop="id">
            <el-input v-model="courseTeacher.id"/>
          </el-form-item>
          <el-form-item label="课程">
            <el-select v-model="courseTeacher.courseId" placeholder="请选择活动区域">
              <el-option v-for="(course,index) in courses" :key="index" :label="course.label" :value="course.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="教师">
            <!--            <el-input v-model="courseTeacher.teacherId"/>-->
            <el-select v-model="courseTeacher.teacherId" placeholder="请选择活动区域">
              <el-option label="弹b" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime">
            <el-input v-model="courseTeacher.createTime"/>
          </el-form-item>
          <el-form-item label="修改时间" prop="updateTime">
            <el-input v-model="courseTeacher.updateTime"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addCourseTeacher">添加</el-button>
            <el-button @click="changeAddPageState">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchName: '', //课程名称
        courseTeacher: {
          id: 9,
          courseId: 2,
          teacherId: 1,
          createTime: '2017/01/01',
          updateTime: '2017/01/31'
        },
        dialogVisible: false,
        courseTeachers: [{
          id: 9,
          courseId: 1,
          teacherId: 1,
          createTime: '2017/01/01',
          updateTime: '2017/01/31'
        }],
        courses: [
          {
            value: 1,
            label: 'java从入门到放弃',
          },
          {
            value: 2,
            label: 'mysql从入门到删库',
          }
        ],
        //用户选择的记录
        ids: [],
        message:'',
        rules:{
          id: [
            { required: true, message: 'id不能为空', trigger: 'blur' },
            { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' },
            { min: 18, max: 20, message: '长度在 18 到 20 个字符', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '修改时间不能为空', trigger: 'blur' },
            { min: 18, max: 20, message: '长度在 18 到 20 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 表格内删除按钮点击实现
      onNewClick: function () {
        this.dialogTitle = "新建方案";
        this.dialogVisible = true;
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogVisible = true;
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSelectionChange(val) {
        this.ids = val.map((item) => item.id);
      },
      handleClose() {
        this.dialogVisible = false;
      },
      //非空校验
      validator(rule, value, callback, message) {
        if (!value) {
          callback(new Error(message));
        } else {
          callback();
        }
      },
      addCourseTeacher(){
        this.$refs.courseTeacherForm.validate((valid) => {
          if (valid) {
            this.$message('登陆成功');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //打开或关闭添加
      changeAddPageState(){
        const {dialogVisible} = this;

        this.dialogVisible = !dialogVisible;

        //如果是关闭，则清空校验错误信息
        if(!this.dialogVisible){
          this.$refs.courseTeacherForm.resetFields();
        }

      },
      //删除选中的数据
      delSelect(){

        //校验
        const {ids} = this;

        if(!ids.length){
          this.$notify({
            title: '警告',
            message: '请选择要删除的数据',
            type: 'warning'
          });
          return;
        }

        this.$confirm('请确认是否选中选择的数据，删除的数据不可恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          console.log(this.ids);
        });

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

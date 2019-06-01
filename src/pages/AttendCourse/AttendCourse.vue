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
    <div>
      <el-table
        :data="attendcourses"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          prop="attendcourseId"
          label="id">
        </el-table-column>
        <el-table-column
          prop="attendcourseId"
          label="id">
        </el-table-column>

        <el-table-column
          prop="attendcoursePrice"
          label="课程价格">
        </el-table-column>

        <el-table-column
          prop="attendcourseCourseId"
          label="课程id">
        </el-table-column>
        <el-table-column
          prop="attendCourseStatus"
          label="课程状态">
        </el-table-column>
        <el-table-column
          prop="attendCourseClassroomId"
          label="教室id">
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
      <el-dialog :visible="dialogVisible" title="测试" :before-close="changeAddPageState">
        <el-form status-icon :model="attendcourse" :rules="rules" ref="attendcourseForm" label-width="80px">
          <el-form-item label="id" prop="attendcourseId">
            <el-input v-model="attendcourse.attendcourseId"/>
          </el-form-item>
          <el-form-item label="课程价格" prop="attendcoursePrice">
            <el-input v-model="attendcourse.attendcoursePrice"/>
          </el-form-item>
          <el-form-item label="课程id" prop="attendcourseCourseId">
            <el-input v-model="attendcourse.attendcourseCourseId"/>
          </el-form-item>
          <el-form-item label="课程状态" prop="attendCourseStatus">
            <el-input v-model="attendcourse.attendCourseStatus"/>
          </el-form-item>
          <el-form-item label="教室id" prop="attendCourseClassroomId">
            <el-input v-model="attendcourse.attendCourseClassroomId"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addCourse">添加</el-button>
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
          searchName:'',
        attendcourse: {
          attendcourseId:'',
          attendcoursePrice: '',
          attendcourseCourseId: '',
          attendCourseStatus: '',
          attendCourseClassroomId: ''
        },
        //用户选择的记录
        attendcourseIds:[],
        dialogVisible: false,
        attendcourses: [{
          attendcourseId: 1,
          attendcoursePrice: 100,
          attendcourseCourseId: 1,
          attendCourseStatus: '正在上课',
          attendCourseClassroomId: 1001
        }],
        message:'',
        rules:{
          attendcourseId: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "id不能为空")
              }, trigger: 'blur'
            }
          ],
          attendcoursePrice: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "课程价格不能为空")
              }, trigger: 'blur'
            }
          ],
          attendcourseCourseId: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "课程id不能为空")
              }, trigger: 'blur'
            }
          ],
          attendCourseStatus: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "课程状态不能为空")
              }, trigger: 'blur'
            }
          ],
          attendCourseClassroomId: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "教室id不能为空")
              }, trigger: 'blur'
            }
          ],
        }
      }
    },

    methods: {

      //非空校验
      validator(rule, value, callback, message) {
        if (!value) {
          callback(new Error(message));
        } else {
          callback();
        }
      },
      addCourse(){
        this.$refs.attendcourseForm.validate((valid) => {
          if (valid) {
            this.$message('登陆成功');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 表格内删除按钮点击实现
      onNewClick: function () {
        this.dialogTitle = "新建方案";
        this.dialogVisible = true;
      },
      handleEdit(index, row) {
        this.dialogVisible = true;
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSelectionChange(val) {
        this.attendcourseIds = val.map((item) => item.attendcourseIds);
      },
      //删除选中的数据
      delSelect(){
        //校验
        const {attendcourseIds} = this;

        if(!attendcourseIds.length){
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
          console.log(this.attendcourseIds);
        });

      },
      //打开或关闭添加
      changeAddPageState(){
        const {dialogVisible} = this;

        this.dialogVisible = !dialogVisible;

        //如果是关闭，则清空校验错误信息
        if(!this.dialogVisible){
          this.$refs.attendcourseForm.resetFields();
        }

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
  .functionRight{
    display: inline-block;
    float: right;
  }
  .myclearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
    content: "";
    display: block;
    height: 0;
    clear:both;
    visibility: hidden;
  }
  .myclearfix{
    *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
  }
</style>

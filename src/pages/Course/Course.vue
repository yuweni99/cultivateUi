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
        :data="courses"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          prop="courseId"
          label="id">
        </el-table-column>
        <el-table-column
          prop="courseId"
          label="id">
        </el-table-column>

        <el-table-column
          prop="courseName"
          label="课程名称">
        </el-table-column>
        <el-table-column
            prop="courseDescription"
            label="课程描述">
        </el-table-column>
        <el-table-column
          prop="courseHours"
          label="课程课时">
        </el-table-column>
        <el-table-column
          prop="courseAbleSelectNum"
          label="剩余可选人数">
        </el-table-column>
        <el-table-column
          prop="courseCreatetime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="courseUpdatetime"
          label="修改时间">
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
        <el-form status-icon  ref="courseForm" :model="course" :rules="rules" label-width="150px">
          <el-form-item label="id" prop="courseId">
            <el-input v-model="course.courseId"/>
          </el-form-item>
          <el-form-item label="课程名称" prop="courseName">
            <el-input v-model="course.courseName"/>
          </el-form-item>
          <el-form-item label="课程描述" prop="courseDescription">
            <el-input v-model="course.courseDescription"/>
          </el-form-item>
          <el-form-item label="课程课时" prop="courseHours">
            <el-input v-model="course.courseHours"/>
          </el-form-item>
          <el-form-item label="剩余可选人数" prop="courseAbleSelectNum">
            <el-input v-model="course.courseAbleSelectNum"/>
          </el-form-item>
          <el-form-item label="创建时间" prop="courseCreatetime">
            <el-input v-model="course.courseCreatetime"/>
          </el-form-item>
          <el-form-item label="修改时间" prop="courseUpdatetime">
            <el-input v-model="course.courseUpdatetime"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">添加</el-button>
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
        course: {
          courseId:'',
          courseName: '',
          courseDescription: '',
          courseHours: '',
          courseAbleSelectNum: '',
          courseCreatetime: '',
          courseUpdatetime: '',
        },
        courseIds: [],
        dialogVisible: false,
        courses: [{
          courseId: 1,
          courseName: 'Vue',
          courseDescription: '一个强大的前端框架',
          courseHours: 100,
          courseAbleSelectNum: 50,
          courseCreatetime: '2018/1/01',
          courseUpdatetime: '2018/6/30'
        }],

        message:'',
        rules:{
          courseId: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "id不能为空")
              }, trigger: 'blur'
            }
          ],
          courseName: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "课程名称不能为空")
              }, trigger: 'blur'
            }
          ],
          courseDescription: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "课程描述不能为空")
              }, trigger: 'blur'
            }
          ],
          courseHours: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "课时不能为空")
              }, trigger: 'blur'
            }
          ],
          courseAbleSelectNum: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "剩余可选人数不能为空")
              }, trigger: 'blur'
            }
          ],
          courseCreatetime: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "创建时间不能为空")
              }, trigger: 'blur'
            }
          ],
          courseUpdatetime: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "修改时间不能为空")
              }, trigger: 'blur'
            }
          ],
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
        this.courseIds = val.map((item) => item.courseIds);
      },
      handleClose(){
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
      addCourse(){
        this.$refs.courseForm.validate((valid) => {
          if (valid) {
            this.$message('登陆成功');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除选中的数据
      delSelect(){

        //校验
        const {courseIds} = this;

        if(!courseIds.length){
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
          console.log(this.courseIds);
        });

      },
      //打开或关闭添加
        changeAddPageState(){
          const {dialogVisible} = this;

          this.dialogVisible = !dialogVisible;

          //如果是关闭，则清空校验错误信息
          if(!this.dialogVisible){
            this.$refs.courseForm.resetFields();
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

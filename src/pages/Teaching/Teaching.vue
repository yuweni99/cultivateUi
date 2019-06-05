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
          prop="id"
          label="id">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id">
        </el-table-column>

        <el-table-column
          prop="price"
          label="课程价格">
        </el-table-column>

        <el-table-column
          prop="courseId"
          label="课程id">
        </el-table-column>
        <el-table-column
          prop="status"
          label="课程状态">
        </el-table-column>
        <el-table-column
          prop="classroomId"
          label="教室id">
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
          <el-form-item label="id" prop="id">
            <el-input v-model="attendcourse.id"/>
          </el-form-item>
          <el-form-item label="课程价格" prop="price">
            <el-input v-model="attendcourse.price"/>
          </el-form-item>
          <el-form-item label="课程id" prop="courseId">
            <el-input v-model="attendcourse.courseId"/>
          </el-form-item>
          <el-form-item label="课程状态" prop="status">
            <el-input v-model="attendcourse.status"/>
          </el-form-item>
          <el-form-item label="教室id" prop="classroomId">
            <el-input v-model="attendcourse.classroomId"/>
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime">
            <el-input v-model="attendcourse.createTime"/>
          </el-form-item>
          <el-form-item label="修改时间" prop="updateTime">
            <el-input v-model="attendcourse.updateTime"/>
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
          id:'',
          price: '',
          courseId: '',
          status: '',
          classroomId: '',
          createTime: '',
          updateTime: ''
        },
        //用户选择的记录
        ids:[],
        dialogVisible: false,
        attendcourses: [{
          id: 1,
          price: 100,
          courseId: 1,
          status: '正在上课',
          classroomId: 1001,
          createTime: '2017/01/01',
          updateTime: '2017/02/02'
        }],
        message:'',
        rules:{
          id: [
            { required: true, message: 'id不能为空', trigger: 'blur' },
            { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '课程价格不能为空', trigger: 'blur' },
            { min: 3, max: 4, message: '长度在 3 到 4 个字符', trigger: 'blur' }
          ],
          courseId: [
            { required: true, message: '课程id不能为空', trigger: 'blur' },
            { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '课程状态不能为空', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          classroomId: [
            { required: true, message: '教室id不能为空', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
        this.ids = val.map((item) => item.ids);
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

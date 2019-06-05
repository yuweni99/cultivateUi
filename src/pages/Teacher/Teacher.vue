<template>
  <div class="testProject">
    <div class="function">
      <el-input class="searchInput"
                placeholder="请输入课程名称"
                icon="search"
                v-model="searchName">
      </el-input>
      <el-button class="searchButton" >搜索</el-button>
    </div>
    <div class="functionRight">
      <el-button type="success" @click="onNewClick">添加</el-button>
      <el-button type="primary" @click="delSelect">删除选中</el-button>
    </div>
    <div>
      <el-table
        :data="teachers"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          prop="teacherId"
          label="id">
        </el-table-column>
        <el-table-column
          prop="teacherId"
          label="id">
        </el-table-column>

        <el-table-column
          prop="teacherName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="teacherPassword"
          label="密码">
        </el-table-column>
        <el-table-column
          prop="teacherCreateTime"
          label="用户创建时间">
        </el-table-column>
        <el-table-column
          prop="teacherUpdateTime"
          label="修改时间">
        </el-table-column>
        <el-table-column
          prop="teacherPhone"
          label="手机号码">
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
        <el-form status-icon :model="teacher" :rules="rules" ref="teacherForm" label-width="80px">
          <el-form-item label="id" prop="teacherId">
            <el-input v-model="teacher.teacherId"/>
          </el-form-item>
          <el-form-item label="姓名" prop="teacherName">
            <el-input v-model="teacher.teacherName"/>
          </el-form-item>
          <el-form-item label="密码" prop="teacherPassword">
            <el-input v-model="teacher.teacherPassword"/>
          </el-form-item>
          <el-form-item label="创建时间" prop="teacherCreateTime">
            <el-input v-model="teacher.teacherCreateTime"/>
          </el-form-item>
          <el-form-item label="修改时间" prop="teacherUpdateTime">
            <el-input v-model="teacher.teacherUpdateTime"/>
          </el-form-item>

          <el-form-item label="手机号码" prop="teacherPhone">
            <el-input v-model="teacher.teacherPhone"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addTeacher">添加</el-button>
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
        teacher: {
          teacherId:'',
          teacherName: '',
          teacherPassword: '',
          teacherCreateTime: '',
          teacherUpdateTime: '',
          teacherPhone: ''
        },
        //用户选择的记录
        teacherIds:[],
        dialogVisible: false,
        teachers: [{
          teacherId:1,
          teacherName: '鲁迅',
          teacherPassword: 'luxun666',
          teacherCreateTime: '2017/1/01 08:00:00',
          teacherUpdateTime: '2017/2/01 09:00:00',
          teacherPhone: ''
        }],
        message:'',
        rules:{
          teacherId: [
            { required: true, message: 'id不能为空', trigger: 'blur' },
            { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
          ],
          teacherName: [
            { required: true, message: '姓名不能为空', trigger: 'blur' },
            { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
          ],
          teacherPassword: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
          ],
          teacherCreateTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' },
            { min: 19, max: 20, message: '长度在 19 到 20 个字符', trigger: 'blur' }
          ],
          teacherUpdateTime: [
            { required: true, message: '修改时间不能为空', trigger: 'blur' },
            { min: 19, max: 20, message: '长度在 19 到 20 个字符', trigger: 'blur' }
          ],
          teacherPhone: [
            { required: true, message: '手机号码不能为空', trigger: 'blur' },
            { min: 11, max: 12, message: '长度在 11 到 12 个字符', trigger: 'blur' }
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
      addTeacher(){
        this.$refs.teacherForm.validate((valid) => {
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
        this.teacherIds = val.map((item) => item.teacherIds);
      },
      //删除选中的数据
      delSelect(){
        //校验
        const {teacherIds} = this;

        if(!teacherIds.length){
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
          console.log(this.teacherIds);
        });

      },
      //打开或关闭添加
      changeAddPageState(){
        const {dialogVisible} = this;

        this.dialogVisible = !dialogVisible;

        //如果是关闭，则清空校验错误信息
        if(!this.dialogVisible){
          this.$refs.teacherForm.resetFields();
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

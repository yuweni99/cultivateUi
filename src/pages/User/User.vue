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
        :data="users"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          prop="userId"
          label="id">
        </el-table-column>
        <el-table-column
          prop="userId"
          label="id">
        </el-table-column>

        <el-table-column
          prop="userName"
          label="姓名">
        </el-table-column>

        <el-table-column
          prop="userBelongCourse"
          label="所选课程">
        </el-table-column>
        <el-table-column
          prop="userCourseNum"
          label="所选课程数量">
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="手机号码">
        </el-table-column>
        <el-table-column
          prop="userPassword"
          label="密码">
        </el-table-column>
        <el-table-column
          prop="userCreateTime"
          label="用户创建时间">
        </el-table-column>
        <el-table-column
          prop="userUpdateTime"
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
        <el-form status-icon :model="user" :rules="rules" ref="userForm" label-width="80px">
          <el-form-item label="id" prop="userId">
            <el-input v-model="user.userId"/>
          </el-form-item>
          <el-form-item label="姓名" prop="usertName">
            <el-input v-model="user.usertName"/>
          </el-form-item>

          <el-form-item label="所选课程" prop="userBelongCourse">
            <el-input v-model="user.userBelongCourse"/>
          </el-form-item>
          <el-form-item label="所选课程数量" prop="userCourseNum">
            <el-input v-model="user.userCourseNum"/>
          </el-form-item>
          <el-form-item label="手机号码" prop="userPhone">
            <el-input v-model="user.userPhone"/>
          </el-form-item>
          <el-form-item label="密码" prop="userPassword">
            <el-input v-model="user.userPassword"/>
          </el-form-item>
          <el-form-item label="创建时间" prop="userCreateTime">
            <el-input v-model="user.userCreateTime"/>
          </el-form-item>
          <el-form-item label="修改时间" prop="userUpdateTime">
            <el-input v-model="user.userUpdateTime"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser">添加</el-button>
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
        user: {
          userId:'',
          userName: '',
          userBelongCourse: '',
          userCourseNum: '',
          userPhone: '',
          userPassword: '',
          userCreateTime: '',
          userUpdateTime: ''
        },
        //用户选择的记录
        userIds:[],
        dialogVisible: false,
        users: [{
          userId: 1,
          userName: '张三',
          userBelongCourse: 'JAVA',
          userCourseNum: 1,
          userPhone: 13322334455,
          userPassword: '123456',
          userCreateTime: '2017/2/01',
          userUpdateTime: '2017/3/01'
        }],
        message:'',
        rules:{
          userId: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "id不能为空")
              }, trigger: 'blur'
            }
          ],
          userName: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "姓名不能为空")
              }, trigger: 'blur'
            }
          ],
          userBelongCourse: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "所选课程不能为空")
              }, trigger: 'blur'
            }
          ],
          userCourseNum: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "所选课程数量不能为空")
              }, trigger: 'blur'
            }
          ],
         userPhone: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "手机号码不能为空")
              }, trigger: 'blur'
            }
          ],
          userPassword: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "密码不能为空")
              }, trigger: 'blur'
            }
          ],
          userCreateTime: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "创建时间不能为空")
              }, trigger: 'blur'
            }
          ],
          userUpdateTime: [
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

      //非空校验
      validator(rule, value, callback, message) {
        if (!value) {
          callback(new Error(message));
        } else {
          callback();
        }
      },
      addUser(){
        this.$refs.userForm.validate((valid) => {
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
        this.userIds = val.map((item) => item.userIds);
      },
      //删除选中的数据
      delSelect(){
        //校验
        const {userIds} = this;

        if(!userIds.length){
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
          console.log(this.userIds);
        });

      },
      //打开或关闭添加
      changeAddPageState(){
        const {dialogVisible} = this;

        this.dialogVisible = !dialogVisible;

        //如果是关闭，则清空校验错误信息
        if(!this.dialogVisible){
          this.$refs.userForm.resetFields();
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

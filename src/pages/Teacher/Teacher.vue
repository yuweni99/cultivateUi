<template>
  <div>
    <div class="function">
      <el-input class="searchInput"
                placeholder="用户名"
                icon="search"
                v-model="pageRequestParams.searchName">
      </el-input>
      <el-button class="searchButton" @click="pageQuery">搜索</el-button>
    </div>
    <div class="functionRight">
      <el-button type="success" @click="openEditPage(true)">添加</el-button>
      <el-button type="success" @click="exportTeacher">导出教师</el-button>
      <el-button type="primary" @click="delSelect">删除选中</el-button>
    </div>
    <div>
      <el-table
        :data="teachers"
        border
        v-loading="loading"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
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
              @click="delUser(scope.row.id)">删除
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
        <el-form v-loading="!teacher.id && !isAdd" status-icon ref="userForm" :model="teacher" :rules="rules" label-width="150px">
          <el-form-item label="用户名称:" prop="name">
            <el-input :disabled="!isAdd" v-model="teacher.name"/>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input type="password" show-password v-model="teacher.password"/>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input v-model="teacher.phone"/>
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
  import * as userApi from '../../api/user'
  import axios from 'axios'

  export default {
    data() {
      return {
        isAdd: false, //表单操作类型
        teacher: {
          id:'',
          name: '',
          roleId: 2, //默认教师
          phone: '',
          password: '',
          createTime: '',
          updateTime: ''
        },
        courseMaps: {}, //课程集合
        teachers: [], //老师集合
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
          name: [
            { required: true, message: '课程名称不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ],
          phone: { validator: this.validatorPhone, trigger: 'blur' },
          type: [
            { required: true, message: '用户类型', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      validatorPhone(rule, value, callback){
        if (value === '') {
          callback(new Error('手机号不能为空'));
          return;
        }

        //检验手机号是否合法
        const reg = /^[1][3,4,5,7,8][0-9]{9}$/;

        if(!reg.test(value)){
          callback(new Error('手机号码不合法'));
          return;
        }

        callback();


      },
      // 表格内删除按钮点击实现
      async toEdit(id) {
        //打开弹出层页面
        this.openEditPage(false);
        //查询课程信息
        const result = await userApi.getUser(id);
        if(result.success){
          const {object} = result;
          this.teacher = object;
        }else{
          this.$message(result.message);
          //关闭弹出层界面
          this.changeEditPageState();
        }

      },
      //删除
      delUser(id) {
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
      dels(ids){

        this.$confirm('请注意，删除的数据不可恢复!!!', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

          //发送请求删除数据
          const result = await userApi.delUsers(ids);

          const type = result.success?'success':'info';

          const {success,message} = result;
          if(success){ //删除成功
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
        this.title = isAdd ? '添加用户信息' : '修改用户信息';
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
          this.$refs.userForm.resetFields();
          this.teacher = {};
          this.teacher.roleId = 2;
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
        const searchUser = {searchName};
        const result = await userApi.pageQueryTeacher(pageNum, pageSize, searchUser);

        if (result.success) {
          //获取课程集合
          const {list, total} = result.queryResult;
          this.teachers = this.handleAlias(list); //数据
          this.pageData.total = total; //总记录数

          //关闭遮罩
          this.loading = false;

        } else {
          this.$message(result.message);
        }
      },
      //处理别名
      handleAlias(users){
        const {type,courseMaps} = this; //用户类型

        if(type !== 3){ //其他用户
          return users;
        }

        //普通用户，处理课程别名信息
        return users.map(u => {
          const {courseId} = u;

          if(courseId){
            u.courseAlias = courseMaps[u.courseId].name;
          }
          return u;
        })

      },
      //保存数据
      save(){

        //校验表单
        this.$refs.userForm.validate(async (valid) => {
          if (valid) {

            const {teacher} = this;
            const result = await userApi.saveUser(teacher);

            if(result.success){  //成功
              //讲修改后的新数据保存到课程集合中
              const user = result.object; //新的课程信息

              this.saveUser(user);

              this.$message({
                message: '操作成功',
                type: 'success'
              });
              //关闭弹出层
              this.changeEditPageState();
            }else{ //失败
              this.$message(result.message);
            }

          } else {
            return false;
          }
        });


      },
      //保存或修改新课程信息
      saveUser(user){

        //获取课程集合
        const {teachers} = this;

        //根据id查询下标
        const index = users.findIndex((c) => c.id === user.id);
        if(index !==   -1){ //存在则为修改的数据
          teachers.splice(index,1,user);
        }else{ //添加的新数据
          teachers.splice(teachers.length-1,1); //删除最后一个数据
          teachers.unshift(user); //头部添加一个新数据
        }

        this.teachers = teachers;
      },
      //导出教师
      exportTeacher(){
        // userApi.exportTeacher();
        const BASE_URL = 'http://127.0.0.1:8080';
        `${BASE_URL}/excel/courseExport`

        axios({
          method: 'post',
          url:  `${BASE_URL}/excel/teacherExport`,
          responseType: 'blob'
        }).then(response => {
          console.log(1)
          this.download(response)
        }).catch((error) => {

        })



      },
      // 下载文件
      download (data) {
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xlsx')

        document.body.appendChild(link)
        link.click()
      }

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

</style>

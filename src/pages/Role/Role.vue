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
      <el-button type="primary" @click="delSelect">删除选中</el-button>
    </div>
    <div>
      <el-table
        :data="roles"
        border
        v-loading="loading"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          prop="id"
          label="id">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="toPermissionPage(scope.row.id)">分配许可
            </el-button>
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
        <el-form v-loading="!role.id && !isAdd" status-icon ref="teachingFrom" :model="role" :rules="rules" label-width="150px">
          <el-form-item label="角色名称" prop="name">
            <el-input  v-model="role.name"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="changeEditPageState">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog :visible="isShowPermissionPage" :title="title" :before-close="changeEditPermissionPageState">
        <Permission v-if="isShowPermissionPage" :roleId="roleId" :type="permissionType"/>
      </el-dialog>
    </div>
  </div>
</template>

<script>


  import * as roleApi from '../../api/role'

  import Permission from '../../components/Permission/Permission'

  export default {
    components: {
      Permission
    },
    data() {
      return {
        isShowPermissionPage: false,//是否显示许可页面
        permissionType: 2, //permission页面类型， 2表示分配许可
        isAdd: false, //表单操作类型
        role: {
          id: '',
          name: ''
        },
        roleId: '', //当前角色id
        roles: [],
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
        title: '', //弹框层标题
        message: '',
        rules:{
          name: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      //打开许可分配页面
      toPermissionPage(roleId){

        this.roleId = roleId;

        this.changeEditPermissionPageState();
      },
      //改变许可页面状态
      changeEditPermissionPageState(){
        const isShowPermissionPage = !this.isShowPermissionPage;
        this.isShowPermissionPage = isShowPermissionPage;
      },
      // 表格内删除按钮点击实现
      async toEdit(id) {
        //打开弹出层页面
        this.openEditPage(false);
        //查询课程信息
        const result = await roleApi.getRole(id);
        if(result.success){
          const {object} = result;
          this.role = object;
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
          const result = await roleApi.delRoles(ids);

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
        this.title = isAdd ? '添加角色信息' : '修改角色信息';
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
          this.$refs.teachingFrom.resetFields();
          this.role = {}; //清空课时对象
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
        const result = await roleApi.getRolePageQuery(pageNum, pageSize, searchUser);

        if (result.success) {
          //获取课程集合
          const {list, total} = result.queryResult;
          this.roles = list;
          this.pageData.total = total; //总记录数

          //关闭遮罩
          this.loading = false;

        } else {
          this.$message(result.message);
        }
      },
      //保存数据
      save(){

        //校验表单
        this.$refs.teachingFrom.validate(async (valid) => {
          if (valid) {

            const {role} = this;
            const result = await roleApi.saveRole(role);

            if(result.success){  //成功

              //讲修改后的新数据保存到课程集合中
              const role = result.object; //新的课程信息

              this.saveRole(role);

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
      saveRole(role){
        //获取课程集合
        const {roles} = this;

        //根据id查询下标
        const index = roles.findIndex((c) => c.id === role.id);
        if(index !==   -1){ //存在则为修改的数据
          roles.splice(index,1,role);
        }else{ //添加的新数据
          if(roles.length === 5){
            roles.splice(roles.length-1,1); //删除最后一个数据
          }

          roles.unshift(role); //头部添加一个新数据
        }

        this.roles = roles;
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

</style>

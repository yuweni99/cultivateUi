<template>
  <div>
    <div class="custom-tree-container">
      <div class="block">
        <p v-if="type === 2">
          <el-button
            size="mini"
            @click="distributePermission">分配许可
          </el-button>
        </p>
        <p v-else>许可管理菜单</p>
        <el-tree
          :data="permissions"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          ref="tree"
          :default-checked-keys="permissionIds"
          default-expand-all
          :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-if="type == 1">
          <el-button
            v-if="node.level !== 3"
            type="text"
            size="mini"
            @click="() => openEditPage(true,node)">
            添加许可
          </el-button>
           <el-button
             type="text"
             size="mini"
             @click="() => toEdit(false,node)">
            修改
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => removePermission(node)">
            删除
          </el-button>
        </span>
      </span>
        </el-tree>
      </div>
    </div>
    <div>
      <el-dialog :visible="dialogVisible" :title="title" :before-close="changeEditPageState">
        <el-form status-icon ref="courseForm" :model="permission" :rules="rules" label-width="150px">
          <el-form-item label="许可名称:" prop="name">
            <el-input v-model="permission.name"/>
          </el-form-item>
          <el-form-item v-if="isShowPermissionUrlInput" label="许可路径:" prop="url">
            <el-input v-model="permission.url"/>
          </el-form-item>
          <el-form-item prop="type" label="许可类型">
            <el-radio v-model="permission.type" label="0">菜单</el-radio>
            <el-radio v-model="permission.type" label="1">按钮</el-radio>
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
  import * as permissionApi from '../../api/permission'
  import * as rolePermissionApi from '../../api/rolePermission'


  export default {
    props: {
      type: Number, //1表示许可管理，2表示角色分配许可
      roleId: Number
    },
    data() {

      return {
        permissionIds: [], //用来回显选中
        isAdd: false, //操作类型
        title: '',
        currentNode: {}, //当前节点
        dialogVisible: false,
        permissions: [], //许可集合
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        permission: {
          id: '',
          name: '',
          url: '',
          type: '0', //类型
        },
        rules: {
          name: [
            {required: true, message: '许可名称不能为空', trigger: 'blur'}
          ],
          url: [
            {required: true, message: '许可路径不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      //是否显示许可路径添加input
      isShowPermissionUrlInput() {
        //当前节点级别
        const currentNodeLever = this.currentNode.level;
        return currentNodeLever === 3 || (this.isAdd && currentNodeLever === 2);
      }
    },
    methods: {
      //分配许可
      async distributePermission() {
        //获取角色id
        const roleId = this.roleId;
        //获取选中的菜单的id
        const permissionIds = this.$refs.tree.getCheckedKeys();

        const rolePermissionRequest = {roleId, permissionIds};

        //发送请求
        const result = await rolePermissionApi.saveRole(rolePermissionRequest);

        if (result.success) {

          this.$message({
            message: '操作成功',
            type: 'success'
          });


        } else {
          this.$message(result.message);
        }

      },
      async toEdit(isAdd, currentNode) {
        //打开弹出层页面
        this.openEditPage(isAdd, currentNode);
        //获取当前节点id
        const {id} = currentNode.data;
        //查询课程信息
        const result = await permissionApi.getPermission(id);
        if (result.success) {
          const {object} = result;
          this.permission = object;
        } else {
          this.$message(result.message);
          //关闭弹出层界面
          this.changeEditPageState();
        }

      },
      //type:是否是添加 node:当前节点的node对象
      openEditPage(isAdd, currentNode) {
        this.isAdd = isAdd;
        console.log(1, this.isAdd)
        this.title = isAdd ? '添加许可信息' : '修改许可信息';
        this.changeEditPageState();
        this.currentNode = currentNode;

      },
      async removePermission(node) {

        const data = node.data;

        const id = data.id; //获取id

        //常识删除数据
        const result = await permissionApi.delPermission(id);

        if (result.success) { //删除成功

          this.$message({
            message: '操作成功',
            type: 'success'
          });

          this.remove(node, id); //删除数据，不请求后台重新获取数据
        } else { //删除失败
          this.$message(result.message);
        }

      },
      remove(node, id) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === id);
        children.splice(index, 1);
      },
      //查询许可菜单
      async findPermissions() {

        const result = await permissionApi.getPermissions();

        if (result.success) {
          //取出许可菜单
          this.permissions = result.object;

        }

      },
      //保存节点信息
      save() {

        this.$refs.courseForm.validate(async (valid) => {
          if (valid) {

            const {permission, currentNode, isAdd} = this;

            if (isAdd) { //添加需要增加父id
              permission.pid = currentNode.data.id;
            }

            const result = await permissionApi.savePermission(permission);

            if (result.success) {  //成功

              //讲修改后的新数据保存到课程集合中
              const permission = result.object; //新的课程信息
              console.log(permission);
              this.$message({
                message: '操作成功',
                type: 'success'
              });

              this.savePermission(permission);

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
      changeEditPageState() {
        const {dialogVisible} = this;
        this.dialogVisible = !dialogVisible;
        //动态计算课程信息
        //如果是关闭，则清空校验错误信息
        if (!this.dialogVisible) {
          //清空表单数据校验信息
          this.$refs.courseForm.resetFields();
          this.permission = {};
          this.permission.type = '0';
        }

      },
      //保存许可信息
      savePermission(permission) {

        //获取课程集合
        const {isAdd, currentNode} = this; //操作类型

        let permissions;
        if (isAdd) { //添加
          permissions = currentNode.data.children;
          permissions.push(permission);
        } else { //修改
          permissions = currentNode.parent.data.children;
          const index = permissions.findIndex(p => p.id === permission.id);
          permissions.splice(index, 1, permission);
        }

      },
      async findPermissionIds() {

        const roleId = this.roleId;
        const result = await rolePermissionApi.findPermissionIds(roleId);

        if (result.success) {
          this.permissionIds = result.object;
        } else {
          this.$message(result.message);
        }

      }


    },
    mounted() {

      const type = this.type;
      this.findPermissions();
      if(type === 2){ //如果当前操作类型是分配许可
        this.findPermissionIds();
      }

    }
  };
</script>

<style>
</style>

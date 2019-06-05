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
        :data="teachingAlertnativeTimes"
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
          prop="rank"
          label="顺序">
        </el-table-column>

        <el-table-column
          prop="startTime"
          label="开始时间">
        </el-table-column>

        <el-table-column
          prop="endTime"
          label="结束时间">
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
        <el-form status-icon :model="teachingAlertnativeTime" :rules="rules" ref="teachingAlertnativeTimeForm" label-width="80px">
          <el-form-item label="id" prop="id">
            <el-input v-model="teachingAlertnativeTime.id"/>
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
            <el-input v-model="teachingAlertnativeTime.startTime"/>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-input v-model="teachingAlertnativeTime.endTime"/>
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime">
            <el-input v-model="teachingAlertnativeTime.createTime"/>
          </el-form-item>
          <el-form-item label="修改时间" prop="updateTime">
            <el-input v-model="teachingAlertnativeTime.updateTime"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addTime">添加</el-button>
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
        teachingAlertnativeTime: {
          id:'',
          startTime: '',
          endTime: '',
          rank: '',
          createTime: '',
          updateTime: ''
        },
        //用户选择的记录
        ids:[],
        dialogVisible: false,

        teachingAlertnativeTimes: [{
          id: 1,
          startTime: '8:00',
          endTime: '11:00',
          rank: '',
          createTime: '2017/01/01 08:00:00',
          updateTime: '2017/02/01 08:00:00'
        }],
        message:'',
        rules:{
          id: [
            { required: true, message: 'id不能为空', trigger: 'blur' },
            { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
          ],
          startTime: [
            { required: true, message: '开始时间不能为空', trigger: 'blur' },
            { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
          ],
          endTime: [
            { required: true, message: '结束时间不能为空', trigger: 'blur' },
            { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' },
            { min: 19, max: 20, message: '长度在 19 到 20 个字符', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '修改时间不能为空', trigger: 'blur' },
            { min: 19, max: 20, message: '长度在 19 到 20 个字符', trigger: 'blur' }
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
      addTime(){
        this.$refs.teachingAlertnativeTimeForm.validate((valid) => {
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
        this.teachingAlertnativeTimes = val.map((item) => item.teachingAlertnativeTimes);
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
          this.$refs.teachingAlertnativeTimeForm.resetFields();
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

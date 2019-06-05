<template>
  <div class="testProject">
    <div class="function">
      <el-input class="searchInput"
                placeholder="课程名称"
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
        :data="teachingTimes"
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
          prop="teachingId"
          label="课时授课时间">
        </el-table-column>
        <el-table-column
          prop="teachingTime"
          label="授课时间">
        </el-table-column>
        <el-table-column
          prop="altTimeId"
          label="第几节课">
        </el-table-column>
        <el-table-column
          prop="joinTime"
          label="老师添加该课时的时间">
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
        <el-form status-icon ref="courseTimeForm" :model="teachingTime" :rules="rules" label-width="80px">
          <el-form-item label="id" prop="id">
            <el-input v-model="teachingTime.id"/>
          </el-form-item>
          <el-form-item label="课时授课时间" prop="teachingId">
            <el-input v-model="teachingTime.teachingId"/>
          </el-form-item>
          <el-form-item label="授课时间" prop="teachingTime">
            <el-input v-model="teachingTime.teachingTime"/>
          </el-form-item>

          <el-form-item label="第几节课" prop="altTimeId">
            <el-input v-model="teachingTime.altTimeId"/>
          </el-form-item>
          <el-form-item label="添加时间" prop="joinTime">
            <el-input v-model="teachingTime.joinTime"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addCourseTime">添加</el-button>
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
        teachingTime: {
          id:'',
          teachingId: '',
          teachingTime: '',

          altTimeId: '',
          joinTime: ''
        },
        teachingTimeIds: [],
        dialogVisible: false,
        teachingTimes: [{
          id: 1,
          teachingId: 1,
          teachingTime: '2017/03/01',

          altTimeId: 2,
          joinTime: '2017/02/28'
        }],
        message:'',
        rules:{
          id: [
            { required: true, message: 'id不能为空', trigger: 'blur' },
            { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
          ],
          teachingId: [
            { required: true, message: '课时授课时间不能为空', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          teachingTime: [
            { required: true, message: '授课时间不能为空', trigger: 'blur' },
            { min: 10, max: 11, message: '长度在 10 到 11 个字符', trigger: 'blur' }
          ],
          altTimeId: [
            { required: true, message: '第几节课不能为空', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          joinTime: [
            { required: true, message: '添加时间不能为空', trigger: 'blur' },
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
        this.teachingTimeIds = val.map((item) => item.teachingTimeIds);
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
      addCourseTime(){
        this.$refs.courseTimeForm.validate((valid) => {
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
          this.$refs.courseTimeForm.resetFields();
        }

      },
      //删除选中的数据
      delSelect(){

        //校验
        const {teachingTimeIds} = this;

        if(!teachingTimeIds.length){
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
          console.log(this.teachingTimeIds);
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

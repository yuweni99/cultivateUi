<template>
  <div class="testProject">
    <div class="function">
      <el-input class="searchInput"
                placeholder="请输入教室信息"
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
        :data="classrooms"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          prop="classroomId"
          label="id">
        </el-table-column>
        <el-table-column
          prop="classroomId"
          label="id">
        </el-table-column>

        <el-table-column
          prop="classroomNum"
          label="教室门牌号">
        </el-table-column>
        <el-table-column
          prop="classroomCreateTime"
          label="教室创建时间">
        </el-table-column>
        <el-table-column
          prop="classroomUpdateTime"
          label="教室修改时间">
        </el-table-column>
        <el-table-column
          prop="classroomStatus"
          label="教室状态">
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
        <el-form ref="classroomForm" :model="classroom" :rules="rules" label-width="80px">
          <el-form-item label="教室id" prop="classroomId">
            <el-input v-model="classroom.classroomId"/>
          </el-form-item>
          <el-form-item label="教室门牌号" prop="classroomNum">
            <el-input v-model="classroom.classroomNum"/>
          </el-form-item>
          <el-form-item label="教室创建时间" prop="classroomCreateTime">
            <el-input v-model="classroom.classroomCreateTime"/>
          </el-form-item>
          <el-form-item label="教室修改时间" prop="classroomUpdateTime">
            <el-input v-model="classroom.classroomUpdateTime"/>
          </el-form-item>
          <el-form-item label="教室状态" prop="classroomStatus">
            <el-input v-model="classroom.classroomStatus"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addClassroom">添加</el-button>
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
        classroom: {
          classroomId:'',
          classroomNum: '',
          classroomCreateTime: '',
          classroomUpdateTime: '',
          classroomStatus: ''
        },
        classroomIds: [],
        dialogVisible: false,
        classrooms: [{
          classroomId: 1,
          classroomNum: 1001,
          classroomCreateTime: '2017/02/28',
          classroomUpdateTime: '2017/03/01',
          classroomStatus: '可用'
        }],
        messages:'',
        rules: {
          classroomId: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "教室id不能为空")
              }, trigger: 'blur'
            }
          ],
          classroomNum: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "教室门牌号不能为空")
              }, trigger: 'blur'
            }
          ],
          classroomCreateTime: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "创建时间不能为空")
              }, trigger: 'blur'
            }
          ],
          classroomUpdateTime: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "修改时间不能为空")
              }, trigger: 'blur'
            }
          ],
          classroomStatus: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "教室状态不能为空")
              }, trigger: 'blur'
            }
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
        this.classroomIds = val.map((item) => item.classroomIds);
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
      addClassroom(){
    this.$refs.classroomForm.validate((valid) => {
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
      this.$refs.classroomForm.resetFields();
    }

  },
  //删除选中的数据
  delSelect(){

    //校验
    const {classroomIds} = this;

    if(!classroomIds.length){
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
      console.log(this.classroomIds);
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

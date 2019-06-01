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
        :data="attendcourseTimes"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          prop="attendTimeId"
          label="id">
        </el-table-column>
        <el-table-column
          prop="attendTimeId"
          label="id">
        </el-table-column>

        <el-table-column
          prop="attendTimeAttendCourseId"
          label="该课时属于哪个课程">
        </el-table-column>
        <el-table-column
          prop="attendTimeStart"
          label="开始时间">
        </el-table-column>
        <el-table-column
          prop="attendTimeEnd"
          label="结束时间">
        </el-table-column>
        <el-table-column
          prop="attendTimeStatus"
          label="课时状态">
        </el-table-column>
        <el-table-column
          prop="attendTimeJoinTime"
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
        <el-form status-icon ref="courseTimeForm" :model="attendcourseTime" :rules="rules" label-width="80px">
          <el-form-item label="id" prop="attendTimeId">
            <el-input v-model="attendcourseTime.attendTimeId"/>
          </el-form-item>
          <el-form-item label="课时所属课程" prop="attendTimeAttendCourseId">
            <el-input v-model="attendcourseTime.attendTimeAttendCourseId"/>
          </el-form-item>
          <el-form-item label="开始时间" prop="attendTimeStart">
            <el-input v-model="attendcourseTime.attendTimeStart"/>
          </el-form-item>
          <el-form-item label="结束时间" prop="attendTimeEnd">
            <el-input v-model="attendcourseTime.attendTimeEnd"/>
          </el-form-item>
          <el-form-item label="课时状态" prop="attendTimeStatus">
            <el-input v-model="attendcourseTime.attendTimeStatus"/>
          </el-form-item>
          <el-form-item label="添加时间" prop="attendTimeJoinTime">
            <el-input v-model="attendcourseTime.attendTimeJoinTime"/>
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
        attendcourseTime: {
          attendTimeId:'',
          attendTimeAttendCourseId: '',
          attendTimeStart: '',
          attendTimeEnd: '',
          attendTimeStatus: '',
          attendTimeJoinTime: ''
        },
        attendcourseTimeIds: [],
        dialogVisible: false,
        attendcourseTimes: [{
          attendTimeId: 1,
          attendTimeAttendCourseId: 1,
          attendTimeStart: '2017/03/01',
          attendTimeEnd: '2017/06/30',
          attendTimeStatus: '取消',
          attendTimeJoinTime: '2017/02/28'
        }],
        message:'',
        rules:{
          attendTimeId: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "id不能为空")
              }, trigger: 'blur'
            }
          ],
          attendTimeAttendCourseId: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "课时所属课程不能为空")
              }, trigger: 'blur'
            }
          ],
          attendTimeStart: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "开始时间不能为空")
              }, trigger: 'blur'
            }
          ],
          attendTimeEnd: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "结束时间不能为空")
              }, trigger: 'blur'
            }
          ],
          attendTimeStatus: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "课时状态不能为空")
              }, trigger: 'blur'
            }
          ],
          attendTimeJoinTime: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "添加时间不能为空")
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
        this.attendcourseTimeIds = val.map((item) => item.attendcourseTimeIds);
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
        const {attendcourseTimeIds} = this;

        if(!attendcourseTimeIds.length){
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
          console.log(this.attendcourseTimeIds);
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

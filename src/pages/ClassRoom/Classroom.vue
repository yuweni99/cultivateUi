<template>
  <div class="testProject">
    <div class="function">
      <el-input class="searchInput"
                placeholder="课程名称/课程描述"
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
        :data="classrooms"
        border
        v-loading="loading"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          prop="id">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>

        <el-table-column
          prop="name"
          label="门牌号">
        </el-table-column>
        <el-table-column
          prop="status"
          label="是否已用">
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
              @click="toEdit(scope.row.id)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="delCourse(scope.row.id)">删除
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
        <el-form status-icon ref="classForm" :model="classroom" :rules="rules" label-width="150px">
          <el-form-item label="门牌号:" prop="name">
            <el-input v-model="classroom.name"/>
          </el-form-item>
          <el-form-item  label="状态">
              <el-radio :disabled="!isAdd" v-model="classroom.status" :label="0">可选</el-radio>
              <el-radio :disabled="!isAdd" v-model="classroom.status" :label="1">不可选</el-radio>
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

  import * as classroomApi from '../../api/classroom'

  export default {
    data() {
      return {
        isAdd: false, //表单操作类型
        classroom: {
          id:'',
          name: '',
          createTime: '',
          updateTime: '',
          status: 0 //0可选,1不可选
        },
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
        classrooms: [], //教室集合
        title: '', //弹框层标题
        message: '',
        rules: {
          name: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "门牌号不能为空")
              }, trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      // 表格内删除按钮点击实现
      async toEdit(id) {
        //打开弹出层页面
        this.openEditPage(false);
        //查询课程信息
        const result = await classroomApi.getCourse(id);
        if(result.success){
          const {object} = result;
          this.classroom = object;
        }else{
          this.$message(result.message);
          //关闭弹出层界面
          this.changeEditPageState();
        }

      },
      //删除
      delCourse(id) {
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
          const result = await classroomApi.delCourses(ids);

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
        this.title = isAdd ? '添加教室信息' : '修改教室信息';
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
          this.$refs.classForm.resetFields();
          this.course = {};
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
        const searchCourse = {searchName};
        const result = await classroomApi.getCoursePageQuery(pageNum, pageSize, searchCourse);

        if (result.success) {
          //获取课程集合
          const {list, total} = result.queryResult;
          this.classrooms = list; //数据
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
        this.$refs.classForm.validate(async (valid) => {
          if (valid) {

            const {classroom} = this;
            const result = await classroomApi.saveCourse(classroom);

            if(result.success){  //成功

              //讲修改后的新数据保存到课程集合中
              const classroom = result.object; //新的课程信息

              this.saveClassroom(classroom);

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
      saveClassroom(classroom){

        //获取课程集合
        const {classrooms} = this;

        //根据id查询下标
        const index = classrooms.findIndex((c) => c.id === classroom.id);
        if(index !==   -1){ //存在则为修改的数据
          classrooms.splice(index,1,classroom);
        }else{ //添加的新数据
          classrooms.splice(classrooms.length-1,1); //删除最后一个数据
          classrooms.unshift(classroom); //头部添加一个新数据
        }

        this.classrooms = classrooms;
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

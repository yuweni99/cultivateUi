<template>
  <div class="testProject">
    <div class="function">
      <el-input class="searchInput"
                placeholder="请输入课程名称"
                icon="search"
                v-model="pageRequestParams.searchName">
      </el-input>
      <el-button class="searchButton">搜索</el-button>
    </div>
    <div class="functionRight">
      <el-button type="success" @click="openEditPage(true)">添加</el-button>
      <el-button type="primary" @click="delSelect">删除选中</el-button>
    </div>
    <div>
      <el-table
        :data="courses"
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
          label="id">
        </el-table-column>

        <el-table-column
          prop="name"
          label="课程名称">
        </el-table-column>
        <el-table-column
            prop="description"
            label="课程描述">
        </el-table-column>
        <el-table-column
          prop="teachingNum"
          label="课程课时">
        </el-table-column>
        <el-table-column
          prop="ableSelectNum"
          label="剩余可选人数">
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
                     :page-size="pageRequestParams.pageSize"
                     :total="pageData.total">
      </el-pagination>
    </div>
    <div>
      <el-dialog :visible="dialogVisible" :title="title" :before-close="handleClose">
        <el-form status-icon  ref="courseForm" :model="course" :rules="rules" label-width="150px">
          <el-form-item label="id" prop="id">
            <el-input v-model="course.id"/>
          </el-form-item>
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="course.name"/>
          </el-form-item>
          <el-form-item label="课程描述" prop="description">
            <el-input v-model="course.description"/>
          </el-form-item>
          <el-form-item label="课程课时" prop="teaching_num">
            <el-input v-model="course.teachingNum"/>
          </el-form-item>
          <el-form-item label="剩余可选人数" prop="ableSelectNum">
            <el-input v-model="course.ableSelectNum"/>
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime">
            <el-input v-model="course.createTime"/>
          </el-form-item>
          <el-form-item label="修改时间" prop="updateTime">
            <el-input v-model="course.updateTime"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">添加</el-button>
            <el-button @click="changeEditPageState">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  import * as courseApi from '../../api/course'

  export default {
    data() {
      return {
        course: {
          id:'',
          name: '',
          description: '',
          teachingNum: '',
          ableSelectNum: '',
          createTime: '',
          updateTime: '',
        },
        pageRequestParams: {
          pageSize: 5, //每页记录数默认为5
          pageNum: 1, //起始页
          searchName:'', //搜索字段
        },
        pageData: {
          total: 1, //总记录数
        },
        loading: false, //遮罩效果
        ids: [],
        dialogVisible: false,
        courses: [], //课程数组
        title: '', //弹框层标题
        message:'',
        rules:{
          id: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "id不能为空")
              }, trigger: 'blur'
            }
          ],
          name: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "课程名称不能为空")
              }, trigger: 'blur'
            }
          ],
          description: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "课程描述不能为空")
              }, trigger: 'blur'
            }
          ],
          teaching_num: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "课时不能为空")
              }, trigger: 'blur'
            }
          ],
          ableSelectNum: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "剩余可选人数不能为空")
              }, trigger: 'blur'
            }
          ],
          createTime: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "创建时间不能为空")
              }, trigger: 'blur'
            }
          ],
          updateTime: [
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
      // 表格内删除按钮点击实现
      handleEdit(index, row) {
        console.log(index, row);
        this.openEditPage(false);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSelectionChange(val) {
        this.ids = val.map((item) => item.ids);
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
      addCourse(){
        this.$refs.courseForm.validate((valid) => {
          if (valid) {
            this.$message('登陆成功');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
      openEditPage(isAdd){ //type true为添加,false为修改
        this.title = isAdd? '添加课程信息': '修改课程信息';
        this.changeEditPageState();
      },
      //更改弹出层页面状态
      changeEditPageState(){
          const {dialogVisible} = this;
          this.dialogVisible = !dialogVisible;
          //动态计算课程信息
          //如果是关闭，则清空校验错误信息
          if(!this.dialogVisible){
            this.$refs.courseForm.resetFields();
          }

      },
      //分页查询数据
      async pageQuery(){

        const {pageSize,pageNum,searchName} = this.pageRequestParams;

        //构建搜索过滤对象
        const searchCourse = {name: searchName,description: searchName}
        const result = await courseApi.reqCoursePageQuery(pageNum,pageSize,searchCourse);

        if(result.success){
          //获取课程集合
          const {list,total} = result.queryResult;
          this.courses = list; //数据
          this.pageData.total = total; //总记录数

        }else{
          this.$message(result.message);
        }


      }
    },
    mounted(){

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
  .functionRight{
    display: inline-block;
    float: right;
  }

</style>

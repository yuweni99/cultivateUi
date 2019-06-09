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
        :data="teachings"
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
          prop="price"
          label="课程价格">
        </el-table-column>

        <el-table-column
          prop="courseAlias"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="statusAlias"
          label="课程状态">
        </el-table-column>
        <el-table-column
          prop="classroomAlias"
          label="教室名称">
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
        <el-form v-loading="!teaching.id && !isAdd" status-icon ref="teachingFrom" :model="teaching" :rules="rules" label-width="150px">
          <el-form-item label="课时价格" prop="price">
            <el-input type="number" min="0" v-model="teaching.price"/>
          </el-form-item>
          <el-form-item label="课程名称" prop="courseId">
            <el-select v-model="teaching.courseId" placeholder="请选择课程">
              <el-option v-for="(course,index) in courseMaps" :key="index" :label="course.name" :value="course.id"/>
            </el-select>
          </el-form-item>
          <el-form-item  label="课时状态">
            <el-radio :disabled="!isAdd" v-model="teaching.status" :label="0">未上</el-radio>
            <el-radio :disabled="!isAdd" v-model="teaching.status" :label="1">已上</el-radio>
          </el-form-item>
          <el-form-item label="教室" prop="classroomId">
            <el-select v-model="teaching.classroomId" placeholder="请选择课程">
              <el-option v-for="(classroom,index) in classroomMaps" :key="index" :label="classroom.name" :value="classroom.id"/>
            </el-select>
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

  import * as teachingApi from '../../api/teaching'
  import * as courseApi from '../../api/course'
  import * as classroomApi from '../../api/classroom'

  export default {
    data() {
      return {
        isAdd: false, //表单操作类型
        teaching: {
          id:'',
          price: '',
          courseId: '',
          status: 0, //默认为未上
          classroomId: '',
          createTime: '',
          updateTime: ''
        },
        courseMaps: {}, //课程对象map
        classroomMaps: {}, //教室对象map
        teachings: [], //课时集合
        users: [], //用户集合
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
          price: [
            { required: true, message: '课程价格不能为空', trigger: 'blur' }
          ],
          courseId: [
            { required: true, message: '课程不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '课程状态不能为空', trigger: 'blur' }
          ],
          classroomId: [
            { required: true, message: '教室不能为空', trigger: 'blur' }
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
        const result = await teachingApi.getTeaching(id);
        if(result.success){
          const {object} = result;
          this.teaching = object;
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
          const result = await teachingApi.delTeachings(ids);

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
        this.title = isAdd ? '添加课时信息' : '修改课时信息';
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
          this.teaching = {}; //清空课时对象
          this.teaching.status = 0;
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
        const result = await teachingApi.getTeachingPageQuery(pageNum, pageSize, searchUser);

        if (result.success) {
          //获取课程集合
          const {list, total} = result.queryResult;
          console.log(new Date());
          this.teachings = list.map(t => this.handleAlias(t));
          console.log(new Date());
          this.pageData.total = total; //总记录数

          //关闭遮罩
          this.loading = false;

        } else {
          this.$message(result.message);
        }
      },
      //处理别名数据
      handleAlias(teaching){
        const {courseMaps,classroomMaps} = this;
        teaching.statusAlias = teaching.status?'已上':'未上'; //添加状态别名
        teaching.courseAlias = courseMaps[teaching.courseId].name; //课程别名
        teaching.classroomAlias = classroomMaps[teaching.classroomId].name; //教室别名
        return teaching;
      },
      //保存数据
      save(){

        //校验表单
        this.$refs.teachingFrom.validate(async (valid) => {
          if (valid) {

            const {teaching} = this;
            const result = await teachingApi.saveTeaching(teaching);

            if(result.success){  //成功

              //讲修改后的新数据保存到课程集合中
              const teaching = result.object; //新的课程信息

              this.saveTeaching(teaching);

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
      saveTeaching(teaching){

        //处理别名
        this.handleAlias(teaching);
        //获取课程集合
        const {teachings} = this;

        //根据id查询下标
        const index = teachings.findIndex((c) => c.id === teaching.id);
        if(index !==   -1){ //存在则为修改的数据
          teachings.splice(index,1,teaching);
        }else{ //添加的新数据
          if(teachings.length === 5){
            teachings.splice(teachings.length-1,1); //删除最后一个数据
          }

          teachings.unshift(teaching); //头部添加一个新数据
        }

        this.teachings = teachings;
      },
      //查询课程集合
      async getCourses(){
        const result = await courseApi.getCourses();
        if(result.success){
          this.courseMaps = result.object;
        }
      },
      //查询所有可用的教室
      async getAbleuseClssromms(){
        const result = await classroomApi.getAbleuseClssromms();
        if(result.success){
          this.classroomMaps = result.object;
        }
      }

    },
    mounted() {
      this.getCourses();
      this.getAbleuseClssromms();
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

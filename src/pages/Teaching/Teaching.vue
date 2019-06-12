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
    </div>
    <div>
      <el-table
        :data="teachings"
        border
        v-loading="loading">
        <el-table-column
          prop="id"
          label="id">
        </el-table-column>

        <el-table-column
          prop="price"
          label="课程价格">
        </el-table-column>

        <el-table-column
          prop="courseName"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="statusName"
          label="课程状态">
        </el-table-column>
        <el-table-column
          prop="description"
          label="课时描述">
        </el-table-column>
        <el-table-column
          prop="courseNum"
          label="课时顺序">
        </el-table-column>
        <el-table-column
          prop="classroomName"
          label="教室名称">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 0"
              size="mini"
              @click="toEdit(scope.row.id)">编辑
            </el-button>
            <el-button
              v-if="scope.row.status === 0"
              size="mini"
              type="danger"
              @click="del(scope.row.id)">删除
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
          <el-form-item label="课程名称" prop="courseTeacherId">
            <el-select v-model="teaching.courseTeacherId" placeholder="请选择课程">
              <el-option v-for="(course,index) in courseMaps" :key="index" :label="course.name" :value="course.id"/>
            </el-select>
          </el-form-item>
          <el-form-item  label="课时描述" prop="description">
            <el-input  v-model="teaching.description"/>
          </el-form-item>
          <el-form-item  label="课时标题" prop="title">
            <el-input  v-model="teaching.title"/>
          </el-form-item>
          <el-form-item label="教室" prop="classroomId">
            <el-select v-model="teaching.classroomId" placeholder="请选择课程">
              <el-option v-for="(classroom,index) in classroomMaps" :key="index" :label="classroom.name" :value="classroom.id"/>
            </el-select>
          </el-form-item>
          <el-form-item  label="上课日期" prop="teachingDate">
            <el-input type="date" v-model="teaching.teachingDate"/>
          </el-form-item>
          <el-form-item label="上课时间" prop="altTimeId">
            <el-select v-model="teaching.altTimeId" placeholder="请选择上课时间">
              <el-option v-for="(altTime,index) in altTimes" :key="index" :label="`${altTime.startTime}-${altTime.endTime}`" :value="altTime.id"/>
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
  import * as altTimeApi from '../../api/altTime'
  import * as courseTeacherApi from '../../api/courseTeacher'
  import * as classroomApi from '../../api/classroom'

  export default {
    data() {
      return {
        isAdd: false, //表单操作类型
        teaching: {
          id:'',
          price: '',
          courseTeacherId: '', //课程id
          status: 0, //默认为未上
          altTimeId: '',//上课时间
          classroomId: '',
          createTime: '',
          updateTime: '',
          teachingDate: ''//上课日期
        },
        courseMaps: {}, //课程对象map
        classroomMaps: {}, //教室对象map
        altTimes: [], //上课时间集合
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
          description: [
            { required: true, message: '课时描述不能为空', trigger: 'blur' }
          ],
          courseTeacherId: [
            { required: true, message: '课程不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '课时标题不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '课程状态不能为空', trigger: 'blur' }
          ],
          classroomId: [
            { required: true, message: '教室不能为空', trigger: 'blur' }
          ],
          altTimeId: [
            { required: true, message: '上课时间不能为空', trigger: 'blur' }
          ],
          teachingDate: [
            { required: true, message: '上课日期不能为空', trigger: 'blur' }
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
      //非空校验
      validator(rule, value, callback, message) {
        if (!value) {
          callback(new Error(message));
        } else {
          callback();
        }
      },
      //删除选中的数据

      //删除课程集合调用方法
      del(id){

        this.$confirm('请注意，删除的数据不可恢复!!!', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

          //发送请求删除数据
          const result = await teachingApi.delTeaching(id);

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
          this.teachings = list;
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

            const {teaching} = this;
            const result = await teachingApi.saveTeaching(teaching);

            if(result.success){  //成功

              //讲修改后的新数据保存到课程集合中
              const teaching = result.object; //新的课程信息

              this.$message({
                message: '操作成功',
                type: 'success'
              });
              //关闭弹出层
              this.changeEditPageState();

              this.pageQuery();
            }else{ //失败
              this.$message(result.message);
            }

          } else {
            return false;
          }
        });


      },
      //查询课程集合
      async getCourses(){
        const result = await courseTeacherApi.getCourses();
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
      },
      //查询所有上课时间
      async getAltTimes(){
        const result = await altTimeApi.getAltTimes();
        if(result.success){
          this.altTimes = result.object;
        }
      }
    },
    mounted() {
      this.getAltTimes();
      this.getAbleuseClssromms();
      this.pageQuery();
      this.getCourses();

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

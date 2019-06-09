<template>
  <div class="testProject">
    <div class="function">
      <!--<el-input class="searchInput"
                placeholder="课程名称/课程描述"
                icon="search"
                v-model="pageRequestParams.searchName">
      </el-input>
      <el-button class="searchButton" @click="pageQuery">搜索</el-button>-->
    </div>
    <div class="functionRight">
      <el-button type="success" @click="openEditPage(true)">添加</el-button>
      <el-button type="primary" @click="delSelect">删除选中</el-button>
    </div>
    <div>
      <el-table
        :data="alternativeTimes"
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
          prop="rank"
          label="顺序">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="描述">
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
        <el-form status-icon ref="classForm" :model="alternativeTime" :rules="rules" label-width="150px">
          <el-form-item label="开始时间" prop="startTime">
            <el-input type="time" v-model="alternativeTime.startTime"/>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-input type="time" v-model="alternativeTime.endTime"/>
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

  import * as alternativeTimeApi from '../../api/alternativeTime'

  export default {
    data() {
      return {
        isAdd: false, //表单操作类型
        alternativeTime: {
          id:'',
          startTime: '',
          endTime: '',
          rank: '',
          createTime: '',
          updateTime: ''
        },
        alternativeTimes: [],
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
          startTime: [
            { required: true, message: '开始时间不能为空', trigger: 'blur' },
          ],
          endTime: [
            { required: true, message: '结束时间不能为空', trigger: 'blur' },
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
        const result = await alternativeTimeApi.getAlternativeTime(id);
        if(result.success){
          const {object} = result;
          this.alternativeTime = object;
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
          const result = await alternativeTimeApi.delAlternativeTimes(ids);

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
          this.alternativeTime = {};
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
        const result = await alternativeTimeApi.getAlternativeTimePageQuery(pageNum, pageSize, searchCourse);

        if (result.success) {
          //获取课程集合
          const {list, total} = result.queryResult;
          this.alternativeTimes = this.handelAlias(list); //数据
          this.pageData.total = total; //总记录数

          //关闭遮罩
          this.loading = false;

        } else {
          this.$message(result.message);
        }
      },
      //处理别名
      handelAlias(alternativeTimes){

        alternativeTimes.forEach(alternativeTime => {
          const {rank} = alternativeTime;
          alternativeTime.desc = `第${rank}节课`;
        });

        return alternativeTimes;
      },
      //保存数据
      save(){

        //校验表单
        this.$refs.classForm.validate(async (valid) => {
          if (valid) {
            const {alternativeTime} = this;
            const result = await alternativeTimeApi.saveAlternativeTime(alternativeTime);

            if(result.success){  //成功

              //讲修改后的新数据保存到课程集合中
              const alternativeTime = result.object; //新的课程信息

              this.saveAlternativeTime(alternativeTime);

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
      //保存或修改上课时间信息
      saveAlternativeTime(alternativeTime){

        //获取课程集合
        const {alternativeTimes} = this;

        //根据id查询下标
        const index = alternativeTimes.findIndex((c) => c.id === alternativeTime.id);
        if(index !==   -1){ //存在则为修改的数据
          alternativeTimes.splice(index,1,alternativeTime);
        }else{ //添加的新数据
          alternativeTimes.splice(alternativeTimes.length-1,1); //删除最后一个数据
          alternativeTimes.unshift(alternativeTime); //头部添加一个新数据
        }

        this.alternativeTimes = alternativeTimes;
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

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
    </div>
    <div>
      <el-table
        :data="users"
        border
        v-loading="loading"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
         prop="courseName"
         label="课程名称">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
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
  </div>
</template>

<script>
  import * as userApi from '../../api/user'

  export default {
    data() {
      return {
        isAdd: false, //表单操作类型
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
      }
    },
    methods: {

      //分页查询数据
      async pageQuery() {

        const {pageSize, pageNum, searchName} = this.pageRequestParams;
        //构建搜索过滤对象
        const searchUser = {searchName};
        const result = await userApi.pageQueryUser(pageNum, pageSize, searchUser);

        if (result.success) {
          //获取课程集合
          const {list, total} = result.queryResult;
          this.users = list; //数据
          this.pageData.total = total; //总记录数

          //关闭遮罩
          this.loading = false;

        } else {
          this.$message(result.message);
        }
      },
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

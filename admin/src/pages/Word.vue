<template>
  <Layout :default-active="'/admin/word'">
      <div class="pg-main-header">
        <el-select v-model="formBoxClassify" @change="handleClassifyChange" placeholder="请选择分类">
          <el-option
            label="全部分类"
            value="">
          </el-option>
          <el-option
            v-for="item in classifys"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button style="margin-left: 40px;" type="primary" @click="handleAdd">添加单词</el-button>
        <el-pagination
          style="float: right;margin-right: 40px;"
          background
          layout="prev, pager, next"
          :disabled="paginationDisabled"
          @current-change="pageChange"
          :page-size="pagination.pageSize"
          :current-page="pagination.page"
          :total="pagination.total">
        </el-pagination>

        <el-dialog :title="formBoxTitle" :visible="formBoxShow" :show-close="false">
          <el-form >
            <el-form-item label="名称" label-width="80px">
              <el-input name="name" v-model="formBoxName"></el-input>
            </el-form-item>
            <el-form-item label="英文音标" label-width="80px">
              <el-input name="pronunciation" v-model="formBoxPronunciation"></el-input>
            </el-form-item>
            <el-form-item label="中文发音" label-width="80px">
              <el-input name="display" v-model="formBoxDisplay"></el-input>
            </el-form-item>
            <el-form-item label="描述" label-width="80px">
              <el-input type="textarea" name="description" :rows="4" v-model="formBoxDescription"></el-input>
            </el-form-item>
            <el-form-item label="分类" label-width="80px">
              <el-select v-model="formBoxClassify" @change="handleClassifyChange" placeholder="请选择分类">
                <el-option
                  v-for="item in classifys"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button @click="handleCancel">取消</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="pg-main-body">
        <el-table
          v-loading="loading"
          :data="tableData"
          size="small"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="id"
            width="50">
            <template slot-scope="scope">
              <span>{{(scope.$index + 1) + ( (pagination.page - 1) * pagination.pageSize) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="pronunciation"
            label="英文音标"
            width="120">
          </el-table-column>
          <el-table-column
            prop="display"
            label="中文发音"
            width="120">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="classify_name"
            label="分类"
            width="120">
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button  type="text" icon="el-icon-edit" @click="handleEdit(scope.row,scope.$index)">编辑</el-button>
              <el-button  type="text" icon="el-icon-delete" @click="handleDelete(scope.row,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout'
import classifyModel from '@/models/classify'
import wordModel from '@/models/word'

export default {
  data () {
    return {
      loading: true,
      paginationDisabled: true,
      pagination: {
        page: 1,
        total: 20,
        pageSize: 10,
      },
      classifys: [],
      tableData: [],
      dataIndex: null,
      formBoxID: null,
      formBoxShow: false,
      formBoxTitle: '',
      formBoxName: '',
      formBoxDescription: '',
      formBoxPronunciation: '',
      formBoxDisplay: '',
      formBoxClassify: '',
    }
  },
  created () {
    this.getClassify();
    this.getWord();
  },
  methods: {
    handleClassifyChange() {
      this.pagination.page = 1;
      this.getWord();
    },
    pageChange(page) {
      this.pagination.page = page;
      this.getWord();
    },
    getClassify() {
      this.paginationDisabled = true;
      this.loading = true;
      classifyModel.list().then( res => {
        this.classifys = res.classifys;
        this.paginationDisabled = false;
        this.loading = false;
      })
    },
    getWord() {
      let limit = this.pagination.pageSize;
      let page = this.pagination.page;
      let classify_id = this.formBoxClassify || undefined;
      let params = { limit, page, classify_id };
      wordModel.list(params).then( res => {
        this.tableData = res.words;
        this.pagination = res.pagination;
      })
    },
    handleAdd() {
      this.formBoxShow = true;
      this.formBoxTitle = '添加单词';
      this.formBoxID = '';
      this.formBoxName = '';
      this.formBoxDisplay = '';
      this.formBoxDescription = '';
      this.formBoxPronunciation = '';

    },
    handleCancel() {
      this.formBoxShow = false;
    },
    handleEdit(data,index) {
      this.dataIndex = index
      this.formBoxTitle = '编辑单词';
      this.formBoxID = data.id;
      this.formBoxName = data.name;
      this.formBoxDisplay = data.display;
      this.formBoxDescription = data.description;
      this.formBoxClassify = data.classify_id;
      this.formBoxPronunciation = data.pronunciation;
      this.formBoxShow = true;
    },
    handleSave() {
      let id = this.formBoxID;
      let index = this.dataIndex;

      let name = this.formBoxName;
      let description = this.formBoxDescription;
      let pronunciation = this.formBoxPronunciation;
      let display = this.formBoxDisplay;
      let classify_id = this.formBoxClassify;

      let params = { name, description, pronunciation, display, classify_id };
      if(!name || !pronunciation || !description || !display || !classify_id ){
        this.$message.error('缺少必要参数')
        return
      }

      // 修改
      if(id){
        wordModel.update(id,params)
          .then(() => {
            params.id = id;
            this.$set(this.tableData,index,params)
            this.formBoxShow = false;
            this.$message.success('修改成功');
          })
          .catch(()=>{
            this.formBoxShow = false;
          })
      // 添加
      }else{
        wordModel.add(params)
          .then(res => {
            let id = res.id;
            params.id = id;
            this.tableData.unshift(params)
            this.formBoxShow = false;
            this.$message.success('添加成功');
          })
          .catch(()=>{
            this.$message.error('发生错误');
            this.formBoxShow = false;
          })
      }
    },
    handleDelete(data,index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(()=>{
        return wordModel.delete(data.id)
      })
      .then(()=>{
        this.tableData.splice(index,1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  components: {
    Layout
  }
}
</script>

<style lang="less">
  .pg-main-body{
    margin-top: 20px;
  }

  .image-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover{
      border-color: #409EFF;
    }

    .image-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .image {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>

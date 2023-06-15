<template>
  <div class="container">
    <el-card shadow="always" style="height: 75px; margin-bottom: 15px">
      <el-form :inline="true" size="normal" class="top-form">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入搜索的用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default">搜索</el-button>
          <el-button type="default" size="default">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" size="default">添加用户</el-button>
      <el-button type="danger" size="default">批量删除</el-button>
      <el-table style="margin: 10px 0" border>
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column align="center" label="#序号"></el-table-column>
        <el-table-column align="center" label="#ID"></el-table-column>
        <el-table-column align="center" label="#用户名字"></el-table-column>
        <el-table-column align="center" label="#用户名称"></el-table-column>
        <el-table-column align="center" label="#用户角色"></el-table-column>
        <el-table-column align="center" label="#创建时间"></el-table-column>
        <el-table-column align="center" label="#更新时间"></el-table-column>
        <el-table-column align="center" label="#操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  name: "index",
};
</script>
<style lang="scss" scoped>
.container {
  .top-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

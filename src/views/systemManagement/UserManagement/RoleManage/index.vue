<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import ElementPlus from 'element-plus'
const { ElMessage, ElMessageBox } = ElementPlus

interface RoleItem {
  id: number
  name: string
  code: string
  description: string
  status: number
  createTime: string
  updateTime: string
}

// 搜索表单数据
const searchForm = reactive({
  name: '',
  code: '',
  status: ''
})

// 角色列表数据
const roleList = ref<RoleItem[]>([])
const loading = ref(false)

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 状态选项
const statusOptions = [
  { label: '全部', value: '' },
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
]

// 获取角色列表数据
const getRoleList = () => {
  loading.value = true
  // 模拟数据，实际项目中应该调用API
  setTimeout(() => {
    // 模拟后端返回的数据
    const mockData: RoleItem[] = []
    for (let i = 1; i <= 20; i++) {
      mockData.push({
        id: i,
        name: `角色${i}`,
        code: `ROLE_${i}`,
        description: `这是角色${i}的描述信息`,
        status: i % 3 === 0 ? 0 : 1,
        createTime: '2023-05-20 12:00:00',
        updateTime: '2023-05-21 12:00:00'
      })
    }

    // 根据筛选条件过滤
    let filteredData = mockData.filter((item) => {
      let nameMatch = true
      let codeMatch = true
      let statusMatch = true

      if (searchForm.name) {
        nameMatch = item.name.includes(searchForm.name)
      }

      if (searchForm.code) {
        codeMatch = item.code.includes(searchForm.code)
      }

      if (searchForm.status !== '') {
        statusMatch = item.status === Number(searchForm.status)
      }

      return nameMatch && codeMatch && statusMatch
    })

    // 计算总数
    pagination.total = filteredData.length

    // 分页处理
    const start = (pagination.currentPage - 1) * pagination.pageSize
    const end = start + pagination.pageSize
    roleList.value = filteredData.slice(start, end)

    loading.value = false
  }, 500)
}

// 重置搜索表单
const resetSearchForm = () => {
  searchForm.name = ''
  searchForm.code = ''
  searchForm.status = ''
  pagination.currentPage = 1
  getRoleList()
}

// 处理页码变化
const handleCurrentChange = (val: number) => {
  pagination.currentPage = val
  getRoleList()
}

// 处理每页条数变化
const handleSizeChange = (val: number) => {
  pagination.pageSize = val
  pagination.currentPage = 1
  getRoleList()
}

// 处理角色状态切换
const handleStatusChange = (row: RoleItem) => {
  const statusText = row.status === 1 ? '禁用' : '启用'
  const newStatus = row.status === 1 ? 0 : 1

  ElMessageBox.confirm(`确定要${statusText}角色"${row.name}"吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 实际项目中应调用API
      row.status = newStatus
      ElMessage({
        type: 'success',
        message: `已${statusText}`
      })
    })
    .catch(() => {
      // 取消操作后恢复原状态
      ElMessage({
        type: 'info',
        message: '已取消操作'
      })
    })
}

// 编辑角色
const handleEdit = (row: RoleItem) => {
  ElMessage({
    type: 'info',
    message: `编辑角色: ${row.name}`
  })
  // 在此处理编辑逻辑，如打开编辑对话框
}

// 删除角色
const handleDelete = (row: RoleItem) => {
  ElMessageBox.confirm(`确定要删除角色"${row.name}"吗？该操作不可恢复`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 实际项目中应调用API
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getRoleList()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除'
      })
    })
}

// 在组件挂载时获取数据
onMounted(() => {
  getRoleList()
})
</script>

<template>
  <div class="role-manage-container">
    <!-- 搜索区域 -->
    <div class="search-area">
      <el-form :model="searchForm" inline>
        <el-form-item label="角色名称">
          <el-input v-model="searchForm.name" placeholder="请输入角色名称" clearable />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="searchForm.code" placeholder="请输入角色编码" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRoleList">查询</el-button>
          <el-button @click="resetSearchForm">重置</el-button>
          <el-button type="success">新增角色</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格区域 -->
    <div class="table-area">
      <div class="table-container">
        <el-table
          v-loading="loading"
          :data="roleList"
          border
          style="width: 100%; height: 100%"
          :border-cell-style="{ 'background-color': 'transparent' }"
          :header-cell-style="{ 'background-color': 'var(--el-table-header-bg-color)' }"
          :cell-style="{ 'background-color': 'var(--el-table-bg-color)' }"
          :resizable="false"
        >
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="name" label="角色名称" show-overflow-tooltip />
          <el-table-column prop="code" label="角色编码" show-overflow-tooltip />
          <el-table-column prop="description" label="描述" show-overflow-tooltip />
          <el-table-column prop="status" label="状态" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="row.status === 1 ? 'success' : 'danger'">
                {{ row.status === 1 ? '启用' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip />
          <el-table-column label="操作" width="220" align="center">
            <template #default="{ row }">
              <el-button type="primary" link @click="handleEdit(row)"> 编辑 </el-button>
              <el-button
                :type="row.status === 1 ? 'danger' : 'success'"
                link
                @click="handleStatusChange(row)"
              >
                {{ row.status === 1 ? '禁用' : '启用' }}
              </el-button>
              <el-button type="danger" link @click="handleDelete(row)"> 删除 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.role-manage-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .search-area {
    margin-bottom: 20px;
    padding: 15px;
    background-color: var(--el-bg-color);
    border-radius: 4px;
    border: 1px solid var(--el-border-color-light);
    flex-shrink: 0;
  }

  .table-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: var(--el-bg-color);
    border-radius: 4px;
    padding: 15px;
    border: 1px solid var(--el-border-color-light);
    overflow: hidden;

    .table-container {
      flex: 1;
      overflow: auto;
    }

    .pagination-container {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      flex-shrink: 0;
    }
  }
}

/* 修复表格拖拽列时的红色区域问题 */
:deep(.el-table) {
  .el-table__column-resize-proxy {
    background-color: var(--el-border-color-darker);
    opacity: 0.3;
  }

  .el-table__border-right-patch {
    background-color: transparent;
  }

  .el-table__fixed-right-patch {
    background-color: var(--el-bg-color);
  }
}
</style>

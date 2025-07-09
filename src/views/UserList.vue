<template>
  <div class="table-container">
    <div class="card">
      <div class="mb-4">
        <h2 class="table-title">User List</h2>
        <Button
          label="Add User"
          icon="pi pi-plus"
          class="p-button-success"
          @click="showAddUserModal = true"
        />
      </div>

      <DataTable
        :value="users"
        stripedRows
        tableStyle="min-width: 50rem"
        class="p-datatable-custom"
        :loading="loading"
      >
        <Column field="id" header="ID" sortable />
        <Column field="name" header="Name" sortable />
        <Column field="username" header="Username" />
        <Column field="email" header="Email" />
        <Column header="">
          <template #body="{ data }">
            <button
              class="edit-button"
              @click="editUser(data.id)"
              title="Edit User"
            >
              <i class="pi pi-pencil"></i>
            </button>
          </template>
        </Column>
      </DataTable>

      <AddUserModal v-model:visible="showAddUserModal" @save-user="addUser" />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import AddUserModal from "@/components/modals/AddUserModal.vue";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import Button from "primevue/button";

  const store = useStore();
  const router = useRouter();

  const loading = ref(false);
  const showAddUserModal = ref(false);

  const users = computed(() => store.getters.getUsers);

  const fetchUsers = async () => {
    loading.value = true;
    try {
      await store.dispatch("fetchUsers");
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      loading.value = false;
    }
  };

  const editUser = (id) => {
    router.push({ name: "EditUser", params: { id } });
  };

  const addUser = async (newUser) => {
    await store.dispatch("addUser", newUser);
    showAddUserModal.value = false;
    await fetchUsers();
  };

  onMounted(() => {
    fetchUsers();
  });
</script>

<style scoped>
  .table-container {
    display: flex;
    justify-content: center;
    padding: 1rem;
    margin-top: 5rem;
  }

  .card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    width: 100%;
    max-width: 90rem;
    overflow-x: auto;
  }

  .table-container {
    max-height: 39rem;
  }

  .table-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #0b2050;
    text-align: left;
  }

  .p-datatable-custom {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: auto;
    scrollbar-width: thin;
  }

  .p-datatable-custom .p-datatable-header {
    background: #0b2050;
    color: white;
    font-weight: 600;
    padding: 1rem;
  }

  .p-datatable-custom .p-datatable-thead > tr > th {
    background: #0b2050;
    color: white;
    border-bottom: 2px solid #304367;
    padding: 0.75rem;
    text-align: left;
    font-size: 1rem;
  }

  .p-datatable-custom .p-datatable-tbody > tr {
    transition: background-color 0.2s;
  }

  .p-datatable-custom .p-datatable-tbody > tr:hover {
    background-color: #f5f7fa;
  }

  .p-datatable-custom .p-datatable-tbody > tr > td {
    padding: 0.75rem;
    font-size: 0.95rem;
    color: #333;
    border-bottom: 1px solid #e0e0e0;
  }

  .p-datatable-custom .p-sortable-column .p-column-header-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .p-button-success {
    background: #31529f;
    border: 2px solid transparent;
    color: white;
    float: right;
    outline: none;
    box-shadow: none;
    transition: background 0.3s, color 0.3s;
  }

  .p-button-success:not(:disabled):hover {
    background: #526ba7;
    color: white;
    border: 2px solid transparent;
    outline: none;
    box-shadow: none;
  }

  .p-button-text {
    background: #efc6ca;
    border-color: transparent;
    color: #e30618;
  }

  .edit-button {
    background: none;
    border: none;
    cursor: pointer;
    color: #0b2050;
    font-size: 1rem;
    padding: 0.5rem;
    transition: color 0.2s;
  }

  .edit-button:hover {
    background-color: #526ba7;
    border-radius: 10px;
    color: white;
  }

  @media (max-width: 768px) {
    .table-container {
      padding: 1rem;
    }

    .card {
      padding: 1rem;
    }

    .p-datatable-custom {
      min-width: unset;
    }
  }
</style>

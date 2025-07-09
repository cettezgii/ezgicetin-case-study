<template>
  <div class="table-container">
    <div class="card">
      <div class="mb-4">
        <h2 class="table-title">User List</h2>
        <Button
          label="Add User"
          icon="pi pi-plus"
          class="p-button-success"
          @click="openModal"
        />
      </div>
      <DataTable
        :value="users"
        stripedRows
        tableStyle="min-width: 50rem"
        class="p-datatable-custom"
        :loading="loading"
      >
        <Column field="id" header="ID" sortable></Column>
        <Column field="name" header="Name" sortable></Column>
        <Column field="username" header="Username"></Column>
        <Column field="email" header="Email"></Column>
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

<script>
  import { mapGetters } from "vuex";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import Button from "primevue/button";
  import AddUserModal from "@/components/modals/AddUserModal.vue";

  export default {
    name: "UserList",
    components: { DataTable, Column, Button, AddUserModal },
    data() {
      return {
        loading: false,
        showAddUserModal: false,
      };
    },
    computed: {
      ...mapGetters(["getUsers"]),
      users() {
        return this.getUsers;
      },
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        this.loading = true;
        await this.$store.dispatch("fetchUsers");
        this.loading = false;
      },
      editUser(id) {
        this.$router.push({ name: "EditUser", params: { id } });
      },
      openModal() {
        this.showAddUserModal = true;
      },
      async addUser(newUser) {
        await this.$store.dispatch("addUser", newUser);
        this.showAddUserModal = false;
        await this.fetchUsers();
      },
    },
  };
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

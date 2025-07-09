<template>
  <Dialog
    v-model:visible="localVisible"
    header="Add New User"
    modal
    :style="{ width: '30rem' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
  >
    <div class="p-field" v-for="field in formFields" :key="field.id">
      <label :for="field.id">{{ field.label }}</label>
      <component
        :is="field.component"
        :id="field.id"
        v-model="newUser[field.model]"
        v-bind="field.attrs"
        class="w-full"
      />
    </div>

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="closeModal"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-success"
        @click="handleSave"
        :disabled="!isFormValid"
      />
    </template>
  </Dialog>
</template>

<script>
  import Dialog from "primevue/dialog";
  import Button from "primevue/button";
  import InputText from "primevue/inputtext";
  import InputNumber from "primevue/inputnumber";

  export default {
    name: "AddUserModal",
    components: { Dialog, Button, InputText, InputNumber },
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        localVisible: this.visible,
        newUser: {
          id: null,
          name: "",
          username: "",
          email: "",
        },
      };
    },
    computed: {
      isFormValid() {
        const { id, name, username, email } = this.newUser;
        return id && name.trim() && username.trim() && email.trim();
      },
      formFields() {
        return [
          {
            id: "id",
            label: "ID",
            model: "id",
            component: "InputNumber",
            attrs: { required: true },
          },
          {
            id: "name",
            label: "Name",
            model: "name",
            component: "InputText",
            attrs: { required: true },
          },
          {
            id: "username",
            label: "Username",
            model: "username",
            component: "InputText",
            attrs: { required: true },
          },
          {
            id: "email",
            label: "Email",
            model: "email",
            component: "InputText",
            attrs: { required: true, type: "email" },
          },
        ];
      },
    },
    watch: {
      visible(newValue) {
        this.localVisible = newValue;
      },
      localVisible(newValue) {
        this.$emit("update:visible", newValue);
      },
    },
    methods: {
      closeModal() {
        this.localVisible = false;
        this.resetForm();
      },
      handleSave() {
        this.$emit("save-user", { ...this.newUser });
        this.resetForm();
      },
      resetForm() {
        this.newUser = { id: null, name: "", username: "", email: "" };
      },
    },
  };
</script>

<style scoped>
  .p-field {
    margin-bottom: 1rem;
  }

  .p-field label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .p-field .p-inputtext,
  .p-field .p-inputnumber {
    width: 100%;
  }

  .p-button-success {
    background: #31529f;
    border: none;
    color: white;
  }

  .p-button-success:not(:disabled):hover {
    background: #526ba7;
    color: white;
  }

  .p-button-text {
    background: #efc6ca;
    border-color: transparent;
    color: #e30618;
  }
</style>

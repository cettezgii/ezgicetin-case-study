<template>
  <Dialog
    v-model:visible="visible"
    header="Add New User"
    modal
    :style="{ width: '45rem' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
  >
    <form @submit.prevent="handleSubmit">
      <TabView v-model:activeIndex="activeTab">
        <TabPanel header="User Info">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              v-model="user.name"
              id="name"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              id="username"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              id="email"
              type="email"
              class="form-input"
              required
            />
          </div>
        </TabPanel>

        <TabPanel header="Address Info">
          <div class="form-group">
            <label for="street">Street</label>
            <input
              v-model="user.address.street"
              id="street"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label for="suite">Suite</label>
            <input
              v-model="user.address.suite"
              id="suite"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label for="city">City</label>
            <input
              v-model="user.address.city"
              id="city"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label for="zipcode">Zipcode</label>
            <input
              v-model="user.address.zipcode"
              id="zipcode"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label for="lat">Latitude</label>
            <input
              v-model="user.address.geo.lat"
              id="lat"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label for="lng">Longitude</label>
            <input
              v-model="user.address.geo.lng"
              id="lng"
              type="text"
              class="form-input"
              required
            />
          </div>
        </TabPanel>

        <TabPanel header="Contact Info">
          <div class="form-group">
            <label for="phone">Phone</label>
            <input
              v-model="user.phone"
              id="phone"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label for="website">Website</label>
            <input
              v-model="user.website"
              id="website"
              type="text"
              class="form-input"
              required
            />
          </div>
        </TabPanel>

        <TabPanel header="Company Info">
          <div class="form-group">
            <label for="companyName">Company Name</label>
            <input
              v-model="user.company.name"
              id="companyName"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label for="catchPhrase">Catch Phrase</label>
            <input
              v-model="user.company.catchPhrase"
              id="catchPhrase"
              type="text"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label for="bs">Business Strategy</label>
            <input
              v-model="user.company.bs"
              id="bs"
              type="text"
              class="form-input"
              required
            />
          </div>
        </TabPanel>
      </TabView>

      <div
        class="form-actions"
        style="
          margin-top: 1rem;
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        "
      >
        <button
          type="button"
          class="next-button"
          :disabled="activeTab >= 3"
          @click="goToNextTab"
        >
          Next
        </button>
        <button
          type="submit"
          class="submit-button"
          :disabled="!isFormValid"
          :title="!isFormValid ? 'Please fill in all required fields' : ''"
        >
          Save
        </button>
      </div>
    </form>
  </Dialog>
</template>

<script setup>
  import { reactive, ref, watch, computed } from "vue";
  import Dialog from "primevue/dialog";
  import TabView from "primevue/tabview";
  import TabPanel from "primevue/tabpanel";
  import { defineEmits, defineProps } from "vue";

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
  });

  const emit = defineEmits(["update:modelValue", "save-user"]);

  const visible = ref(props.modelValue);

  watch(
    () => props.modelValue,
    (newVal) => {
      visible.value = newVal;
      if (!newVal) resetForm();
    }
  );

  watch(visible, (val) => {
    emit("update:modelValue", val);
  });

  const user = reactive({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const activeTab = ref(0);

  const isFormValid = computed(() =>
    Object.values({
      ...user,
      ...user.address,
      ...user.address.geo,
      ...user.company,
    }).every((val) => val.trim?.() !== "")
  );

  const resetForm = () => {
    Object.assign(user, {
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    });
    activeTab.value = 0;
  };

  const handleSubmit = () => {
    if (!isFormValid.value) return;
    emit("save-user", { ...user });
    resetForm();
    visible.value = false;
    emit("update:modelValue", false);
  };

  const goToNextTab = () => {
    if (activeTab.value < 3) activeTab.value += 1;
  };
</script>

<style scoped>
  .form-group {
    margin-bottom: 1rem;
  }

  .form-input {
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }

  .submit-button {
    background-color: #4a76cd;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    cursor: pointer;
  }

  .submit-button:disabled {
    background-color: #a0b3e6;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .next-button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    cursor: pointer;
  }

  .next-button:disabled {
    background-color: #85e89d;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .submit-button:hover:not(:disabled) {
    background-color: #3a5bb5;
  }

  .next-button:hover:not(:disabled) {
    background-color: #218838;
  }
</style>

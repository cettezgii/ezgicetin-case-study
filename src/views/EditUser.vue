<template>
  <div class="edit-user-container">
    <div class="card">
      <h2 class="form-title">Edit User</h2>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="form-content">
        <form @submit.prevent="updateUser">
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
          <div class="form-actions">
            <button type="submit" class="submit-button">Save</button>
            <button type="button" class="cancel-button" @click="cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useStore } from "vuex";
  import TabView from "primevue/tabview";
  import TabPanel from "primevue/tabpanel";

  const activeTab = ref(0);
  const loading = ref(false);
  const error = ref(null);

  const user = reactive({
    id: null,
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

  const route = useRoute();
  const router = useRouter();
  const store = useStore();

  async function fetchUser() {
    loading.value = true;
    error.value = null;
    try {
      const id = route.params.id;
      await store.dispatch("fetchUserById", id);
      const fetchedUser = store.getters.getUserById(id);
      if (fetchedUser) {
        user.id = parseInt(id);
        user.name = fetchedUser.name || "";
        user.username = fetchedUser.username || "";
        user.email = fetchedUser.email || "";
        user.phone = fetchedUser.phone || "";
        user.website = fetchedUser.website || "";

        user.address.street = fetchedUser.address?.street || "";
        user.address.suite = fetchedUser.address?.suite || "";
        user.address.city = fetchedUser.address?.city || "";
        user.address.zipcode = fetchedUser.address?.zipcode || "";
        user.address.geo.lat = fetchedUser.address?.geo?.lat || "";
        user.address.geo.lng = fetchedUser.address?.geo?.lng || "";

        user.company.name = fetchedUser.company?.name || "";
        user.company.catchPhrase = fetchedUser.company?.catchPhrase || "";
        user.company.bs = fetchedUser.company?.bs || "";
      } else {
        error.value = "User not found";
      }
    } catch (err) {
      error.value = "Failed to load user data";
    } finally {
      loading.value = false;
    }
  }

  async function updateUser() {
    loading.value = true;
    error.value = null;
    try {
      await store.dispatch("updateUser", user);
      router.push({ name: "UsersList" });
    } catch (err) {
      error.value = "Failed to update user";
    } finally {
      loading.value = false;
    }
  }

  function cancel() {
    router.push({ name: "UsersList" });
  }

  onMounted(() => {
    fetchUser();
  });
</script>

<style scoped>
  :deep(.p-tabview-ink-bar) {
    height: 3px;
    background-color: #4a76cd;
  }
</style>

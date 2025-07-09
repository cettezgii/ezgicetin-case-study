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

<script>
  import { mapGetters } from "vuex";
  import TabView from "primevue/tabview";
  import TabPanel from "primevue/tabpanel";

  export default {
    name: "EditUser",
    components: {
      TabView,
      TabPanel,
    },
    data() {
      return {
        activeTab: 0, // Varsayılan olarak User Info sekmesi seçili
        user: {
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
        },
        loading: false,
        error: null,
      };
    },
    computed: {
      ...mapGetters(["getUserById"]),
    },
    created() {
      this.fetchUser();
    },
    methods: {
      async fetchUser() {
        this.loading = true;
        try {
          const id = this.$route.params.id;
          await this.$store.dispatch("fetchUserById", id);
          const user = this.getUserById(id);
          if (user) {
            this.user = {
              ...this.user,
              ...user,
              id: parseInt(id),
              address: {
                ...this.user.address,
                ...user.address,
                geo: {
                  ...this.user.address.geo,
                  ...user.address.geo,
                },
              },
              company: {
                ...this.user.company,
                ...user.company,
              },
            };
          } else {
            this.error = "User not found";
          }
        } catch (err) {
          this.error = "Failed to load user data";
        } finally {
          this.loading = false;
        }
      },
      async updateUser() {
        this.loading = true;
        try {
          await this.$store.dispatch("updateUser", this.user);
          this.$router.push({ name: "UsersList" });
        } catch (err) {
          this.error = "Failed to update user";
        } finally {
          this.loading = false;
        }
      },
      cancel() {
        this.$router.push({ name: "UsersList" });
      },
    },
  };
</script>

<style scoped>
  :deep(.p-tabview-ink-bar) {
    height: 3px;
    background-color: #4a76cd;
  }
</style>

<template>
  <div class="nav-bar-layout">
    <img
      src="@/assets/images/fitPanelLogo.png"
      class="navbar-logo"
      @click="goHome"
    />
    <div>
      <Menubar :model="items" />
    </div>
  </div>
</template>

<script>
  import { defineComponent, computed } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import Menubar from "primevue/menubar";

  export default defineComponent({
    name: "NavbarMenu",
    components: { Menubar },
    setup() {
      const router = useRouter();
      const route = useRoute();

      const goHome = () => {
        router.push("/");
      };

      const items = computed(() => [
        {
          label: "Home",
          icon: "pi pi-home",
          command: () => {
            router.push("/");
          },
          class: route.path === "/" ? "active" : "",
        },
        {
          label: "Users List",
          icon: "pi pi-users",
          command: () => {
            router.push("/users");
          },
          class: route.path === "/users" ? "active" : "",
        },
      ]);

      return {
        items,
        goHome,
      };
    },
  });
</script>

<style>
  .nav-bar-layout {
    background-color: #0b2050;
    height: 75px;
    padding: 0;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
  }

  .nav-bar-layout img {
    height: 75px;
    cursor: pointer;
  }

  .nav-bar-layout .p-menubar {
    display: flex !important;
    align-items: center !important;
    color: var(--p-menubar-color);
    padding: var(--p-menubar-padding);
    gap: var(--p-menubar-gap);
    background: none;
    border: none;
  }
  .navbar-logo {
    height: 75px;
    cursor: pointer;
  }
  .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover {
    background: #304367 !important;
  }

  .p-menubar-item.active > .p-menubar-item-content {
    background: #304367 !important;
  }

  .p-menubar-item-label {
    line-height: 1;
    color: #9aa0a7;
  }

  .p-menubar-item.active .p-menubar-item-label {
    color: white;
  }
</style>

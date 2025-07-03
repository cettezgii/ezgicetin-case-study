<template>
  <div>
    <div class="home-banner">
      <img src="@/assets/homeBackground.png" />
    </div>
    <div class="dashboard-section">
    <h1>Dashboard</h1>
    <p class="overview-title">Overview of your gym's performance</p>
    <div class="stats-container">
      <Card
        v-for="(stat, index) in stats"
        :key="index"
        class="stat-card"
      >
        <template #content>
          <div class="stat-content">
            <i :class="['pi', stat.icon, 'stat-icon']"></i>
            <div>
              <h3>{{ stat.title }}</h3>
              <p>{{ stat.value }}</p>
            </div>
          </div>
        </template>
      </Card>
    </div>
    </div>
    <div class="membership-section">
      <h1>Membership Trends</h1>
      <span>Membership Growth </span>
      <h2>+250%</h2>
       <img src="@/assets/chart.png" style="width: 40%;height: 80%;"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Card from 'primevue/card';
import 'primeicons/primeicons.css';

export default defineComponent({
  name: 'HomePage',
  components: {
    Card
  },
  data() {
    return {
      stats: [
        { title: 'Total Users', value: 350, icon: 'pi-users' },
        { title: 'New Sign-ups', value: 25, icon: 'pi-user-plus' },
        { title: 'Monthly Growth', value: '12%', icon: 'pi-chart-line' },
        { title: 'Active Members', value: 198, icon: 'pi-check-circle' }
      ]
    };
  }
});
</script>

<style scoped>
.home-banner {
  width: 100%;
  height: 350px;
  margin-top: 105px;
}

.home-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.stat-card {
  flex: 1 1 calc(25% - 1rem);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2rem;
  color: #7CBAD4;
}
.dashboard-section, .membership-section{
  padding: 20px;
}
.overview-title{
  color: #0000006e;
}


</style>

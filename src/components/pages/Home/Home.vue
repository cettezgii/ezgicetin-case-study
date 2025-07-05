<template>
  <div class="home-container">
    <div class="home-banner">
      <img src="@/assets/homeBackground.png" alt="Gym Background" />
    </div>
    <div class="dashboard-section">
      <h1 class="dashboard-title">Dashboard</h1>
      <p class="overview-title">Overview of your gym's performance</p>
      <div class="stats-container">
        <Card v-for="(stat, index) in stats" :key="index" class="stat-card">
          <template #content>
            <div class="stat-content">
              <i :class="['pi', stat.icon, 'stat-icon']"></i>
              <div class="stat-text">
                <h3 class="stat-title">{{ stat.title }}</h3>
                <p class="stat-value">{{ stat.value }}</p>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <div class="row">
      <div class="col-6 membership-section">
        <h1 class="section-title">Membership Trends</h1>
        <span class="section-subtitle">Membership Growth</span>
        <h2 class="growth-rate">+250%</h2>
        <img src="@/assets/chart.png" alt="Membership Chart" class="chart-image" />
      </div>
      <div class="col-6 membership-section">
        <h1 class="section-title">Monthly Calendar</h1>
        <span class="section-subtitle">Check the club activities</span>
        <img src="@/assets/calender.png" alt="Calendar" class="chart-image" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Card from 'primevue/card';
import 'primeicons/primeicons.css';

export default defineComponent({
  name: 'HomePage',
  components: { Card },
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
.home-container {
  padding: 0 20px;
}

.home-banner {
  width: 100%;
  margin-top: 100px;
}

.home-banner img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
}

.dashboard-section {
  padding: 20px 0;
}

.dashboard-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a2b5b;
  margin-bottom: 0.5rem;
}

.overview-title {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.stat-card {
  flex: 1 1 calc(25% - 1rem);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 1rem;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-icon {
  font-size: 1.5rem;
  color: #7cbad4;
}

.stat-text {
  flex-grow: 1;
}

.stat-title {
  font-size: 0.9rem;
  color: #333;
  margin: 0;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a2b5b;
  margin: 0.25rem 0 0;
}

.membership-section {
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a2b5b;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 0.85rem;
  color: #666;
  display: block;
  margin-bottom: 0.5rem;
}

.growth-rate {
  font-size: 1.75rem;
  font-weight: 700;
  color: #7cbad4;
  margin: 0.5rem 0;
}

.chart-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.row {
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;
}

.col-6 {
  flex: 1 1 calc(50% - 10px);
  min-width: 300px;
}

@media (max-width: 768px) {
  .stats-container {
    flex-direction: column;
  }
  .stat-card {
    flex: 1 1 100%;
  }
  .row {
    flex-direction: column;
    gap: 10px;
  }
  .col-6 {
    flex: 1 1 100%;
    min-width: auto;
  }
  .home-banner img {
    height: 200px;
  }
}
</style>
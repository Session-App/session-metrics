<template>
  <div class="page">
    <div class="page-title">Utilisateurs</div>
    <DateRangePicker
      :initialPeriod="selectedPeriod"
      @selection-updated="getData"
    />
    <div class="numbers">
      <div class="title">Total</div>
      <div class="values">
        <Number label="Utilisateurs" :value="accountsCreatedTotal" />
        <Number
          label="Localisation acceptée"
          :value="usersAcceptedLocationTotal"
          :compareValue="accountsCreatedTotal"
        />
        <Number
          label="Notifications acceptées"
          :value="usersAcceptedNotificationsTotal"
          :compareValue="accountsCreatedTotal"
        />
        <Number
          label="Sports favoris"
          :value="favoriteSportsTotal"
          :compareValue="accountsCreatedTotal"
        />
        <Number
          label="Photos de profil"
          :value="usersWithProfilePictureTotal"
          :compareValue="accountsCreatedTotal"
        />
        <Number
          label="Bio"
          :value="usersWithBioTotal"
          :compareValue="accountsCreatedTotal"
        />
        <Number
          label="Android"
          :value="platformAndroidTotal"
          :compareValue="accountsCreatedTotal"
        />
        <Number
          label="iOS"
          :value="platformIOSTotal"
          :compareValue="accountsCreatedTotal"
        />
        <Number
          label="Plateforme inconnue"
          :value="platformUnknown"
          :compareValue="accountsCreatedTotal"
        />
      </div>
    </div>
    <div class="numbers">
      <div class="title">Sur la période</div>
      <div class="values">
        <Number label="Comptes créés" :value="usersCreatedPeriodTotal" />
        <Number
          label="Sports favoris"
          :value="favoriteSportsPeriodTotal"
          :compareValue="usersCreatedPeriodTotal"
        />
        <Number label="Messages envoyés" :value="messagesSentPeriodTotal" />
      </div>
    </div>
    <div class="list">
      <UsersList
        :users="usersConnectedPeriod"
        label="Utilisateurs connectés (sur la période)"
      />
    </div>
    <div class="charts">
      <LineChart
        v-if="accountsCreatedPeriod.length !== 0"
        :labels="['Comptes créés', 'Sports favoris sélectionnés']"
        label="Comptes créés"
        :data="[accountsCreatedPeriod, favoriteSportsPeriod]"
        :from="selectedPeriod.from"
        :to="selectedPeriod.to"
      />
      <LineChart
        v-if="activeUsersPeriod.length !== 0"
        :labels="['Utilisateurs actifs']"
        label="Utilisateurs actifs"
        :data="[activeUsersPeriod]"
        :from="selectedPeriod.from"
        :to="selectedPeriod.to"
      />
      <LineChart
        v-if="messagesSent.length !== 0"
        :labels="['Messages envoyés']"
        label="Messsages envoyés"
        :data="[messagesSent]"
        :from="selectedPeriod.from"
        :to="selectedPeriod.to"
      />
      <PieChart
        v-if="favoriteSportsChosen"
        label="Sports favoris"
        :data="favoriteSportsChosen"
      />
    </div>
    <Map
      title="Dernières connexions"
      :points="userLocations"
      v-if="userLocations.length !== 0"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getUsersActivity } from 'boot/apiCalls.js'
import { totalFromPeriod } from 'boot/helpers.js'
import LineChart from 'components/charts/LineChart.vue'
import PieChart from 'components/charts/PieChart.vue'
import Number from 'components/charts/Number.vue'
import DateRangePicker from 'components/dates/DateRangePicker.vue'
import Map from 'components/others/Map.vue'
import UsersList from 'components/others/UsersList.vue'

export default defineComponent({
  name: 'Users',
  components: { LineChart, PieChart, Number, DateRangePicker, Map, UsersList },
  data() {
    return {
      selectedPeriod: {
        to: '',
        from: '',
      },
      accountsCreatedTotal: 0,
      usersAcceptedLocationTotal: 0,
      usersAcceptedNotificationsTotal: 0,
      usersWithBioTotal: 0,
      favoriteSportsTotal: 0,
      favoriteSportsPeriodTotal: 0,
      usersCreatedPeriodTotal: 0,
      usersWithProfilePictureTotal: 0,
      platformAndroidTotal: 0,
      platformIOSTotal: 0,
      platformUnknown: 0,
      messagesSentPeriodTotal: 0,
      usersConnectedPeriod: [],
      accountsCreatedPeriod: [],
      favoriteSportsPeriod: [],
      activeUsersPeriod: [],
      messagesSent: [],
      favoriteSportsChosen: null,
      userLocations: [],
    }
  },
  created() {
    const today = new Date()
    let from = new Date()
    from.setDate(today.getDate() - 10)
    this.selectedPeriod.from = from.toISOString().substring(0, 10)
    this.selectedPeriod.to = new Date().toISOString().substring(0, 10)
    this.getData()
  },
  methods: {
    getData(selectedPeriod) {
      const period = selectedPeriod ?? this.selectedPeriod
      getUsersActivity(period).then((data) => {
        this.selectedPeriod = { ...period }
        this.accountsCreatedTotal = data.accountsCreatedTotal
        this.usersAcceptedLocationTotal = data.usersAcceptedLocationTotal
        this.usersAcceptedNotificationsTotal =
          data.usersAcceptedNotificationsTotal
        this.usersWithBioTotal = data.usersWithBioTotal
        this.favoriteSportsTotal = data.favoriteSportsTotal
        this.usersWithProfilePictureTotal = data.usersWithProfilePictureTotal
        this.accountsCreatedPeriod = data.accountsCreatedPeriod
        this.favoriteSportsPeriod = data.favoriteSportsPeriod
        this.activeUsersPeriod = data.activeUsersPeriod
        this.messagesSent = data.messagesSent
        this.favoriteSportsChosen = data.favoriteSportsChosen[0]
        this.userLocations = data.userLocations
        this.usersCreatedPeriodTotal = totalFromPeriod(
          this.accountsCreatedPeriod
        )
        this.messagesSentPeriodTotal = totalFromPeriod(this.messagesSent)
        this.favoriteSportsPeriodTotal = totalFromPeriod(
          this.favoriteSportsPeriod
        )
        this.usersConnectedPeriod = data.usersConnectedPeriod
        data.platforms.forEach((entry) => {
          if (entry.name === 'ios') {
            this.platformIOSTotal += entry.amount
          } else if (entry.name === 'android') {
            this.platformAndroidTotal += entry.amount
          } else {
            this.platformUnknown += entry.amount
          }
        })
      })
    },
  },
})
</script>
<style lang="scss" scoped></style>

<template>
  <div class="user-details">
    <div class="user-avatar">
      <vs-avatar size="70" badge badge-color="#28164F">
        <i class="bx bx-user"></i>
        <template #badge>
          {{ userDetails.id }}
        </template>
      </vs-avatar>
      <h2>{{ userDetails.username }}</h2>
    </div>
    <div>
      <p><i class="bx bx-mail-send"></i>&nbsp;{{ userDetails.email }}</p>
      <p><i class="bx bxs-phone-call"></i>&nbsp;{{ userDetails.mobile }}</p>
      <p>Member since {{ formatDate(userDetails.createdAt) }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UserDetails",
  computed: {
    ...mapState("profile", ["userDetails", "userListings"]),
  },
  methods: {
    formatDate(rawDate) {
      return Date(Date.parse(rawDate) * 1000)
        .toLocaleString("en-us")
        .split(" ")
        .slice(1, 4)
        .join(" ");
    },
  },
};
</script>

<style>
.user-details {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.user-avatar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
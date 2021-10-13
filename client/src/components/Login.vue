<template>
  <div>
    <h1>LOGIN</h1>
    <vs-row justify="space-around">
      <vs-col w="4">
        <vs-input
          v-model="username"
          dark
          state="dark"
          label="Username"
          placeholder="Username"
        />
      </vs-col>
    </vs-row>
    <vs-row justify="space-around">
      <vs-col w="4">
        <vs-input
          type="password"
          v-model="password"
          dark
          state="dark"
          label="Password"
          placeholder="Password"
          :progress="getProgress"
          :visiblePassword="hasVisiblePassword"
          icon-after
          @click-icon="hasVisiblePassword = !hasVisiblePassword"
        >
          <template #icon>
            <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
            <i v-else class="bx bx-hide"></i>
          </template>

          <template v-if="getProgress >= 100" #message-success>
            Secure password
          </template>
        </vs-input>
      </vs-col>
    </vs-row>
    <vs-row justify="space-around">
      <vs-col w="4">
        <vs-button :active="active == 1" @click="active = 1"> Login </vs-button>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    active: 0,
    hasVisiblePassword: false,
    username: "",
    password: "",
  }),
};
</script>

<style>
</style>
<template>
  <div>
    <v-container fluid grid-list-lg>
      <v-layout wrap>
        <v-flex xs12 text-xs-center><h1>Welcome, Sardor!</h1></v-flex>
        <v-flex xs4s>
          <v-btn
            style="height:80px; color:white"
            block
            depressed
            large
            color="#e69138"
            to="/new"
            >New Card</v-btn
          >
          <v-btn
            style="height:80px; color:white"
            block
            depressed
            large
            color="#e69138"
            to="/dashboard"
            >Manage</v-btn
          >
        </v-flex>

        <v-flex xs4s text-xs-center>
          <v-avatar tile="true" size="192" color="grey lighten-4">
            <img
              src="https://api.adorable.io/avatars/285/abott@adorable.png"
              alt="avatar"
            />
          </v-avatar>
        </v-flex>
        <v-flex xs4s>
          <v-btn
            style="height:80px; color:white"
            block
            depressed
            large
            color="#e69138"
            to="/#"
            >About</v-btn
          >
          <v-btn
            style="height:80px; color:white"
            block
            depressed
            large
            color="#e06666"
            to="/learn"
            >Learn</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style></style>

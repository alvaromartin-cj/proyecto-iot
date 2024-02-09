<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="menu-link">Control</router-link>
  
    </nav>

    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  font-size: 25px;
  font-style: italic;
  color: #2c3e50;
}

.navbar {
  background-color: #000;
  padding: 10px;
  display: flex;
  justify-content: space-around;
}

.menu-link {
  text-decoration: none;
  color: #fff;
  transition: color 0.3s;
}

.menu-link:hover {
  color: #4285f4;
}
</style>

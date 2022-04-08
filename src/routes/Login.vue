<template>
  <div class="main">
    <input type="checkbox" id="chk" aria-hidden="true" />

    <div class="signup items-center">
      <form
        target="http//localhost:8000/api/usersd"
        method="post"
        type="submit"
      >
        <label for="chk" aria-hidden="true">Sign up</label>
        <input type="text" name="txt" placeholder="User name" required="" />
        <input type="email" name="email" placeholder="Email" required="" />
        <input type="password" name="pswd" placeholder="Password" required="" />
        <div class="navbar justify-evenly">
          <i class="social-icon mdi-google"></i>
          <i class="social-icon mdi-github"></i>
        </div>
        <button>Sign up</button>
      </form>
    </div>

    <div class="login items-center">
      <form>
        <label for="chk" aria-hidden="true">Login</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          v-model="email"
        />
        <input
          type="password"
          name="pswd"
          placeholder="Password"
          required
          v-model="password"
        />
        <div class="navbar justify-evenly">
          <i class="social-icon mdi-google btn-primary" @click="ingoogle()"></i>
          <i class="social-icon mdi-github btn-primary" @click="ingithub()"></i>
        </div>
        <button>Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { authenticator } from "../js/store";
import store from "../js/store";
let email = "";
let password = "";
const ingoogle = async () => {
  const usr = await authenticator.sign_in_with_google();
};

const ingithub = async () => {
  const usr = await authenticator.sign_in_with_github().then((res) => {
    store.commit("setUser", res.user);
  });
};

const inuser = async () => {
  const usr = await authenticator.create_user(email, password).then((res) => {
    store.commit("setUser", res.user);
  });
  try {
    const usr = await authenticator.sign_in(email, password);
  } catch (e) {
    console.log(e);
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.main {
  overflow: hidden;
  box-shadow: 5px 20px 50px #000;
}
.main:hover {
  box-shadow: 5px 20px 50px #fff;
}
#chk {
  display: none;
}
.signup {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  @apply flex flex-col items-center text-lg;
}
label {
  color: #ccc;
  @apply flex; 
  @apply items-center;
  @apply text-lg;
  display: flex;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
input {
  width: 85%;
  height: 20px;
  background: #ccc;
  justify-content: center;
  display: flex;
  margin: 1em auto;
  padding: 1em;
  border: none;
  outline: none;
  border-radius: 5px;
}
button {
  width: 60%;
  height: 40px;
  margin: 0 auto;
  justify-content: center;
  display: block;
  color: #ccc;
  background: #573b8a;
  font-size: 1em;
  font-weight: bold;
  margin-top: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;
}
button:hover {
  background: #6d44b8;
}
.login {
  height: 600px;
  background: $success;
  border-radius: 60% / 15%;
  transform: translateY(-120px);
  transition: 0.8s ease-in-out;
}
.login label {
  color: #573b8a;
  transform: scale(0.8);
  @apply underline font-bold mt-16 pt-4;
}

#chk:checked ~ .login {
  transform: translateY(-520px);
}
#chk:checked ~ .login label {
  transform: scale(1);
}
#chk:checked ~ .signup label {
  transform: scale(1.1);
}
</style>

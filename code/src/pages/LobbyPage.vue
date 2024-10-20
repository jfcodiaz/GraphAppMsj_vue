<template>
    <div class="lobby">
        <div>
            <h1>GraphQL Query Result</h1>
            <p v-if="helloMessage">{{ helloMessage }}</p>
        </div>
        <h1>Welcome to the Lobby</h1>
        <p>Please select a room to join: {{ username }}</p>
        <form @submit.prevent="login">
            <input v-model="username" type="text" placeholder="Enter your username" />
            <input type="submit" value="Join" />
        </form>
        <div v-if="storedUsername">
            <p><strong>Username en el store:</strong> {{ storedUsername }}</p>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const store = useStore();
        const fetchHello = () => {
            store.dispatch('fetchHello');
        };
        const router = useRouter(); 
        fetchHello();
        const username = ref('');
        const storedUsername = computed(() => store.getters.getUser);
        const login = () => {
            if (username.value.trim() !== '') {
                store.dispatch('join', {username: username.value});
                router.push('/room');
            } else {
                console.log('Por favor ingresa un nombre de usuario');
            }
        };
        const helloMessage = computed(() => store.getters.getHelloMessage);
        return {
            helloMessage,
            fetchHello,
            login,
            username,
            storedUsername  
        };
    }
};
</script>

<style scoped>
.lobby {
    text-align: center;
    margin-top: 50px;
}

.lobby ul {
    list-style-type: none;
    padding: 0;
}

.lobby li {
    margin: 10px 0;
}

.lobby a {
    text-decoration: none;
    color: #42b983;
}

.lobby a:hover {
    text-decoration: underline;
}
</style>

    <template>
        <div class="lobby">
            <h1>Welcome to the Lobby</h1>
            <p>Please select a room to join:</p>
            <ul>
                <li v-for="room in rooms" :key="room.id">
                    <router-link to="/room">{{ room.name }}</router-link>
                </li>
            </ul>
        </div>
    </template>

    <script>
    export default {
        data() {
            return {
                rooms: [
                    { id: 1, name: 'Room 1' }
                ]
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
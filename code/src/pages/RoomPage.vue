<template>
    <div class="chat-room">
        <span 
            style="
            float: right;
        ">
        <router-link to="/"   
            style="
            display: inline-block;
            padding: 5px;
            border-radius: 2px;
            background-color: red;
            color:white;
            font-weight: bold;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            text-decoration: none;
        "
        >X</router-link>
        </span>
        <h1
        style="
        background-color: blue;
        "
        >GraphApp Messeger</h1>
        <div class="messages">
            <div v-for="message in messages" :key="message.id" class="message">
                <Message
                    :msj="message" 
                    :message="message.text" 
                    :isSent="message.user_id == me.id" 
                />
            </div>
        </div>
        <div>{{ messages }}</div>
        <div>{{ me.id }}</div>
        <div class="input-area">
            <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
            <button @click="sendMessage">Send</button>
        </div>
    </div>
</template>

<script>
import Message from '@/components/Message.vue';
export default {
    data() {
        return {
            me: {
                id: 1,
                name: 'Pako Díaz'
            },
            messages: [
                {
                    id: 1,
                    user_id: 1, 
                    text: 'Hello!'
                },
                {
                    id: 2,
                    user_id: 2,
                    text: 'Hi there!'
                },
                {
                    id: 3,
                    user_id: 1,
                    text: 'Hello, how are you?'
                },
                {
                    id: 3,
                    user_id: 2,
                    text: 'Hello, how are you?'
                },
            ],
            newMessage: ''
        };
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                this.messages.push({
                    id: Date.now(),
                    user_id: 1,
                    text: this.newMessage
                });
                this.newMessage = '';
            }
        }
    },
    components: {
        Message
    }
};
</script>

<style scoped lang="scss">

@use "@/styles/_variables.scss" as vars;

.chat-room {
    background-color: rgba($color: vars.$bg-secondary, $alpha: 0.6);
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #cccccc15;
    border-radius: 10px;
}

.messages {
    max-height: 400px;
    overflow-y: auto;
    margin-bottom: 20px;
}

.message {
    margin-bottom: 10px;
}

.input-area {
    display: flex;
}

input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
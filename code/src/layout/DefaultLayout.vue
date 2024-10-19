<template>
    <div class="chat-room">
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            me: {
                id: 1,
                name: 'Pako Díaz'
            },
            users: [
                { id: 2, name: 'User1' },
                { id: 3, name: 'User2' },
                // Add more users as needed
            ],
            messages: [
                { id: 1, user: 'User1', text: 'Hello!' },
                { id: 2, user: 'User2', text: 'Hi there!' },
                // Add more messages as needed
            ],
            newMessage: ''
        };
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                this.messages.push({
                    id: this.messages.length + 1,
                    user: 'You',
                    text: this.newMessage
                });
                this.newMessage = '';
            }
        }
    }
};
</script>

<style lang="scss">

@use "@/styles/_variables.scss" as vars;

body {
    background-color: vars.$bg-primary;
    background: linear-gradient(45deg, vars.$bg-tertiary, vars.$bg-primary);
    height: 100vh;
    color: red!important;
}
</style>
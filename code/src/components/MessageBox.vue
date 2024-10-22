<template>
    <transition :name="messageClass">
        <div class="message-box" :class="messageClass">
            {{ message.text }}
            {{ message.userId }}
        </div>
    </transition>
</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        message: {
            type: Object,
            required: true
        },
        me: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const isSent = () => {
            if(!props.me) {
                return;
            }

            return props.message.userId == props.me.id ? 'sent' : 'received';
        };
        const messageClass = computed(isSent);
        return {
            messageClass
        };
    }
}
</script>

<style scoped>
.message-box {
    max-width: 60%;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    position: relative;
    word-wrap: break-word;

    color: blue !important;
    font-family: sans-serif;
}

.sent {
    background-color: #dcf8c6;
    align-self: flex-end;
}

.received {
    background-color: #fff;
    align-self: flex-start;
}

.sent::after, .received::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
}

.sent::after {
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent #dcf8c6;
    top: 10px;
    right: -10px;
}

.received::after {
    border-width: 10px 10px 10px 0;
    border-color: transparent #fff transparent transparent;
    top: 10px;
    left: -10px;
}

/* Transiciones de mensajes */
.sent-enter-active, .sent-leave-active {
    transition: transform 0.5s ease, opacity 1.5s ease;
}

.sent-enter {
    transform: translateX(100%) scale(0.5);
    opacity: 0;
}

.sent-leave-to {
    transform: translateX(100%) scale(0.5);
    opacity: 0;
}

.received-enter-active, .received-leave-active {
    transition: transform 0.5s ease, opacity 0.5s ease;
}

.received-enter {
    transform: translateX(-100%) scale(0.5);
    opacity: 0;
}

.received-leave-to {
    transform: translateX(-100%) scale(0.5);
    opacity: 0;
}
</style>

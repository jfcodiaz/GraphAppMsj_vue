<template>
    <div class="message-box" :class="{'sent': isSent, 'received': !isSent}">
        <p>{{ message }}</p>
        <p>{{ msj.user_1 }}</p>
    </div>
</template>

<script>
export default {
    name: 'MessageBox',
    props: {
        message: {
            type: String,
            required: true
        },
        isSent: {
            type: Boolean,
            default: false
        },
        msj: {
            type: Object,
            required: true
        }
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
</style>
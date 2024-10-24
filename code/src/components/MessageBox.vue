<template>
    <transition :name="messageClass">
        <div class="message-box" :class="messageClass">
            <div class="autor" v-if="messageClass == 'received'">
                <b>{{ message.user.username }}</b> :
            </div>
            {{ message.text }}
            <TimeAgo :date-string="message.createdAt"/>
        </div>
    </transition>
</template>

<script>
import { computed } from 'vue';
import { formatDistanceToNow } from 'date-fns';
import TimeAgo from './TimeAgo.vue';
export default {
    components: {
        TimeAgo
    },
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
        const formattedDate = computed(() => formatDistanceToNow(new Date(props.message.createdAt), { addSuffix: true }));
        const messageClass = computed(isSent);
        return {
            messageClass,
            formattedDate
        };
    }
}
</script>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as vars;
  .message {
    margin-bottom: 10px;
  }

  .autor {
    font-size: 0.8em;
    color: vars.$color-3;
  }
  .message-box {
    max-width: 60%;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    position: relative;
    word-wrap: break-word;

    color: vars.$color-4;
    font-family: sans-serif;
  }

  .message-box.received {
    color: vars.$color-5;
  }
  
.sent {
    color: vars.$color-4;
    background-color: #dcf8c6;
    justify-self: end;
}

.received {
    background-color: vars.$color-2;
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
    right: -9px;
}

.received::after {
    border-width: 10px 10px 10px 0;
    border-color: transparent vars.$color-2 transparent transparent;
    top: 10px;
    left: -9px;
}

</style>

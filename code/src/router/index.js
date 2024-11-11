import { createRouter, createWebHistory } from 'vue-router';
import Lobby from '../pages/LobbyPage.vue';
import Room from '../pages/RoomPage.vue';

const routes = [
  {
    path: '/',
    name: 'Lobby',
    component: Lobby,
  },
  {
    path: '/room/',
    name: 'Room',
    component: Room,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const storedUser = sessionStorage.getItem('user');
  if (!storedUser && to.path !== '/') {
    next('/');
  } else {
    next();
  }
});

export default router;

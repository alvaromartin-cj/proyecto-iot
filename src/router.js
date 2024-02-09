import { createRouter, createWebHistory } from 'vue-router';
import Control from './views/controlEspacio.vue';
import SalaDetalle from './views/SalaDetalle.vue' // Nueva vista para los detalles de la sala


const routes = [
  { path: '/', component: Control, name: 'controlEspacio' },
  { path: '/salaDetalle/:id', component: SalaDetalle, name: 'salaDetalle' }, // Ruta para la página de detalles de la sala

];

const router = createRouter({
  history: createWebHistory(''), // Proporciona una cadena vacía como base de la historia
  routes,
});


export default router;

<script setup>
import { ref, onMounted } from 'vue'
import { getDataDocument, updateData, deleteData } from '@/crudFirebase'
import { useRoute } from 'vue-router'

const sala = ref({})
const mostrar = async () => {
    try {
        const route = useRoute();
        const salaId = route.params.id;
        const data = await getDataDocument('salas', salaId);
        sala.value = { id: salaId, ...data };
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
};

const guardarCambios = async () => {
    try {
        await updateData(sala.value.id, sala.value);
        console.log('Datos actualizados correctamente');
    } catch (error) {
        console.error('Error al actualizar los datos:', error);
    }
};

const eliminarSala = async () => {
    try {
        await deleteData(sala.value.id, 'salas');
        console.log('Sala eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar la sala:', error);
    }
};

onMounted(mostrar)
</script>

<template>
    <div v-if="sala.id">
        <h1>Sala de Detalles</h1>
        <p>Aquí puedes ver eliminar y modificar los detalles de la sala.</p>
        <div class="sala-info">
    <div v-for="(value, key) in sala" :key="key" class="dato">
        {{ key }}:
        <template v-if="key !== 'id'">
            <input type="text" v-model="sala[key]">
        </template>
        <template v-else>
            <input type="text" :value="sala[key]" disabled>
        </template>
    </div>
    <router-link :to="{ name: 'controlEspacio' }">
        <button @click="guardarCambios">Guardar Cambios</button>
    </router-link> |
    <router-link :to="{ name: 'controlEspacio' }">
        <button @click="eliminarSala">Eliminar Sala</button>
    </router-link>
    </div>

  </div>
</template>



<style scoped>
.sala-info {
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 10px;
}
</style>

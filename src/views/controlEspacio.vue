<script setup>
import { ref, onMounted } from 'vue'
import { getDataCollection } from '@/crudFirebase'

const elementos = ref([])

const mostrar = async () => {
    try {
        const data = await getDataCollection('salas')
        elementos.value = data.docs.map((el) => ({ id: el.id, ...el.data() }))
    } catch (error) {
        console.error('Error al obtener datos:', error)
    }
}

const nuevaPestana = (sala) => {
  window.open(`/salaDetalle/${sala.id}`, '_blank')
}

onMounted(mostrar)
</script>

<template>
    <div>
        <h1>Sala de Control</h1>
        <p>Aquí puedes ver todos los dispositivos existentes.</p>
        <div class="cajas-container">
            <div v-for="sala in elementos" :key="sala.id" class="caja">
                <div v-for="(value, key) in sala" :key="key" class="dato">
                    {{ key }}:
                    <template v-if="key !== 'luz' && key !== 'persiana'">
                        <input :disabled="true" v-model="sala[key]">
                    </template>
                    <template v-else>
                        <select :disabled="true" v-model="sala[key]">
                            <option :value="true">true</option>
                            <option :value="false">false</option>
                        </select>
                    </template>
                </div>
                
                <button @click="nuevaPestana(sala)">Modificar</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.cajas-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.caja {
    padding: 10px;
    box-shadow: 1px 1px 1px 1px black;
    flex: 0 0 calc(20% - 20px);
    margin-bottom: 10px;
    min-width: 120px;
    box-sizing: border-box;
}

.caja:hover {
    background-color: aliceblue;
}

.dato {
    margin-bottom: 5px;
    font-size: 12px;
}

input {
    text-align: center;
    width: 30%;
}
</style>

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getFirestore,  collection,  getDocs,  onSnapshot,  addDoc,  deleteDoc,  doc,  getDoc,  setDoc,  updateDoc,  arrayUnion,  arrayRemove,} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

  // Mi configuración de Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAFyJ95TYjkGo73sU1R6RUaE8JFldlS-Yg",
    authDomain: "proyecto-iot-bfe30.firebaseapp.com",
    projectId: "proyecto-iot-bfe30",
    storageBucket: "proyecto-iot-bfe30.appspot.com",
    messagingSenderId: "567641744939",
    appId: "1:567641744939:web:edd07f18d5bfc4e9c5ec6e",
    measurementId: "G-YDXXRT80RE"
  };

  // Conectar con la base de datos de Firebase
  const db = getFirestore(initializeApp(firebaseConfig));
  

  // CRUD

  export const borrarSala = async (id, ref) => {
    try {
        await deleteDoc(doc(db, ref, id));
    } catch (error) {
        console.error('Error al eliminar el documento:', error);
        throw error;
    }
  };

  // Obtener diferentes documentos con los campos.
  export const getDataCollection = (ref) => getDocs(collection(db, ref));
  // Guardar datos en la colección.
  export const saveData = (ref, objeto) => addDoc(collection(db, ref), objeto);
  // Obtener cambios en una colección.
  export const getDataChangedCollection = (ref, callBack) => onSnapshot(collection(db, ref), callBack);
  // Obtener cambios en un documento específico.
  export const getDataChangedDocument = (ref, document, callBack) => onSnapshot(doc(db, ref, document), callBack);
  // Eliminar un documento por su ID.
  export const deleteData = (id, ref) => deleteDoc(doc(db, ref, id));
  // Obtener datos de un documento por su ID.
  export const getData = (id, ref) => getDoc(doc(db, ref, id));
  // Actualizar datos de un documento por su ID.
  export const updateData = (id, objeto) => updateDoc(doc(db, 'salas', id), objeto);

  export const saveDataDoc = (id, objeto) => {
    const docRef = doc(db, 'salas', id);
    return updateDoc(docRef, objeto);
  };

  export const deleteField = (documentId, fieldName) => {
    const docRef = doc(db, 'salas', documentId)
    return getDoc(docRef)
      .then((documentSnapshot) => {
        if (documentSnapshot.exists()) {
          const updatedData = { ...documentSnapshot.data() }
          delete updatedData[fieldName]
          // Actualiza el documento sin el campo especificado
          return setDoc(docRef, updatedData)
        } else {
          console.error('El documento no existe')
          throw new Error('El documento no existe')
        }
      })
      .catch((error) => {
        console.error('Error al eliminar el campo:', error.message)
        throw error
      })
  }

  export const getDataDocument = async (collectionPath, documentId) => {
      try {
          const documentRef = doc(db, collectionPath, documentId);
          const documentSnapshot = await getDoc(documentRef);
          if (documentSnapshot.exists()) {
              return documentSnapshot.data();
          } else {
              throw new Error('El documento no existe.');
          }
      } catch (error) {
          console.error('Error al obtener el documento:', error);
          throw error;
      }
  };
  



  // Función para crear un documento en la colección "salas" con un ID personalizado y datos (sensores y receptores).
  export const createDocument = (salaId, data) => {
    const salaRef = doc(db, 'salas', salaId);
    return setDoc(salaRef, data);
  };

  // Función para eliminar un sensor o receptor de una sala por su ID.
  export const deleteElement = (salaId, elementId) => {
    const salaRef = doc(db, 'salas', salaId);
    return updateDoc(salaRef, {
      sensores: arrayRemove(elementId),
      receptores: arrayRemove(elementId),
    });
  };
  // Función para agregar un nuevo sensor o receptor a una sala existente.
  export const addElement = (salaId, element) => {
    const salaRef = doc(db, 'salas', salaId);
    return updateDoc(salaRef, {
      sensores: arrayUnion(element),
      receptores: arrayUnion(element),
    });
    
    

  };
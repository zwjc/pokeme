import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getDatabase, ref, get, set, push, onValue } from "firebase/database";
import firebaseConfig from "./firebaseConfig.js";
import { configure } from "mobx";
configure({ enforceActions: "never" }); // we don't use Mobx actions
// Initialise firebase app, database, ref
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbFirestore = getFirestore(app);

const auth = getAuth(app);

const PATH = "PokeMe";
const rf = ref(db, PATH);
// set(ref(db, PATH+"/test"), "dummy"); /* this is for db initialize testing */

async function getOpenAIKey() {
  const docRef = doc(dbFirestore, "openai_key", "openai_key");
  const docSnap = await getDoc(docRef);
  return docSnap.data().key;
}

function modelToPersistence(model) {}

function persistenceToModel(data, model) {}

function saveToFirebase(userId, testState) {
  set(ref(db, `tests/${userId}`), testState)
    .then(() => console.log("State saved successfully"))
    .catch((error) => console.error("Failed to save state:", error));
}

function readFromFirebase(userId, callback) {
  get(ref(db, `tests/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Failed to retrieve state:", error);
    });
}

function saveResultToHistory(userId, testResult) {
  const historyRef = ref(db, `history/${userId}`);

  const newHistoryRef = push(historyRef);

  const timestamp = new Date().toISOString();
  const historyEntry = {
    ...testResult,
    date: timestamp,
  };

  return set(newHistoryRef, historyEntry)
    .then(() => console.log("Result saved to history successfully"))
    .catch((error) =>
      console.error("Failed to save result to history:", error)
    );
}

function readHistoryFromFirebase(userId, callback) {
  get(ref(db, `history/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const historyData = Object.values(snapshot.val());
        callback(historyData);
      } else {
        console.log("No history data available");
      }
    })
    .catch((error) => {
      console.error("Failed to retrieve history:", error);
    });
}

function connectToFirebase(model, watchFunction) {
  function checkACB() {
    console.log("checking");
    return [];
  }
  function effectACB() {
    saveToFirebase(model);
  }
  watchFunction(checkACB, effectACB);
}

export {
  auth,
  modelToPersistence,
  persistenceToModel,
  saveToFirebase,
  readFromFirebase,
  readHistoryFromFirebase,
  saveResultToHistory,
  getOpenAIKey,
};

export default connectToFirebase;

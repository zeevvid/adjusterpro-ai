import { db, storage } from "./firebase";
import { collection, addDoc, getDocs, query, where, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Define interfaces for your data types
export interface IntakeData {
    clientName: string;
    address: string;
    email: string;
    phone: string;
    dateOfLoss: string;
    // Add other fields as needed
    createdAt?: Date;
}

// Collection references
const intakesCollection = collection(db, "intakes");

/**
 * Saves a new intake form to Firestore
 */
export const saveIntake = async (data: IntakeData) => {
    try {
        console.log("Attempting to save intake data:", data);
        const docRef = await addDoc(intakesCollection, {
            ...data,
            createdAt: Timestamp.now(),
        });
        console.log("Intake saved successfully with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding intake document: ", e);
        throw e;
    }
};

/**
 * Uploads a file to Firebase Storage
 */
export const uploadFile = async (file: File, path: string) => {
    if (!file) return null;

    const storageRef = ref(storage, path);

    try {
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return url;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

/**
 * Example function to get all intakes
 */
export const getIntakes = async () => {
    const querySnapshot = await getDocs(intakesCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const contractsCollection = collection(db, "contract_requests");

export const saveContractRequest = async (data: any) => {
    try {
        const docRef = await addDoc(contractsCollection, {
            ...data,
            createdAt: Timestamp.now(),
            status: 'sent', // default status
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding contract request: ", e);
        throw e;
    }
};

export const getContractRequests = async () => {
    try {
        const querySnapshot = await getDocs(contractsCollection);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.error("Error getting contract requests: ", e);
        return [];
    }
};

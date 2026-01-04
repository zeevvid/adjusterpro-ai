import { db, storage } from "./firebase";
import { collection, addDoc, getDocs, query, where, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Define interfaces for your data types
export interface IntakeData {
    // Step 1: Client & Basics
    clientName: string;
    intakeDate: string;
    propertyAddress: string;
    repName: string;
    primaryPhone: string;
    secondaryPhone: string;
    email: string;
    altEmail: string;
    dateOfLoss: string;
    lossType: string;
    insuranceCo: string;
    policyNumber: string;
    claimNumber: string;
    priorClaim: boolean;
    priorClaimDetails: string;

    // Step 2: Affected Areas
    interiorAreas: string[];
    exteriorAreas: string[];
    interiorNotes: string;

    // Step 3: Repairs & Mitigation
    repairsMade: boolean;
    repairsDetails: string;
    mitigationUsed: boolean;
    mitigationCompany: string;
    receiptsAvailable: boolean;
    emergencyServices: boolean;

    // Step 4: Contents & Loss
    contentsDamaged: boolean;
    highValueItems: boolean;
    tempRelocation: boolean;
    lossOfUse: boolean;

    // Step 5: Notes & Photos
    generalNotes: string;
    internalNotes: string;
    photosTaken: boolean;
    noPhotosReason: string;

    createdAt?: Date;
}

// Collection references
const intakesCollection = collection(db, "intakes");
const adjustersCollection = collection(db, "adjusters");
const platformConversionsCollection = collection(db, "platform_conversions");

/**
 * Saves a new intake form to Firestore
 */
export const saveIntake = async (data: IntakeData | any) => {
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
 * Adjuster Service Functions
 */
export const getAdjusterByReferralId = async (refId: string) => {
    const q = query(adjustersCollection, where("referralId", "==", refId), where("subscriptionStatus", "==", "active"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};

export const saveAdjusterProfile = async (profile: any) => {
    const refId = profile.referralId || Math.random().toString(36).substring(2, 9);
    const docRef = await addDoc(adjustersCollection, {
        ...profile,
        referralId: refId,
        createdAt: Timestamp.now(),
    });
    return { id: docRef.id, referralId: refId };
};

/**
 * Conversion Tracking
 */
export const recordConversion = async (data: { claimId: string, referralId?: string, feePaid: boolean, amount: number }) => {
    return await addDoc(platformConversionsCollection, {
        ...data,
        timestamp: Timestamp.now()
    });
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

import React from 'react';
import {
    query,
    collection,
    limit,
    orderBy,
    startAfter,
    getDocs,
    getDoc,
    onSnapshot,
    doc
} from "firebase/firestore";
import { db } from '../firebase-config';


const feedsCollection = collection(db, "feeds");

const extractSnapshots = (snapshots) => {
    let extracts = [];
    snapshots.forEach((documentSnapshot) => {
        extracts.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id
        })
        return extracts
    })
}
export default async function getFeedsData({ lastDocId, limit = 3 }) {
    let docs = [];
    let newLastDocId = null;
    let error = null;
    let batch;
    let status = 'undetermined';

    try {
        if (lastDocId) {
            const lastDoc = await getDoc(doc(feedsCollection(lastDocId)))
            const batch = query(feedsCollection, orderBy("timestamp", "desc"), startAfter(lastDoc), limit(limit))

        } else {
            batch = query(feedsCollection, orderBy("timestamp", "desc"), limit(limit))
        }

        status = "pending"

        const snapshots = await getDocs(batch)

newLastDocId = snapshots.docs[snapshots.docs.length -1].key || null

    } catch (error) {

    }

    return {}
}

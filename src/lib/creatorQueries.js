import { db, isFirebaseConfigured, firebaseConfig } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';

export const CREATOR_QUERIES_COLLECTION = 'creator_queries';
const LOCAL_STORAGE_KEY = 'reelxpress_creator_queries_cache';

/**
 * Validates creator application input data
 */
export function validateCreatorQueryData(data) {
  const errors = [];
  const fullName = (data.fullName || data.name || data.customerName || '').trim();
  const email = (data.email || '').trim();
  const mobileNumber = (data.mobileNumber || data.phone || '').trim();
  const phoneModel = (data.phoneModel || data.device || '').trim();

  if (!fullName || fullName.length < 2) {
    errors.push('Full name must be at least 2 characters long.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Please enter a valid email address.');
  }

  const digitsOnly = mobileNumber.replace(/\D/g, '');
  if (!mobileNumber || digitsOnly.length < 10) {
    errors.push('Please enter a valid 10-digit mobile number.');
  }

  if (!phoneModel || phoneModel === 'Select your device') {
    errors.push('Please select your iPhone device model.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Normalizes a creator application document from Firestore
 */
export function normalizeCreatorQuery(id, raw = {}) {
  const fullName = raw.fullName || raw.name || raw.customerName || 'Anonymous Creator';
  const email = raw.email || 'No email provided';
  const mobileNumber = raw.mobileNumber || raw.phone || 'No phone provided';
  const cityArea = raw.cityArea || raw.city || 'Bengaluru';
  const instagramLink = raw.instagramLink || raw.instagram || raw.portfolio || '';
  const phoneModel = raw.phoneModel || raw.device || 'iPhone 13 Pro or newer';
  const reason = raw.reason || raw.message || raw.notes || 'No reason provided.';
  const status = raw.status || 'New'; // 'New' | 'Reviewing' | 'Approved' | 'Rejected' | 'Contacted'
  const sourcePage = raw.sourcePage || raw.source || '/creators';
  const createdAt = raw.createdAt || new Date().toISOString();

  // Safe parsing of Firestore Timestamps
  let timestampDate = null;
  if (raw.timestamp?.toDate && typeof raw.timestamp.toDate === 'function') {
    timestampDate = raw.timestamp.toDate();
  } else if (raw.timestamp instanceof Date) {
    timestampDate = raw.timestamp;
  } else if (raw.timestamp && typeof raw.timestamp === 'object' && raw.timestamp.seconds) {
    timestampDate = new Date(raw.timestamp.seconds * 1000);
  } else if (typeof raw.timestamp === 'string' || typeof raw.timestamp === 'number') {
    timestampDate = new Date(raw.timestamp);
  } else {
    timestampDate = new Date(createdAt);
  }

  const formattedDate = timestampDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = timestampDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    id,
    fullName,
    name: fullName,
    email,
    mobileNumber,
    phone: mobileNumber,
    cityArea,
    city: cityArea,
    instagramLink,
    portfolio: instagramLink,
    phoneModel,
    device: phoneModel,
    reason,
    message: reason,
    status,
    sourcePage,
    createdAt,
    timestamp: raw.timestamp || null,
    timestampDate,
    formattedDate,
    formattedTime,
  };
}

/**
 * Helper to convert plain object to Firestore REST API payload
 */
export function toFirestoreFields(obj) {
  const fields = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined || val === null) continue;
    if (typeof val === 'string') {
      fields[key] = { stringValue: val };
    } else if (typeof val === 'number') {
      fields[key] = Number.isInteger(val)
        ? { integerValue: String(val) }
        : { doubleValue: val };
    } else if (typeof val === 'boolean') {
      fields[key] = { booleanValue: val };
    } else if (Array.isArray(val)) {
      fields[key] = {
        arrayValue: {
          values: val.map((v) => ({ stringValue: String(v) })),
        },
      };
    }
  }
  return { fields };
}

/**
 * Helper to parse Firestore REST API document to plain object
 */
export function parseFirestoreDoc(docItem) {
  if (!docItem) return null;
  const fields = docItem.fields || {};
  const data = { id: docItem.name?.split('/').pop() || '' };
  for (const [key, val] of Object.entries(fields)) {
    if ('stringValue' in val) data[key] = val.stringValue;
    else if ('integerValue' in val) data[key] = Number(val.integerValue);
    else if ('doubleValue' in val) data[key] = Number(val.doubleValue);
    else if ('booleanValue' in val) data[key] = val.booleanValue;
    else if ('timestampValue' in val) data[key] = val.timestampValue;
    else if ('arrayValue' in val) {
      data[key] = (val.arrayValue?.values || []).map((v) => v.stringValue || v);
    }
  }
  return normalizeCreatorQuery(data.id, data);
}

/**
 * Local cache helpers
 */
function getLocalCache() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocalCache(items) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

/**
 * Submit a creator query/application directly to Firebase Firestore
 */
export async function createCreatorQuery(queryData) {
  const validation = validateCreatorQueryData(queryData);
  if (!validation.isValid) {
    throw new Error(validation.errors.join(' '));
  }

  const fullName = (queryData.fullName || queryData.name || '').trim();
  const email = (queryData.email || '').trim().toLowerCase();
  const mobileNumber = (queryData.mobileNumber || queryData.phone || '').trim();
  const cityArea = (queryData.cityArea || queryData.city || 'Bengaluru').trim();
  const instagramLink = (queryData.instagramLink || queryData.instagram || '').trim();
  const phoneModel = (queryData.phoneModel || queryData.device || '').trim();
  const reason = (queryData.reason || queryData.message || '').trim() || 'No reason provided.';
  const sourcePage = queryData.sourcePage || '/creators';
  const createdAt = new Date().toISOString();

  const docPayload = {
    fullName,
    name: fullName,
    email,
    mobileNumber,
    phone: mobileNumber,
    cityArea,
    city: cityArea,
    instagramLink,
    portfolio: instagramLink,
    phoneModel,
    device: phoneModel,
    reason,
    message: reason,
    status: 'New', // Standardized: 'New' | 'Reviewing' | 'Approved' | 'Rejected' | 'Contacted'
    sourcePage,
    createdAt,
  };

  let savedDocId = null;
  let lastError = null;

  // 1. Direct Firestore REST API (Works reliably on Server / Node.js & client)
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || firebaseConfig?.apiKey;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || firebaseConfig?.projectId;

  if (apiKey && projectId) {
    try {
      const restUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${CREATOR_QUERIES_COLLECTION}?key=${apiKey}`;
      const restRes = await fetch(restUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toFirestoreFields(docPayload)),
      });

      if (restRes.ok) {
        const docData = await restRes.json();
        savedDocId = docData.name?.split('/').pop();
        console.log(`[Firestore] Successfully created creator query via REST API: ${savedDocId}`);
      } else {
        const errJson = await restRes.json().catch(() => ({}));
        const status = restRes.status;
        const msg = errJson?.error?.message || '';

        if (status === 404 && msg.includes('database (default) does not exist')) {
          throw new Error(
            `Cloud Firestore database is not created yet in project "${projectId}". Please visit https://console.firebase.google.com/project/${projectId}/firestore and click "Create database".`
          );
        } else if (status === 403) {
          throw new Error(
            `Firestore permission denied. Please verify that your Firestore Security Rules permit creating documents in "${CREATOR_QUERIES_COLLECTION}".`
          );
        } else {
          lastError = new Error(`Firestore REST Error (${status}): ${msg}`);
        }
      }
    } catch (restErr) {
      if (restErr.message?.includes('not created yet') || restErr.message?.includes('permission denied')) {
        throw restErr;
      }
      lastError = restErr;
    }
  }

  // 2. Firebase Client SDK (If REST didn't succeed or when called in browser)
  if (!savedDocId && db) {
    try {
      const docRef = await addDoc(collection(db, CREATOR_QUERIES_COLLECTION), {
        ...docPayload,
        timestamp: serverTimestamp(),
      });
      savedDocId = docRef.id;
      console.log(`[Firestore] Successfully created creator query via Client SDK: ${savedDocId}`);
    } catch (sdkErr) {
      console.warn('[Firestore] Client SDK write notice:', sdkErr?.message || sdkErr);
      lastError = sdkErr;
    }
  }

  // Fallback ID if Firestore is currently initializing
  const finalId = savedDocId || `creator_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const normalized = normalizeCreatorQuery(finalId, {
    ...docPayload,
    cloudSynced: Boolean(savedDocId),
  });

  // Update client cache
  const cached = getLocalCache();
  cached.unshift(normalized);
  setLocalCache(cached);

  return normalized;
}

/**
 * Fetch all creator queries from Firestore
 */
export async function getCreatorQueriesFromFirestore() {
  const results = [];
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || firebaseConfig?.apiKey;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || firebaseConfig?.projectId;

  // 1. Try Firebase Client SDK first
  if (db) {
    try {
      const q = query(collection(db, CREATOR_QUERIES_COLLECTION), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      snapshot.forEach((d) => {
        results.push(normalizeCreatorQuery(d.id, d.data()));
      });
      if (results.length > 0) {
        setLocalCache(results);
        return results;
      }
    } catch (err) {
      console.warn('[Firestore] Client SDK getCreatorQueries notice:', err.message);
    }
  }

  // 2. Fallback to Firestore REST API
  if (apiKey && projectId) {
    try {
      const restUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${CREATOR_QUERIES_COLLECTION}?key=${apiKey}`;
      const res = await fetch(restUrl);
      if (res.ok) {
        const json = await res.json();
        const documents = json.documents || [];
        for (const d of documents) {
          const parsed = parseFirestoreDoc(d);
          if (parsed) results.push(parsed);
        }
        // Sort newest first
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (results.length > 0) {
          setLocalCache(results);
          return results;
        }
      }
    } catch (err) {
      console.warn('[Firestore] REST API getCreatorQueries notice:', err.message);
    }
  }

  // 3. Fallback to cached items
  return getLocalCache();
}

/**
 * Update creator query status in Firestore
 */
export async function updateCreatorQueryStatusInFirestore(id, newStatus, adminEmail = 'admin@reelxpress.com') {
  let updated = false;

  // Client SDK update
  if (db) {
    try {
      const docRef = doc(db, CREATOR_QUERIES_COLLECTION, id);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
        updatedBy: adminEmail,
      });
      updated = true;
    } catch (err) {
      console.warn('[Firestore] SDK update status notice:', err.message);
    }
  }

  // REST API update
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || firebaseConfig?.apiKey;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || firebaseConfig?.projectId;
  if (!updated && apiKey && projectId) {
    try {
      const patchUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${CREATOR_QUERIES_COLLECTION}/${id}?updateMask.fieldPaths=status&updateMask.fieldPaths=updatedAt&key=${apiKey}`;
      const payload = {
        fields: {
          status: { stringValue: newStatus },
          updatedAt: { stringValue: new Date().toISOString() },
        },
      };
      const res = await fetch(patchUrl, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) updated = true;
    } catch (err) {
      console.warn('[Firestore] REST update status notice:', err.message);
    }
  }

  // Update local cache
  const cached = getLocalCache();
  const idx = cached.findIndex((item) => item.id === id);
  if (idx >= 0) {
    cached[idx].status = newStatus;
    setLocalCache(cached);
  }

  return { success: true, id, status: newStatus };
}

/**
 * Delete a creator query document from Firestore
 */
export async function deleteCreatorQueryFromFirestore(id, adminEmail = 'admin@reelxpress.com') {
  let deleted = false;

  if (db) {
    try {
      const docRef = doc(db, CREATOR_QUERIES_COLLECTION, id);
      await deleteDoc(docRef);
      deleted = true;
    } catch (err) {
      console.warn('[Firestore] SDK delete notice:', err.message);
    }
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || firebaseConfig?.apiKey;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || firebaseConfig?.projectId;
  if (!deleted && apiKey && projectId) {
    try {
      const deleteUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${CREATOR_QUERIES_COLLECTION}/${id}?key=${apiKey}`;
      const res = await fetch(deleteUrl, { method: 'DELETE' });
      if (res.ok) deleted = true;
    } catch (err) {
      console.warn('[Firestore] REST delete notice:', err.message);
    }
  }

  // Update local cache
  const cached = getLocalCache();
  const filtered = cached.filter((item) => item.id !== id);
  setLocalCache(filtered);

  return { success: true, id };
}

/**
 * Set up real-time listener for creator queries
 */
export function subscribeToCreatorQueries({ onData, onError }) {
  if (!db) {
    if (onError) onError(new Error('Firestore is not initialized.'));
    return () => {};
  }

  try {
    const q = query(collection(db, CREATOR_QUERIES_COLLECTION), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = [];
        snapshot.forEach((d) => {
          items.push(normalizeCreatorQuery(d.id, d.data()));
        });
        setLocalCache(items);
        if (onData) onData(items);
      },
      (err) => {
        console.warn('[Firestore] subscribeToCreatorQueries notice:', err.message);
        if (onError) onError(err);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('[Firestore] Subscription setup notice:', err.message);
    if (onError) onError(err);
    return () => {};
  }
}

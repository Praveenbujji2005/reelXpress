import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'enquiries.json');

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
  }
}

export function readServerEnquiries() {
  try {
    ensureFile();
    const raw = fs.readFileSync(FILE_PATH, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn('[ServerEnquiriesStore] Read error:', err.message);
    return [];
  }
}

export function writeServerEnquiries(list) {
  try {
    ensureFile();
    fs.writeFileSync(FILE_PATH, JSON.stringify(list, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[ServerEnquiriesStore] Write error:', err.message);
    return false;
  }
}

export function saveServerEnquiry(enquiry) {
  const list = readServerEnquiries();
  const id = enquiry.id || `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const item = {
    ...enquiry,
    id,
    cloudSynced: Boolean(enquiry.cloudSynced),
    updatedAt: new Date().toISOString(),
  };

  const existingIdx = list.findIndex((e) => e.id === id);
  if (existingIdx >= 0) {
    list[existingIdx] = { ...list[existingIdx], ...item };
  } else {
    list.unshift(item);
  }

  writeServerEnquiries(list);
  return item;
}

export function updateServerEnquiryStatus(id, newStatus, adminEmail = 'admin@reelxpress.com') {
  const list = readServerEnquiries();
  const idx = list.findIndex((e) => e.id === id);
  if (idx >= 0) {
    list[idx].status = newStatus;
    list[idx].updatedAt = new Date().toISOString();
    list[idx].updatedBy = adminEmail;
    writeServerEnquiries(list);
    return list[idx];
  }
  return null;
}

export function deleteServerEnquiry(id) {
  const list = readServerEnquiries();
  const filtered = list.filter((e) => e.id !== id);
  writeServerEnquiries(filtered);
  return true;
}

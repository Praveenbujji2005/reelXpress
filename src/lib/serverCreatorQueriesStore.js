import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'creator_queries.json');

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
  }
}

export function readServerCreatorQueries() {
  try {
    ensureFile();
    const raw = fs.readFileSync(FILE_PATH, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn('[ServerCreatorQueriesStore] Read error:', err.message);
    return [];
  }
}

export function writeServerCreatorQueries(list) {
  try {
    ensureFile();
    fs.writeFileSync(FILE_PATH, JSON.stringify(list, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[ServerCreatorQueriesStore] Write error:', err.message);
    return false;
  }
}

export function saveServerCreatorQuery(queryItem) {
  const list = readServerCreatorQueries();
  const id = queryItem.id || `creator_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const item = {
    ...queryItem,
    id,
    cloudSynced: Boolean(queryItem.cloudSynced),
    updatedAt: new Date().toISOString(),
  };

  const existingIdx = list.findIndex((q) => q.id === id);
  if (existingIdx >= 0) {
    list[existingIdx] = { ...list[existingIdx], ...item };
  } else {
    list.unshift(item);
  }

  writeServerCreatorQueries(list);
  return item;
}

export function updateServerCreatorQueryStatus(id, newStatus, adminEmail = 'admin@reelxpress.com') {
  const list = readServerCreatorQueries();
  const idx = list.findIndex((q) => q.id === id);
  if (idx >= 0) {
    list[idx].status = newStatus;
    list[idx].updatedAt = new Date().toISOString();
    list[idx].updatedBy = adminEmail;
    writeServerCreatorQueries(list);
    return list[idx];
  }
  return null;
}

export function deleteServerCreatorQuery(id) {
  const list = readServerCreatorQueries();
  const filtered = list.filter((q) => q.id !== id);
  writeServerCreatorQueries(filtered);
  return true;
}

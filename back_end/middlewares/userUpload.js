import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, "..", "uploads", "users");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || "";
    const safe = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, safe);
  },
});

/** Max taille par fichier (vidéo ou image) : 3 Go */
const MAX_FILE_BYTES = 3 * 1024 * 1024 * 1024;

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_BYTES },
});

/** Champs attendus par le frontend: image, video (optionnels) */
export const uploadUserMedia = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

import multer from "multer";

/** Max taille par fichier (vidéo ou image) : 100 Mo (limite Cloudinary upload raisonnable ; ajuster si besoin). */
const MAX_FILE_BYTES = Number(process.env.UPLOAD_MAX_BYTES) || 300 * 1024 * 1024;

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_BYTES },
});

/** Champs attendus par le frontend: image, video (optionnels) */
export const uploadUserMedia = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";

export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME?.trim() &&
      process.env.CLOUDINARY_API_KEY?.trim() &&
      process.env.CLOUDINARY_API_SECRET?.trim()
  );
}

function configure() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME.trim(),
    api_key: process.env.CLOUDINARY_API_KEY.trim(),
    api_secret: process.env.CLOUDINARY_API_SECRET.trim(),
  });
}

/**
 * @param {Buffer} buffer
 * @param {{ resourceType?: 'image' | 'video' | 'auto' }} opts
 */
export function uploadBufferToCloudinary(buffer, opts = {}) {
  if (!isCloudinaryConfigured()) {
    return Promise.reject(new Error("Cloudinary non configuré : renseigner CLOUDINARY_* dans .env"));
  }
  configure();

  const folder = (process.env.CLOUDINARY_FOLDER || "coffee-shop/users").replace(/\/$/, "");
  const resourceType =
    opts.resourceType === "video" ? "video" : opts.resourceType === "image" ? "image" : "auto";

  const uploadOptions = {
    folder,
    resource_type: resourceType,
    use_filename: false,
    unique_filename: true,
  };

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(uploadOptions, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        secure_url: result.secure_url,
        public_id: result.public_id,
      });
    });
    Readable.from(buffer).pipe(stream);
  });
}

/** Déduit image vs vidéo depuis le mimetype Multer. */
export function resourceTypeFromMime(mimetype) {
  if (!mimetype) return "auto";
  if (String(mimetype).startsWith("video/")) return "video";
  if (String(mimetype).startsWith("image/")) return "image";
  return "auto";
}

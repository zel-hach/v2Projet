/**
 * Cloudinary (upload non signé côté client).
 * Surcharge via `.env` : `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET`.
 */
export const CLOUDINARY_CLOUD_NAME =
  String(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? 'df1h3g1fk').trim() || 'df1h3g1fk';

export const CLOUDINARY_UPLOAD_PRESET =
  String(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? 'geeksInst').trim() || 'geeksInst';

export function cloudinaryUploadUrl(resource: 'image' | 'video'): string {
  return `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resource}/upload`;
}

export function appendCloudinaryUploadFields(fd: FormData): void {
  fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  fd.append('cloud_name', CLOUDINARY_CLOUD_NAME);
}

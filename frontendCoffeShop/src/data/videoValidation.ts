/** Aligné sur `back_end/middlewares/userUpload.js` (multer limits.fileSize) : 3 Go. */
export const MAX_VIDEO_BYTES = 3 * 1024 * 1024 * 1024;

/** Durée max acceptée pour une vidéo (secondes). */
export const MAX_VIDEO_DURATION_SEC = 180;

export function formatDurationSec(totalSec: number): string {
  const s = Math.max(0, Math.round(totalSec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m === 0) return `${r} s`;
  return `${m} min ${r.toString().padStart(2, '0')} s`;
}

export function validateVideoSize(file: File): { ok: true } | { ok: false; message: string } {
  if (file.size > MAX_VIDEO_BYTES) {
    return {
      ok: false,
      message: 'Fichier trop volumineux (maximum 3 Go).',
    };
  }
  return { ok: true };
}

/** Lit la durée via les métadonnées du navigateur (nécessite un format supporté). */
export function getVideoDurationSeconds(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;

    const cleanup = () => {
      URL.revokeObjectURL(url);
    };

    video.onloadedmetadata = () => {
      cleanup();
      const d = video.duration;
      if (!Number.isFinite(d) || d <= 0) {
        reject(new Error('Durée invalide'));
        return;
      }
      resolve(d);
    };

    video.onerror = () => {
      cleanup();
      reject(new Error('Lecture vidéo impossible'));
    };

    video.src = url;
  });
}

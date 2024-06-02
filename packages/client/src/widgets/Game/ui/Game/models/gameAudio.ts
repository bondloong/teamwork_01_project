import { IGameAudio } from '../GameInterfaces';

type LoadAudioFiles = (audioPaths: string[]) => Promise<HTMLAudioElement[]>;

export const loadAudioFiles: LoadAudioFiles = (audioPaths) => {
  const audioElements: HTMLAudioElement[] = audioPaths.map((path) => {
    const audio = new Audio(path);
    audio.preload = 'auto';
    return audio;
  });

  const loadPromises: Promise<HTMLAudioElement>[] = audioElements.map((audio) => {
    return new Promise((resolve, reject) => {
      audio.addEventListener('canplaythrough', () => resolve(audio), { once: true });
      audio.addEventListener(
        'error',
        () => reject(new Error(`Failed to load audio: ${audio.src}`)),
        { once: true }
      );
      audio.load(); // Initiates loading
    });
  });

  return Promise.all(loadPromises);
};

export const stopAllAudio = (audioElements: IGameAudio): void => {
  Object.values(audioElements).forEach((audio) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
};

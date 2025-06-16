import { ReactNode } from 'react';

type ImageLoaderProps = {
  src: string;
  alt: string;
  width?: string;
  className?: string;
};

const imageCache = new Map<string, boolean>();

const loadImage = async (src: string): Promise<void> => {
  try {
    if (imageCache.get(src)) {
      return;
    }

    const image = new Image();
    await new Promise<void>((resolve, reject) => {
      image.onload = () => {
        imageCache.set(src, true);
        resolve();
      };
      image.onerror = () => reject(new Error(`Kunde inte ladda bilden: ${src}`));
      image.src = src;
    });
  } catch (error) {
    console.error('Bildladdningsfel:', error);
    throw error;
  }
};

const ImageLoader = async ({ src, alt, className, width }: ImageLoaderProps): Promise<ReactNode> => {
  await loadImage(src);
  return <img width={width} src={src} alt={alt} className={className} />;
};

export default ImageLoader;

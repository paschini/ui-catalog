import { useState, useEffect, useContext } from 'react';
import Img from '../assets/icons/Img';
import { GlobalContext } from '../globalContext';

type ImageLoaderProps = {
  src: string;
  alt: string;
  width?: string;
  className?: string;
};

const ImageLoader = ({ src, alt, className, width }: ImageLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { globalDispatch } = useContext(GlobalContext);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoaded(true);
    };

    img.onerror = () => {
      setError(`Could not load image: ${src}`);
    };
  }, [src]);

  if (error) {
    console.error('Image loading error:', error);
    globalDispatch({ type: 'SET_ERROR', payload: { code: 13, message: error } });
    return <Img width={width} />;
  }

  return (
    <img
      width={width}
      src={src}
      alt={alt}
      className={className}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s'
      }}
    />
  );
};

export default ImageLoader;

'use client';
import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

type ImageWrapperProps = ImageProps & {
  errorSrc?: string;
};

const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  errorSrc,
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src as string);

  if (!imgSrc) return <Image {...props} src="/user.png" alt={alt} />;

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(errorSrc || '/user.png')}
    />
  );
};

export default ImageWrapper;

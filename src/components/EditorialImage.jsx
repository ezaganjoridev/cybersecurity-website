import React from 'react';

const IMAGE_WIDTHS = [960, 1600];

const imagePath = (base, width, format) => `${base}-${width}.${format}`;

const sourceSet = (base, format) =>
  IMAGE_WIDTHS.map((width) => `${imagePath(base, width, format)} ${width}w`).join(', ');

export const editorialImageUrl = (base, width = 1600, format = 'jpg') =>
  imagePath(base, width, format);

/**
 * Responsive local editorial image with modern formats and a broadly
 * compatible JPEG fallback. Every served stock image is cropped to 16:9.
 */
const EditorialImage = ({
  base,
  alt = '',
  className = '',
  imageClassName = '',
  sizes = '100vw',
  loading = 'lazy',
  fetchPriority,
}) => {
  if (!base) return null;

  return (
    <picture className={className}>
      <source srcSet={sourceSet(base, 'avif')} sizes={sizes} type="image/avif" />
      <source srcSet={sourceSet(base, 'webp')} sizes={sizes} type="image/webp" />
      <img
        src={imagePath(base, 1600, 'jpg')}
        srcSet={sourceSet(base, 'jpg')}
        sizes={sizes}
        width="1600"
        height="900"
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={imageClassName}
      />
    </picture>
  );
};

export default EditorialImage;

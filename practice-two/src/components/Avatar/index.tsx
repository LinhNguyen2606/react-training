import React from 'react';
import '@components/Avatar/Avatar.scss';

export type AvatarSize = 'lg' | 'md' | 'sm' | 'x-sm';

interface AvatarProps {
  alt: string;
  src?: string;
  size: AvatarSize;
  bgColor?: string;
  style?: React.CSSProperties;
}

const Avatar = ({
  src,
  alt,
  bgColor,
  size = 'sm',
  style
}: AvatarProps) => {
  const initial = alt?.charAt(0).toUpperCase();
  const circleClass = size === 'sm' || size === 'x-sm' ? 'avatar--circle' : '';

  return (
    <div
      className={`avatar avatar--${size} ${circleClass}`}
      style={{backgroundColor: bgColor, ...style }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`full-width full-height ${circleClass}`}
        />
      ) : (
        <span className={`avatar__initial avatar__text--${size}`}>
          {initial}
        </span>
      )}
    </div>
  );
};

export default Avatar;

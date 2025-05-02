import { ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  icon: ReactNode;
  height?: string;
  width?: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: ReactNode;
}

export default function Card({
  title,
  description,
  icon,
  height = "auto",
  width = "100%",
  className = "",
  iconClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  children
}: CardProps) {
  return (
    <div
      className={`rounded-2xl p-6 backdrop-blur-xl border border-white/10 ${className}`}
      style={{ height, width }}
    >
      <div className={iconClassName}>{icon}</div>
      <h3 className={titleClassName}>{title}</h3>
      <p className={descriptionClassName}>{description}</p>
      {children}
    </div>
  );
}

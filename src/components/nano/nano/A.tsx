"use client";

import React from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AProps {
  href: string;
  type?: "btn" | "mailto" | "a" | "push";
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const A: React.FC<AProps> = ({ href, type, children, className = " ", onClick, style }) => {
  const router = useRouter();

  switch (type) {
    case undefined:
      return (
        <Link href={href} className={className} style={style}>
          {children}
        </Link>
      );
    case "btn":
      return (
        <Link href={href} className={className} style={style} role="button" onClick={onClick}>
          {children}
        </Link>
      );
    case "a":
      return (
        <a href={href} target="_blank" rel="noreferrer" className={className} style={style}>
          {children}
        </a>
      );
    case "push":
      router.push(href);
      return null;
    default:
      return null;
  }
};

export default A;
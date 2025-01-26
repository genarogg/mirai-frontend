"use client";

import React from 'react';
import Link from "next/link";
interface AProps {
  href: string;
  id?: string;
  type?: "btn" | "mailto" | "a" | "push";
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const A: React.FC<AProps> = ({ href, type, children, className = " ", onClick, style, id = "" }) => {


  switch (type) {
    case undefined:
      return (
        <Link href={href} className={className} style={style} id={id}>
          {children}
        </Link>
      );
    case "btn":
      return (
        <Link href={href} className={className} style={style} id={id} role="button" onClick={onClick}>
          {children}
        </Link>
      );
    case "a":
      return (
        <a href={href} target="_blank" rel="noreferrer" className={className} style={style} id={id}>
          {children}
        </a>
      );

    default:
      return null;
  }
};

export default A;
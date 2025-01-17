'use client';
import React from 'react'
import { A, Icon } from "@nano";

interface NavProps {
  className?: string;
  isActive?: boolean;
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
  menuItems: {
    href: string;
    label?: string;
    icon?: React.ReactNode;
  }[];

  right?: boolean;
}

/* 
como usar

// Definir los elementos del header

const menuItems = [
  { href: "/", label: "Inicio", icon: <TiHome /> },
  { href: "#servicios", label: "Servicios", icon: <FaLightbulb /> },
  ...
];
*/

const Nav: React.FC<NavProps> = ({
  menuItems,
  className = "",
  isActive,
  setIsActive,
  right
}) => {
  return (
    <div
      className={`container-nav ${className}   ${isActive ? "active" : ""} ${menuItems[0].icon ? "" : "sin-iconos"
        }`}
    >
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setIsActive && setIsActive(!isActive);
              }}
              className={right ? "iconRight" : ""}
            >

              <A href={item.href}>
                {item.icon && (
                  <div className="container-icono">
                    <Icon icon={item.icon} />
                  </div>
                )}
                <label htmlFor="">
                  {item.label}
                </label>
              </A>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;

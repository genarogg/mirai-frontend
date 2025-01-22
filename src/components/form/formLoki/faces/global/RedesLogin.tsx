
'use client'
import React from 'react'
import { A, Icon } from "@nano"
import "./_redesLogin.scss"

import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";

interface RedesLoginProps {

}

const RedesLogin: React.FC<RedesLoginProps> = () => {
  const redes = [
    { link: "#", iconClass: "googleHover", icon: <FaGoogle /> },
    { link: "#", iconClass: "facebookHover", icon: <FaFacebookF /> },
    { link: "#", iconClass: "twitterHover", icon: <BsTwitterX /> },
    { link: "#", iconClass: "githubHover", icon: <FaInstagram /> },
  ];

  return (
    <div className="redesSocialesAnimadas">
      <ul>
        {redes.map((item, index) => (
          <li key={index}>
            <button type="button" onClick={() => { }}>
              <A href={item.link}>
                <Icon className={item.iconClass} icon={item.icon} />
                <span></span>
              </A>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RedesLogin;

"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Icon } from "@nano";
import { FaSquareCheck } from "react-icons/fa6";
import { ImCheckboxUnchecked } from "react-icons/im";

interface CheckBoxBasicProps {
  text: string;
  onClick?: () => void;
}

const CheckBoxBasic = forwardRef(({ text, onClick }: CheckBoxBasicProps, ref) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    onClick && onClick();
  };

  useImperativeHandle(ref, () => ({
    isChecked: isClicked,
  }));

  return (
    <div className="checkbox-basic" onClick={handleClick}>
      {isClicked ? (
        <Icon icon={<FaSquareCheck />} className="animate" />
      ) : (
        <Icon icon={<ImCheckboxUnchecked />} />
      )}
      <span className="text">{text}</span>
    </div>
  );
});

export default CheckBoxBasic;
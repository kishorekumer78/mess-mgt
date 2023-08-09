"use client";
import React from "react";

const fun = (id: number) => {
  console.log(id);
};
const Button = ({ id }): React.ReactElement => {
  return (
    <button className="btn" onClick={() => fun(id)}>
      Click
    </button>
  );
};

export default Button;

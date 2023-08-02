"use client";
import { Icon } from "@iconify/react";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: string;
}

// eslint-disable-next-line react/display-name
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, _forwardedRef) => {
    const { title, icon } = props;
    return (
      <button
        {...props}
        className="bg-nord-7 text-nord-6 rounded-lg p-2 w-52 h-12 flex justify-center items-center mb-4 text-lg border-4 border-nord-6 shadow-lg"
      >
        <div className="right-20 relative">
          {icon && <Icon icon={icon} className="w-6 h-6" />}
        </div>

        <strong className="fixed">{title}</strong>
      </button>
    );
  }
);

export default Button;
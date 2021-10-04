import * as React from "react";
import { useState } from "react";

export const useIconButton = () => {
  const [ripplePosition, setPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const elements = e.currentTarget.getElementsByClassName("ripple-effect");
    const effect = elements.item(0);
    const width = effect.clientWidth;
    const height = effect.clientHeight;

    setPosition({
      left: x - width / 2,
      top: y - height / 2,
    });

    window.setTimeout(() => setPosition(null), 750);
  };

  return { ripplePosition, onMouseDown };
};

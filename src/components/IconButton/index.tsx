import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp, IconProp } from "@fortawesome/fontawesome-svg-core";

import { useIconButton } from "./use";

import {
  RawButton,
  RippleEffect,
  IconButtonContainer,
  ButtonLabel,
} from "./items";

interface IconButtonProps {
  icon: IconProp;

  color?: string;
  onClick?: React.DOMAttributes<HTMLButtonElement>["onClick"];
  className?: string;
  label?: string;
  size?: SizeProp;
}

/**
 * @description Popupで使用するIconボタンコンポーネント
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  color,
  size = "lg",
  className = "",
  label = "",
  onClick,
}) => {
  const { ripplePosition, onMouseDown } = useIconButton();

  return (
    <IconButtonContainer>
      <RawButton
        background={color}
        className={`raw-btn ${className}`}
        onClick={onClick}
        onMouseDown={onMouseDown}
      >
        <RippleEffect className="ripple-effect" position={ripplePosition} />

        <FontAwesomeIcon icon={icon} size={size} />
      </RawButton>

      {label ? <ButtonLabel>{label}</ButtonLabel> : null}
    </IconButtonContainer>
  );
};

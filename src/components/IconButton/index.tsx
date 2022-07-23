import { SizeProp, IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import {
  RawButton,
  RippleEffect,
  IconButtonContainer,
  ButtonLabel,
} from "./items";
import { useIconButton } from "./use";

interface IconButtonProps {
  icon: IconDefinition;
  color?: string;
  onClick?: React.DOMAttributes<HTMLButtonElement>["onClick"];
  className?: string;
  label?: string;
  size?: SizeProp;
}

/**
 * Popupで使用するIconボタンコンポーネント
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
        <RippleEffect
          className="ripple-effect"
          position={ripplePosition || void 0}
        />

        <FontAwesomeIcon icon={icon} size={size} />
      </RawButton>

      {label ? <ButtonLabel>{label}</ButtonLabel> : null}
    </IconButtonContainer>
  );
};

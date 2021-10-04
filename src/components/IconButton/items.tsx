import styled, { keyframes, css } from "styled-components";

export const IconButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RawButton = styled.button<{ background: string }>`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  border: none;
  background: ${({ background }) => background || "gray"};
  color: white;
  cursor: pointer;
  outline: none;

  overflow: hidden;
  position: relative;
`;

export const ButtonLabel = styled.span`
  margin-top: 4px;
`;

const RippleAnimation = keyframes`
  from {
    opacity: 1;
  }

  to {
    transform: scale(2);
    opacity: 0;
  }
`;

const rippleRule = css`
  ${RippleAnimation} 1s infinite alternate;
`;

export const RippleEffect = styled.span<{
  position?: { top: number; left: number };
}>`
  width: 150px;
  height: 150px;

  position: absolute;
  border-radius: 100%;
  pointer-events: none;
  transform: scale(0);
  opacity: 0;

  background: rgba(65, 65, 65, 0.7);

  animation: ${({ position }) => (position ? rippleRule : "")};

  ${({ position }) =>
    position &&
    `  
    top: ${position.top}px;
    left: ${position.left}px;
  `}
`;

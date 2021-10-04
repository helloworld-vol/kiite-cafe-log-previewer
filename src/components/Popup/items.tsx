import styled from "styled-components";

export const PopupContainer = styled.div`
  color: white;
  background: rgba(0, 0, 0, 95%);
  border: none;
  padding: 1em;
  padding-bottom: 1.7em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const PopupTitle = styled.h1`
  font-weight: lighter;
  margin-bottom: 8px;
  font-size: 16px;
`;

export const IconContainer = styled.section`
  display: grid;
  grid-template-rows: 100px 100px;
  grid-template-columns: 150px 150px;
  grid-auto-flow: dense;
`;

export const ContainerItem = styled.div``;

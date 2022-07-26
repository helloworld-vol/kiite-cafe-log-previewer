import styled from "styled-components";

/**
 * styled componentsでCSSを定義
 */

export const MusicListBody = styled.div`
  position: relative;
`;

export const ListHeader = styled.header`
  display: flex;
  width: 100%;
  height: 48px;
  padding: 8px;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid gray;
  background: rgba(0, 0, 0, 0.75);
`;

export const ListTitle = styled.h2`
  font-size: 18px;
`;

export const ListBody = styled.ul`
  padding: 8px;
  list-style: none;
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - 48px);
`;

export const ListItem = styled.li`
  display: flex;
  padding: 8px 0px;
  position: relative;
  border-bottom: 1px solid gray;
`;

export const ListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 8px;
`;

export const Thumbnail = styled.img`
  width: 130px;
  height: 100px;
`;

export const PlayedDate = styled.span`
  font-size: 10px;
  margin-top: 16px;
`;

export const MusicTitle = styled.h3`
  max-width: 200px;
  font-size: 14px;
  margin-top: 8px;
  max-height: 32px;
  overflow: hidden;
  font-weight: bolder;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const AuthorName = styled.span`
  font-size: 12px;
  font-weight: bolder;
  margin-top: 8px;
`;

export const ListFooter = styled.div`
  right: 0;
  bottom: 0;
  margin: 4px;
  display: flex;
  position: absolute;
`;

export const HeartIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
  font-size: 14px;
`;

export const IconLabel = styled.span`
  font-size: 14px;
  font-weight: bolder;
  margin-left: 4px;
`;

export const LinkIcon = styled.div``;

export const NotFoundLabel = styled.p`
  color: white;
  margin: 16px;
  font-size: 16px;
  text-align: center;
  font-weight: bolder;
`;

export const ListMarginBottom = styled.div`
  width: 100%;
  height: 200px;
`;

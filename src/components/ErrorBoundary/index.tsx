import * as React from "react";
import styled from "styled-components";

const MessageWrapper = styled.div`
  display: flex;
  position: relative;
  padding-top: 17px;
  padding-left: 16px;
`;

const Message = styled.p`
  margin: 8px 0px;
  font-size: 16px;
  font-weight: bolder;
`;

/**
 * 子コンポーネントのエラーをキャッチし、エラーメッセージを表示するコンポーネント
 */
export class ErrorBoundary extends React.Component<{ message?: string }> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.log("エラーが発生しました", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <MessageWrapper>
          <Message>{this.props.message || "エラーが発生しました。"}</Message>
        </MessageWrapper>
      );
    }

    return this.props.children;
  }
}

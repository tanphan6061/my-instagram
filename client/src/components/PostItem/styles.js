import styled from "styled-components";

export const Article = styled.article`
  background: #fff;
  flex-direction: column;
  padding-bottom: 20px;
  padding-top: 0px;
  border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  border-radius: 3px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
`;

export const Content = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #efefef;
`;

export const Text = styled.p`
  padding: 5px 0;
  font-weight: bolder;
`;

export const Footer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  flex-shrink: 1;
  padding: 10px 20px 0;
`;

export const TextArea = styled.textarea`
  height: 18px;
  border: 0;
  display: flex;
  max-height: 18px;
  resize: none;
  outline: 0;
  line-height: 18px;
  flex-grow: 1;
  overflow: hidden;
`;

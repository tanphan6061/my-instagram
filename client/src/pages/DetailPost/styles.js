import styled from "styled-components";

export const Article = styled.article`
  width: 40%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 20px;
  padding-top: 0px;
  border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  border-radius: 3px;
  margin: 0;
`;

export const Media = styled.div`
  width: 60%;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
`;

export const Content = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #efefef;
  overflow: hidden;
`;

export const Text = styled.p`
  display: inline-block;
  padding: 5px 0;
  font-weight: bolder;
  margin-right: 5px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
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

export const ColorActiveButton = styled.button`
  color: #0095f6;
  font-weight: bold;
  outline: none;
  border: 0;
  background: #fff;
`;

export const Username = styled.span`
  font-size: 14px;
  color: #262626;
  font-weight: 600;
`;

export const CreatedAt = styled.p`
  color: #8e8e8e !important;
  padding: 5px 0 0;
  font-size: 11px !important;
`;

export const ShowAllComments = styled.div`
  height: 375px;
  width: 115%;
  overflow-y: scroll;
  margin-bottom: 20px;
`;

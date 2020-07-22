import styled from "styled-components";

export const UserInfo = styled.div`
  padding: 0 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 50px;
  border-bottom: 1px solid #dedede;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 67%;
`;

export const Username = styled.h2`
  color: #262626;
  font-size: 28px;
  font-weight: 300;
`;

export const EditProfile = styled.button`
  background: transparent;
  border: 1px solid #dbdbdb;
  color: #262626;
  font-weight: 600;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 14px;
  margin: 0 20px;
`;

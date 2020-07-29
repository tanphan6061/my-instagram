import styled from "styled-components";

export const MainHeader = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GroupSearch = styled.div`
  position: relative;
`;

export const Accounts = styled.div`
  width: 100%;
  height: 200px;
  overflow-y: scroll;
  position: absolute;
  display: flex;
  flex-direction: column;
  background: #fff;
`;

export const Account = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
`;

export const Avatar = styled.div`
  width: 20%;
`;

export const Name = styled.div`
  margin-left: 13px;
`;

export const Username = styled.div`
  color: #262626;
  font-weight: 500;
`;

export const Fullname = styled.div`
  color: #8e8e8e;
`;

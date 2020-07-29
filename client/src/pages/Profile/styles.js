import styled from "styled-components";

export const PageProfile = styled.div`
  width: 60%;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid #bebebe;
  padding: 10px 0;
`;

export const Title = styled.div`
  text-align: center;
  font-size: 17px;
  font-weight: 400;
`;

export const ButtonClose = styled.span`
  text-align: end;
  padding-right: 27px;
  font-size: 17px;
  cursor: pointer;
`;

export const AccountList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccountItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.div`
  width: 13%;
`;

export const Name = styled.div`
  margin-left: 10px;
`;

export const Username = styled.div`
  color: #262626;
  font-weight: 600;
`;

export const Fullname = styled.div`
  font-size: 14px;
  color: #8f8f8f;
`;

export const Follow = styled.div`
  background: #0095f6;
  padding: 5px 10px;
  border-radius: 0.25rem;
  color: #fff;
  font-size: 14px;
  cusor: pointer;
`;

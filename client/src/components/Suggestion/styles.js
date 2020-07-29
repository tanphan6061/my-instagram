import styled from "styled-components";

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const Label = styled.label`
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 2.5rem;
  margin: 20px 0;
`;

export const FileInput = styled.input`
  min-width: 14rem;
  margin: 0;
  opacity: 0;
`;

export const FileCustom = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  line-height: 1.5;
  color: #555;
  background-color: #fff;
  border: 0.075rem solid #ddd;
  border-radius: 0.25rem;
  box-shadow: inset 0 0.2rem 0.4rem rgba(0, 0, 0, 0.05);
  user-select: none;
`;

import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  width: ${(props) => (props.width ? props.width : "100%")};
`;

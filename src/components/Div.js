import styled from "styled-components";

export const CentralDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => (props.mt ? props.mt : "50px")};
  width: 100%;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 4px;
  }
`;

export const SwitchingDiv = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const Flex = styled.div`
  display: flex;
  background: ${(props) => (props.bg ? props.bg : "none")};
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  height: ${(props) => (props.height ? props.height : "auto")};
  gap: ${(props) => (props.gap ? props.gap : "0px")};
  width: ${(props) => (props.width ? props.width : "auto")};
  flex: 1;

  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  background: ${(props) => (props.bg ? props.bg : "none")};
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  height: ${(props) => (props.height ? props.height : "auto")};
  gap: ${(props) => (props.gap ? props.gap : "0px")};
  flex: 1;
`;

export const FlexChild = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.bg ? props.bg : "none")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  padding: ${(props) => (props.padding ? props.padding : "10px")};
  margin: ${(props) => (props.margin ? props.margin : "0px")};
  box-shadow: ${(props) => (props.shadow ? props.shadow : "none")};
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: var(--border);
  margin: 4px 0;
`;

// Modernized card surface — clean 1px full border, no dated 3px top accent.
export const BoxWithShadow = styled.div`
  background-color: var(--card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
  margin: 20px;
  padding: ${(props) => (props.padding ? props.padding : "24px")};
  text-align: center;
  height: auto;
  transition:
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    box-shadow: var(--shadow-md);
  }
`;

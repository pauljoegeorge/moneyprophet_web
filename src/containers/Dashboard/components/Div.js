import styled from "@emotion/styled";

export const MainWrapper = styled.div`
  background-color: var(--card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  padding: 24px;
  width: 100%;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  text-align: ${(props) => (props.align ? props.align : "unset")};

  &:hover {
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 767px) {
    width: 100%;
    padding: 16px;
  }
`;

import styled from "styled-components";

export const THead = styled.thead`
  background-color: var(--muted);
  color: var(--muted-foreground);
  font-weight: 600;
  font-size: 0.6875rem;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  line-height: 1;
`;

export const CustomRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 767px) {
    > * {
      margin-bottom: 20px;
    }
  }
`;

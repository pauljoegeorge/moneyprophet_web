import styled from "styled-components";

export const H1 = styled.h1`
  font-family: var(--font-display), sans-serif;
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: ${(props) => (props.color ? props.color : "var(--foreground)")};
`;

export const H1Bold = styled.h1`
  font-family: var(--font-display), sans-serif;
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: var(--foreground);
`;

export const H2 = styled.h2`
  font-family: var(--font-display), sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: var(--foreground);
`;

export const H2Purple = styled.h2`
  font-family: var(--font-display), sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: var(--primary);
`;

export const H3Bold = styled.h3`
  font-family: var(--font-display), sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.4;
  letter-spacing: -0.03em;
  color: var(--foreground);
  text-align: ${(props) => (props.align ? props.align : "left")};
`;

export const PBold = styled.p`
  font-family: var(--font-body), sans-serif;
  font-size: ${(props) => (props.size ? props.size : "11px")};
  font-weight: 600;
  letter-spacing: 0.6px;
  line-height: ${(props) => (props.height ? props.height : "1.5")};
  color: var(--muted-foreground);
  margin-bottom: ${(props) => (props.mb ? props.mb : "6px")};
  text-transform: ${(props) => (props.tt ? props.tt : "uppercase")};
  text-align: ${(props) => (props.align ? props.align : "center")};
  padding: ${(props) => (props.padding ? props.padding : "0px")};
  width: 100%;
  word-break: ${(props) => (props.wordBreak ? props.wordBreak : "normal")};
`;

export const P = styled.p`
  font-family: var(--font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: ${(props) => (props.size ? props.size : "14px")};
  font-weight: 400;
  line-height: 1.6;
  color: var(--foreground);
  text-align: ${(props) => (props.align ? props.align : "left")};
  text-transform: ${(props) => (props.tt ? props.tt : "none")};
  width: 100%;
  word-break: ${(props) => (props.wordBreak ? props.wordBreak : "normal")};
`;

export const H1Span = styled.span`
  font-family: var(--font-display), sans-serif;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: ${(props) => (props.color ? props.color : "var(--primary-foreground)")};
`;

export const H3Span = styled.span`
  font-family: var(--font-display), sans-serif;
  font-weight: 400;
  line-height: 1.2;
  border: ${(props) => (props.border ? props.border : "1px solid var(--border)")};
  padding: 1rem;
  margin-right: 1rem;
  color: ${(props) => (props.color ? props.color : "var(--foreground)")};
`;

export const PText = styled.span`
  font-family: var(--font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: ${(props) => (props.size ? props.size : "1rem")};
  font-weight: ${(props) => (props.weight ? props.weight : 400)};
  line-height: ${(props) => (props.height ? props.height : 1.5)};
  text-align: ${(props) => (props.align ? props.align : "left")};
  text-transform: ${(props) => (props.tt ? props.tt : "none")};
  background: ${(props) => (props.bg ? props.bg : "unset")};
  padding: ${(props) => (props.padding ? props.padding : "0px")};
  border-radius: ${(props) => (props.br ? props.br : "0px")};
  color: ${(props) => (props.color ? props.color : "var(--foreground)")};
`;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "../../components/Link";
import { pushEvent, events } from "../../utils/gtm";

const Wrapper = styled.div`
  background-color: var(--background);
  min-height: 100vh;
  overflow-y: auto;
`;

const ChildWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

function LayoutContainer(props) {
  const { children } = props;
  const handlePrivacy = () => {
    pushEvent({ ...events.onClickPrivacy() });
    return window.open(`${import.meta.env.BASE_URL}privacy.html`, "_blank");
  };

  return (
    <Wrapper>
      <ChildWrapper>{children}</ChildWrapper>
      <footer className="mt-12 py-4">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center">
            <Link onClick={() => handlePrivacy()}>| Privacy Policy |</Link>
            <p>&copy; {new Date().getFullYear()} Money Prophet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </Wrapper>
  );
}

LayoutContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ userId: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutContainer;

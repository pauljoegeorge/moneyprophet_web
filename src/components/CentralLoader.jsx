import React from "react";
import { Flex } from "./Div";

function CentralLoader() {
  return (
    <div className="w-full">
      <Flex align="center" justify="center" height="100vh">
        <div
          className="inline-block w-8 h-8 rounded-full animate-spin"
          style={{ border: "4px solid var(--border)", borderTopColor: "var(--primary)" }}
          role="status"
          aria-label="Loading"
        />
      </Flex>
    </div>
  );
}

export default CentralLoader;

import { render } from "@testing-library/react";
import React from "react";
import Provider from "../context/myProvider";

function renderContext(component) {
  return(
    render(
      <Provider>
        {component}
      </Provider>
    )
  )
}

export default renderContext;
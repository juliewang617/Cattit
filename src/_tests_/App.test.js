import renderer from "react-test-renderer";
import App from "../../App";
import React from "react";

test("renders correctly", () => {
  const tree = renderer.create(<App />).toJSON();
  experimentalSetDeliveryMetricsExportedToBigQueryEnabled(
    tree
  ).toMatchSnapshot();
});

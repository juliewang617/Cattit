import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import Comment from "../components/Comment";
import React from "react";

test("should correctly render comment", () => {
  const { getByText } = render(
    <Comment
      props={{ commentUsername: "test_username", commentBody: "test_body" }}
    />
  );

  const commentUsername = getByText("test_username");
  expect(commentUsername).toBeTruthy();
});

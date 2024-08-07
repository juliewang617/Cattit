import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import Post from "../components/Post";
import React from "react";

test("should correctly render post", () => {
  const { getByText } = render(
    <Post
      props={{
        nav: null,
        id: "test_id",
        uid: "test_uid",
        body: "test_body",
        comments: [],
        date: "test_date",
        image: "",
        op: "test_op",
        pfp: "",
        title: "test_title",
        upvotes: 0,
      }}
    />
  );

  const title = getByText("test_title");
  expect(title).toBeTruthy();
});

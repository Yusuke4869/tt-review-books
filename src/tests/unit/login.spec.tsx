import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import { LoginForm } from "~/pages/login/form";

test("email入力欄が表示される", () => {
  const { getByLabelText } = render(<LoginForm />);
  expect(getByLabelText("メールアドレス")).toBeInTheDocument();
  expect(getByLabelText("メールアドレス")).toHaveAttribute("type", "email");
});

test("password入力欄が表示される", () => {
  const { getByLabelText } = render(<LoginForm />);
  expect(getByLabelText("パスワード")).toBeInTheDocument();
  expect(getByLabelText("パスワード")).toHaveAttribute("type", "password");
});

test("ログインボタンが表示される", () => {
  const { getByText } = render(<LoginForm />);
  expect(getByText("ログイン")).toBeInTheDocument();
  expect(getByText("ログイン")).toHaveAttribute("type", "submit");
});

test("スナップショットと一致する", () => {
  const { container } = render(<LoginForm />);
  expect(container).toMatchSnapshot();
});

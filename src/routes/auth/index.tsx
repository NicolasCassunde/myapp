import { authClient } from "@/lib/auth/auth-client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  async function login() {
    await authClient.signIn.magicLink({
      email: "neo1@gmail.com",
      newUserCallbackURL: "/",
      name: "Neo",
    });
  }

  return (
    <div>
      <span onClick={() => login()}>login</span>
    </div>
  );
}

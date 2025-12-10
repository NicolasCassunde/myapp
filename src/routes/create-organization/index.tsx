import { OrganizationForm } from "@/components/core/create-org";
import { Logo } from "@/components/ui/logo";
import { getSessionFn } from "@/data/getSessionFn";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/create-organization/")({
  component: RouteComponent,
  loader: async () => {
    const session = await getSessionFn();
    return session;
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();
  if (!data)
    throw redirect({
      to: "/auth",
    });
  return (
    <div className="flex items-center h-screen mx-auto justify-center flex-col max-w-[396px]">
      <div className="w-full h-[196px] rounded-[46px] dark:bg-accent/10  bg-primary/5 p-4 relative overflow-hidden">
        <div className="w-20 h-20 dark:bg-accent/15  bg-primary/10 rounded-[30px]" />

        <Logo className="absolute scale-x-[-1] size-40 right-0 top-20 z-10" />
        <Logo
          variant="orange"
          className="absolute scale-x-[-1] size-38 -right-10 top-8 rotate-10 z-5"
        />
        <Logo
          variant="green"
          className="absolute scale-x-[-1] size-30 right-10 top-8 -rotate-10 z-3"
        />

        <Logo
          variant="pink"
          className="absolute scale-x-[-1] size-26 -right-5 -top-2 -rotate-10 z-2"
        />

        <Logo
          variant="purple"
          className="absolute scale-x-[-1] size-26 right-6 -top-2 -rotate-10"
        />
      </div>
      <OrganizationForm userId={data.session.userId} />
    </div>
  );
}

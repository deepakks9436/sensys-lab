import type {
  ReactNode,
} from "react";

import HubShell from "../../components/hub/HubShell";
import { getHubUser } from "../../lib/hub/auth";

export default async function HubLayout({
  children,
}: {
  children: ReactNode;
}) {
  const context =
    await getHubUser();

  return (
    <HubShell
      profile={{
        fullName:
          context.profile.fullName,

        email:
          context.profile.email,

        role:
          context.profile.role,
      }}
      studentId={
        context.studentId
      }
    >
      {children}
    </HubShell>
  );
}
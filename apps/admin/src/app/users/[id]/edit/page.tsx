import { notFound } from "next/navigation";
import { getUserById } from "@/lib/actions/users/getUserById";
import { UserEditForm } from "@/components/organisms/User/UserEditForm";

interface EditUserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <UserEditForm
      userId={user.id}
      defaultValues={{
        name: user.name,
        email: user.email,
        role: user.role,
      }}
    />
  );
}

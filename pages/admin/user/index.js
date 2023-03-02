import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { userService } from "@/services/user.service";
import Link from "next/link";
import UserTablePage from "./userTable";

export default function UsersPage() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
  }, []);

  let userContent = <p className="p-2">No records were found.</p>;

  if (users && users.length > 0) {
    userContent = <UserTablePage data={users} />;
  }

  return (
    <>
      {!users && <Spinner />}
      {userContent}
    </>
  );
}

UsersPage.layout = "Admin";

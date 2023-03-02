import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { alertService } from "@/services/alert.service";
import { statusService } from "@/services/status.service";
import Delete from "../delete";

export default function PreDelete({ id }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    statusService
      .getById(id)
      .then((x) => setStatus(x))
      .catch(alertService.error);
  }, []);

  return <>{status ? <Delete status={status} /> : <Spinner />}</>;
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
PreDelete.auth = true;
PreDelete.layout = "Admin";

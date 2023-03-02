import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { alertService } from "@/services/alert.service";
import { statusService } from "@/services/status.service";
import AddEdit from "../addedit";

export default Edit;

function Edit({ id }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // fetch user and set default form values if in edit mode
    statusService
      .getById(id)
      .then((x) => setStatus(x))
      .catch(alertService.error);
  }, []);

  return <>{status ? <AddEdit status={status} /> : <Spinner />}</>;
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
Edit.auth = true;
Edit.layout = "Admin";

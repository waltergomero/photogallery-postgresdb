import { useState, useEffect } from "react";
import { statusService } from "@/services/status.service";
import { Spinner } from "@/components/Spinner";
import StatusTable from "./statusTable";

export default function StatusPage(props) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    statusService.getAll().then((x) => setStatus(x));
  }, []);

  let statusContent = <p className="p-2">No records were found.</p>;

  if (status && status.length > 0) {
    statusContent = <StatusTable data={status} />;
  }
  return (
    <>
      {!status && <Spinner />}
      {statusContent}
    </>
  );
}
StatusPage.auth = true;
StatusPage.layout = "Admin";

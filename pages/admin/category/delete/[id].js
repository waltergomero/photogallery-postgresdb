import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { alertService } from "@/services/alert.service";
import { categoryService } from "@/services/category.service";
import Delete from "../delete";

export default function PreDelete({ id }) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    categoryService
      .getById(id)
      .then((x) => setCategory(x))
      .catch(alertService.error);
  }, []);

  return <>{category ? <Delete data={category} /> : <Spinner />}</>;
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
PreDelete.auth = true;
PreDelete.layout = "Admin";

import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { alertService } from "@/services/alert.service";
import { categoryService } from "@/services/category.service";
import Add from "../add";

export default Edit;

function Edit({ id }) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    // fetch user and set default form values if in edit mode
    categoryService
      .getById(id)
      .then((x) => setCategory(x))
      .catch(alertService.error);
  }, []);

  return <>{category ? <Add category={category} /> : <Spinner />}</>;
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
Edit.auth = true;
Edit.layout = "Admin";

import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { categoryService } from "@/services/category.service";
import CategoryTable from "./categoryTable";

export default function Categories() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    categoryService.getAll().then((x) => setCategories(x));
  }, []);

  let categoryContent = <p className="p-2">No records were found.</p>;

  if (categories && categories.length > 0) {
    categoryContent = <CategoryTable data={categories} />;
  }
  return (
    <>
      {!categories && <Spinner />}
      {categoryContent}
    </>
  );
}
Categories.auth = true;
Categories.layout = "Admin";

import Link from "next/link";

export default function CategoryTable(props) {
  const categories = props.data;

  return (
    <>
      <div className="flex h-full flex-col rounded p-4 border border-indigo-200">
        <h5 className="text-dark text-lg leading-tight font-medium mb-2">
          Categories
        </h5>
        <div>
          <Link
            href="/admin/category/add"
            className="px-4 py-1.5 bg-blue-600 text-white font-medium text-xs uppercase rounded"
          >
            Add Category
          </Link>
        </div>
        <table className="border  mt-2 mb-4">
          <thead className=" border-b bg-gray-100">
            <tr>
              <th className="text-sm text-gray-700  px-6 py-1 border-r">#</th>
              <th className="text-sm text-gray-700  px-6 py-1 border-r">
                Category Name
              </th>
              <th className="text-sm text-gray-700  px-6 py-1 border-r">
                Parent Category Name
              </th>
              <th className="text-sm text-gray-700  px-6 py-1 border-r">
                Status
              </th>
              <th className="text-sm text-gray-700  px-6 py-1 border-r">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((c) => (
                <tr className="border-b" key={c.category_id}>
                  <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                    {c.category_id}
                  </td>
                  <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                    {c.category_name}
                  </td>
                  <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                    {c.parent_category_name}
                  </td>
                  <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                    {c.status_name}
                  </td>
                  <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                    <Link
                      href={`/admin/category/edit/${c.category_id}`}
                      className="px-4 py-1 bg-blue-500 text-white font-medium text-xs rounded"
                    >
                      Edit
                    </Link>
                    <span>&nbsp; </span>
                    <Link
                      href={`/admin/category/delete/${c.category_id}`}
                      className="px-4 py-1 bg-red-500 text-white font-medium text-xs rounded"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
CategoryTable.auth = true;
CategoryTable.layout = "Admin";

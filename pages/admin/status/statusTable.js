import React from "react";
import Link from "next/link";

const StatusTable = (props) => {
  const status = props.data;

  return (
    <>
      <div className="flex h-full flex-col rounded p-4 border border-indigo-200">
        <h5 className="text-dark text-lg leading-tight font-medium mb-2">
          Status
        </h5>
        <div>
          <Link
            href="/admin/status/addedit"
            className="px-4 py-1.5 bg-blue-600 text-white font-medium text-xs uppercase rounded"
          >
            Add Status
          </Link>
        </div>
        <table className="border text-center mt-2 mb-4">
          <thead className="border-b bg-gray-100">
            <tr>
              <th className="text-sm text-gray-700  px-6 py-1 border-r">
                Status Id
              </th>
              <th className="text-sm text-gray-700  px-6 py-1 border-r">
                Status Name
              </th>
              <th className="text-sm text-gray-700  px-6 py-1 border-r">
                Status Type Id
              </th>
              <th className="text-sm text-gray-700  px-6 py-1 border-r">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {status &&
              status.map((s) => (
                <tr className="border-b" key={s.status_id}>
                  <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                    {s.status_id}
                  </td>
                  <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                    {s.status_name}
                  </td>
                  <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                    {s.status_typeid}
                  </td>
                  <td className="text-sm text-gray-900  px-6 py-1 whitespace-nowrap border-r">
                    <Link
                      href={`/admin/status/edit/${s.status_id}`}
                      className="px-4 py-1 bg-blue-500 text-white font-medium text-xs uppercase rounded"
                    >
                      Edit
                    </Link>
                    <span>&nbsp; </span>
                    <Link
                      href={`/admin/status/delete/${s.status_id}`}
                      className="px-4 py-1 bg-red-500 text-white font-medium text-xs uppercase rounded"
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
};

export default StatusTable;
StatusTable.auth = true;
StatusTable.layout = "Admin";

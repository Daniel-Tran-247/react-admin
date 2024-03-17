import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Add from "../../components/add/Add";
import DataTable from "../../components/dataTable/DataTable";
import { endpoint } from "../../utils/endpoint";
import "./users.scss";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avartar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 110,
    editable: true,
    type: "string",
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 110,
    editable: true,
    type: "string",
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: true,
    type: "string",
  },
  {
    field: "phone",
    headerName: "phone",
    width: 150,
    type: "string",
    editable: true,
  },
  {
    field: "createdAt",
    headerName: "Created at",
    width: 160,
    type: "string",
    editable: true,
  },
  {
    field: "verified",
    headerName: "Verified",
    type: "boolean",
    editable: true,
  },
];

export default function Users() {
  const [open, setOpen] = useState(false);
  const { isLoading, error, data } = useQuery({
    queryKey: ["allusers"],
    queryFn: () => fetch(`${endpoint}/api/users`).then((res) => res.json()),
  });
  if (error) return <>An error has occurred: {error.message}</>;
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="table">
          <DataTable slug={"users"} columns={columns} rows={data} />
        </div>
      )}
      {open && <Add setOpen={setOpen} slug={"users"} columns={columns} />}
    </div>
  );
}

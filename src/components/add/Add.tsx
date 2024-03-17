import { GridColDef } from "@mui/x-data-grid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endpoint } from "../../utils/endpoint";
import "./add.scss";

interface Props {
  slug: string;
  columns: GridColDef[];
  setOpen: (open: boolean) => void;
}
export default function Add(props: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${endpoint}/api/${props.slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id: 111,
          img: "",
          lastName: "Test",
          firstName: "Hello",
          email: "testme@gmail.com",
          phone: "123 123 123",
          createdAt: "10.10.2024",
          verified: true,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`all${props.slug}`] });
      props.setOpen(false);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.headerName} />
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

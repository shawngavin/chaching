import { useReactiveVar } from "@apollo/client";
import { selectedVar } from "../../local-store";
import { Button, Column } from "primereact";

export const ColumnDelete = ({ action }) => {
  const selected = useReactiveVar(selectedVar);
  return (
    <Column
      body={(rowData) =>
        selected?.id === rowData.id && (
          <Button className="p-button-text" alt="delete record" onClick={action}>
            <i className="pi pi-times-circle" />
          </Button>
        )
      }
    />
  );
};

import React, {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

interface DetailProps {
  content: string;
}

interface MasterContext {
  selectedPayload?: DetailProps;
  setSelectedPayload: (value: DetailProps) => void;
}

// Define the context for sharing state
const MasterDetailContext = createContext<MasterContext | undefined>(undefined);

// Main component
export const MasterDetail = ({ children }: { children: ReactNode }) => {
  const [selectedPayload, setSelectedPayload] = useState<
    DetailProps | undefined
  >(undefined);

  // Annotation: With more time I would do this check in a more robust way, so that it also works if only one element is given as a child.
  if (!Array.isArray(children)) {
    return <div>MasterDetail needs to receive a list of elements</div>;
  }

  // Provide the selected payload and setter function to child components
  return (
    <MasterDetailContext.Provider
      value={{ selectedPayload, setSelectedPayload }}
    >
      {selectedPayload ? (
        <ul className="flex flex-grow">
          <div className="flex flex-col flex-grow">{children.slice(0, -1)}</div>
          <div className="flex-grow">{children.slice(-1)}</div>
        </ul>
      ) : (
        <ul className="flex flex-col">{children}</ul>
      )}
    </MasterDetailContext.Provider>
  );
};

// Item component
const Item = ({
  children,
  payload,
}: {
  children: ReactNode;
  payload: DetailProps;
}) => {
  const context = useContext(MasterDetailContext);

  if (!context) {
    throw new Error(
      "MasterDetail.Item must be used within a MasterDetail provider"
    );
  }

  return (
    <li>
      <button onClick={() => context.setSelectedPayload(payload)}>
        {children}
      </button>
    </li>
  );
};

// Detail component
const Detail = ({
  children,
}: {
  children: (selectedPayload: DetailProps) => ReactNode;
}) => {
  const context = useContext(MasterDetailContext);

  if (!context) {
    throw new Error(
      "MasterDetail.Item must be used within a MasterDetail provider"
    );
  }

  // Render the children with the selected payload, if any
  return (
    <div>{context.selectedPayload && children(context.selectedPayload)}</div>
  );
};

MasterDetail.Item = Item;
MasterDetail.Detail = Detail;

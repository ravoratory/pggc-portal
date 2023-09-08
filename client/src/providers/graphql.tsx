import { Provider } from "urql";

import useClient from "../graphql/client";

interface GraphqlProviderProps {
  children: any;
}

const GraphqlProvider: React.FC<GraphqlProviderProps> = ({ children }) => {
  const client = useClient();

  return <Provider value={client}>{children}</Provider>;
};

export default GraphqlProvider;

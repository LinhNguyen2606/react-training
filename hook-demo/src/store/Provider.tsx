import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

type ProviderProps = {
  children: ReactNode;
};

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 1000,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default Provider;

import React, { PropsWithChildren } from 'react';

export const FormLabel = ({ children }: PropsWithChildren) => {
  return <div className="text-xs">{children}</div>;
};

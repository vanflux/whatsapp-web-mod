import React, { ReactNode } from 'react';

interface Props {
  size?: number;
  bold?: boolean;
  children?: ReactNode;
}

export const Text = ({ size, bold, children }: Props) => {
  return (
    <div style={{ fontSize: size, fontWeight: bold ? 'bold' : undefined }} className="text-xs">
      {children}
    </div>
  );
};

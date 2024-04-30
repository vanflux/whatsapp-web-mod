import React, { CSSProperties, ReactNode, useMemo } from "react";

interface Props {
  direction?: "column" | "row" | "column-reverse" | "row-reverse";
  align?: "center" | "start" | "end";
  justify?: "center" | "start" | "end" | "between" | "around";
  gap?: number;
  flex?: number;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

const alignMapping = {
  center: "center",
  start: "flex-start",
  end: "flex-end",
};

const justifyMapping = {
  center: "center",
  start: "flex-start",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
};

export const Flex = ({ direction, align, justify, gap, flex, style, className, children }: Props) => {
  const internalStyle = useMemo(
    () => ({
      display: "flex",
      alignItems: alignMapping[align!],
      justifyContent: justifyMapping[justify!],
      flexDirection: direction,
      gap,
      flex,
      ...style,
    }),
    [style],
  );
  return (
    <div className={className} style={internalStyle}>
      {children}
    </div>
  );
};

import { Skeleton } from "moti/skeleton";
import React, { memo } from "react";
import { DimensionValue } from "react-native";

export type SkeletonTextProps = {
    width?: DimensionValue;
    height: number;
};

const SkeletonText = ({ width = "100%", height }: SkeletonTextProps) => {
    return <Skeleton colorMode={"light"} width={width} height={height} />;
};

export default memo(SkeletonText);

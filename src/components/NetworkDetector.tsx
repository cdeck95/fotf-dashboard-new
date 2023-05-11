import { useNetworkMismatch } from "@thirdweb-dev/react";

export const Detector = () => {
    const isMismatched = useNetworkMismatch();
  
    return <div>{isMismatched}</div>;
  };
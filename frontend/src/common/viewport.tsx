import { Grid } from "antd";

export const useViewPort = () => {
  const bp = Grid.useBreakpoint();
  const isMobile = bp.xs;
  return { isMobile };
};

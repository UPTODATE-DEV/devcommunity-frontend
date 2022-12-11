import { useMediaQuery } from "react-responsive";

export function useMobileMediaQuery() {
  return useMediaQuery({ maxWidth: 600 });
}

import { colors } from "./palette";

export const outlineWithShadowLarge = {
  border: `4px solid ${colors.offBlack}`,
  boxShadow: `8px 8px ${colors.offBlack}`,
};

export const borderSmall = {
  border: `2px solid ${colors.offBlack}`,
};

export const outlineWithShadowSmall = {
  ...borderSmall,
  boxShadow: `4px 4px ${colors.offBlack}`,
};

export const textShadowSmall = {
  textShadow: `2px 2px 0 ${colors.offBlack}`,
};

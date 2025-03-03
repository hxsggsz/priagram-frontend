import { ComponentPropsWithRef } from "react";

export type BaseSwitchProps = Omit<ComponentPropsWithRef<"input">, "onChange">;

export type SwitchProps = BaseSwitchProps & {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

import { ChangeEvent, forwardRef } from "react";
import { SwitchProps } from "./types";
import css from "./switch.module.css";

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      if (props.onChange) props.onChange(event.target.checked);
    };

    return (
      <input
        checked={props.checked}
        className={css.switch}
        onChange={handleChange}
        ref={ref}
        type="checkbox"
      />
    );
  }
);

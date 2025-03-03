import { ButtonProps } from "./types";
import css from "./index.module.css";

export const Button = (props: ButtonProps) => {
  return <button {...props} className={css.button} />;
};

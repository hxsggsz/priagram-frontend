import { useTheme } from "@/hooks/useTheme";

export const Header = () => {
  const { toggleTheme } = useTheme();
  return (
    <>
      <header> theme toggle</header>
      <button onClick={() => toggleTheme()}>toggle</button>
    </>
  );
};

import { Panel } from "@xyflow/react";
import bcss from "@/components/button/index.module.css";
import css from "./index.module.css";
import { Desktop, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

export const SocialMediaButtons = () => {
  return (
    <Panel className={css.wrapper}>
      <a
        className={bcss.button}
        title="Github"
        href="https://github.com/hxsggsz"
        target="_blank"
      >
        <GithubLogo size={20} weight="fill" />
      </a>

      <a
        className={bcss.button}
        title="Linkedin"
        href="https://www.linkedin.com/in/hxsggsz/"
        target="_blank"
      >
        <LinkedinLogo size={20} weight="fill" />
      </a>

      <a
        className={bcss.button}
        title="Portfolio"
        href="https://hxsggsz.vercel.app/"
        target="_blank"
      >
        <Desktop size={20} weight="fill" />
      </a>
    </Panel>
  );
};

import { navbar } from "vuepress-theme-hope";

const hostname = "https://www.takeseem.com";

export default navbar([
  "/",
  "/code/",
  {
    text: "Demo",
    icon: "hand-pointer",
    children: [
      { text: "Demo React", icon: "fa-brands fa-react", link: `${hostname}/demo-react` },
    ],
  },
	"/arch-design/",
  "/whisper/",  
  "/intro",
]);

export { hostname }
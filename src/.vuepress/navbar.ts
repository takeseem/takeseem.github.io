import { navbar } from "vuepress-theme-hope";

const hostname = "https://www.takeseem.com";

export default navbar([
  "/",
  "/code/",
  {
    text: "编程演示",
    icon: "hand-pointer",
    children: [
      { text: "Demo React", icon: "fa-brands fa-react", link: `${hostname}/demo-react`, target: "_demo-react"},
    ],
  },
	"/arch-design/",
  "/whisper/",  
  "/intro",
]);

export { hostname }
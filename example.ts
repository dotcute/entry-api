import { User } from "./mod.ts";

const dukhwa = new User({ id: "60bc5559659bf40bd15d022c" });

console.log(await dukhwa.toJSON());

import createVar from "./src/var.ts";

const [getLogon, setLogon] = createVar(false);

export { getLogon, setLogon };
export { login } from "./src/user.ts";
export { default as User } from "./src/classes/user.ts";
export { getCSRFToken } from "./src/utils.ts";

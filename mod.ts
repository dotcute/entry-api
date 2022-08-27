import createVar from "./src/var.ts";

const [getLogon, setLogon] = createVar(false);

export { getLogon, setLogon };
export { default as APIError } from "./src/error.ts";
export { login } from "./src/user.ts";
export { default as User } from "./src/classes/user.working.ts";
export { getCSRFToken } from "./src/utils.ts";

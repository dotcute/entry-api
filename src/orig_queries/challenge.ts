import * as Common from "./dto/common.ts";

export const SELECT_CURRENT_CHALLENGE = `
    query  {
        currentChallenge {
            ${Common.CHALLENGE}
        }
    }
`;

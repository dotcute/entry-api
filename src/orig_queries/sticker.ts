import * as Common from './dto/common.ts';

export const SELECT_STICKER = `
    query($title: String){
        sticker(title: $title){
            ${Common.STICKER}
        }
    }
`;

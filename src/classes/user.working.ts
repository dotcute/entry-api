/// <reference types="../types/common.d.ts" />
/// <reference types="../types/user.d.ts" />

import { Lw } from '../lazywrap.ts';
import { APIError, getLogon } from '../../mod.ts';
import { gql, loadQuery } from '../utils.ts';

interface UserConstructor {
  id: string;
  username?: string;
  description?: string;
  profileImage?: string;
  coverImage?: string | undefined;
  role?: CommonTypes.Role;
}

export default class User {
  #__rawData?: UserTypes.UserStatus;

  public id: string;

  @Lw
  declare username?: Lw<string>;
  @Lw
  declare description?: Lw<string>;
  @Lw
  declare profileImage?: Lw<string>;
  @Lw
  declare coverImage?: Lw<string>;
  @Lw
  declare role?: Lw<CommonTypes.Role>;

  constructor(info: UserConstructor) {
    this.id = info.id;

    // @ts-ignore: to exclude method __getRawData from class User's type
    this.__getRawData = async function () {
      const res = await gql<UserTypes.UserStatus>(
        await loadQuery('user/getUserInfo'),
        { id: this.id },
      );
      if (!res.success) return;

      Object.assign(this, {
        username: res.data.username,
        description: res.data.description,
        profileImage: res.data.profileImage?.filename
          ? `https://playentry.org/uploads/${
            res.data.profileImage.filename.slice(
              0,
              2,
            )
          }/${
            res.data.profileImage.filename.slice(2, 4)
          }/${res.data.profileImage.filename}.${res.data.profileImage.imageType}`
          : `https://playentry.org/img/DefaultCardUserThmb.svg`,
        coverImage: res.data.coverImage?.filename
          ? `https://playentry.org/uploads/${
            res.data.coverImage.filename.slice(
              0,
              2,
            )
          }/${
            res.data.coverImage.filename.slice(2, 4)
          }/${res.data.coverImage.filename}.${res.data.coverImage.imageType}`
          : undefined,
        role: res.data.role,
      });
    };
  }

  public static async getUserIdByUsername(username: string) {
    if (!getLogon()) throw new Error(APIError.LOGIN_REQUIRED);
    const res = await gql<{ id: string }>(
      await loadQuery('user/getUserIdByUsername'),
      { username },
    );
    if (!res.success) throw new Error(APIError.OPERATION_UNSUCCESSFUL);

    return res.data.id;
  }

  public static async getUserIdByNickname(nickname: string) {
    if (!getLogon()) throw new Error(APIError.LOGIN_REQUIRED);
    const res = await gql<{ id: string }>(
      await loadQuery('user/getUserIdByNickname'),
      { nickname },
    );
    if (!res.success) throw new Error(APIError.OPERATION_UNSUCCESSFUL);

    return res.data.id;
  }

  public static async fromUsername(username: string) {
    if (!getLogon()) throw new Error(APIError.LOGIN_REQUIRED);

    try {
      const id = await User.getUserIdByUsername(username);

      return new User({ id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public static async fromNickname(nickname: string) {
    if (!getLogon()) throw new Error(APIError.LOGIN_REQUIRED);

    try {
      const id = await User.getUserIdByNickname(nickname);

      return new User({ id });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

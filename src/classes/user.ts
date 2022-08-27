/// <reference types="../types/common.d.ts" />
/// <reference types="../types/user.d.ts" />

import { Lw } from '../lazywrap.ts';
import { APIError, getLogon } from '../../mod.ts';
import { gql, loadQuery } from '../utils.ts';

interface UserConstructor {
  id: string;
  username?: string;
  nickname?: string;
  description?: string;
  profileImage?: string;
  coverImage?: string | null;
  role?: CommonTypes.Role;
  shortUrl?: string;
  project?: { public: number; private: number };
  study?: { public: number; private: number };
  community?: { qna: number; tips: number; free: number };
  followings?: number;
  followers?: number;
  bookmark?: { project: number; study: number };
}

export default class User {
  public id: string;

  @Lw
  declare username?: Lw<string>;
  @Lw
  declare nickname?: Lw<string>;
  @Lw
  declare description?: Lw<string>;
  @Lw
  declare profileImage?: Lw<string>;
  @Lw
  declare coverImage?: Lw<string>;
  @Lw
  declare role?: Lw<CommonTypes.Role>;
  @Lw
  declare shortUrl?: Lw<string>;
  @Lw
  declare project?: Lw<{ public: number; private: number }>;
  @Lw
  declare study?: Lw<{ public: number; private: number }>;
  @Lw
  declare community?: Lw<{ qna: number; tips: number; free: number }>;
  @Lw
  declare followings?: Lw<number>;
  @Lw
  declare followers?: Lw<number>;
  @Lw
  declare bookmark?: Lw<{ project: number; study: number }>;

  constructor(info: UserConstructor) {
    this.id = info.id;

    // @ts-ignore: to exclude method __DO_NOT_CALL_THIS_METHOD_MANUALLY from class User's type
    this.__DO_NOT_CALL_THIS_METHOD_MANUALLY__ = async function () {
      const res = await gql<UserTypes.UserStatus>(
        await loadQuery('user/getUserInfo'),
        { id: this.id },
      );
      if (!res.success) return;

      Object.assign<typeof this, Required<Omit<UserConstructor, 'id'>>>(this, {
        username: res.data.username,
        nickname: res.data.nickname,
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
          : null,
        role: res.data.role,
        shortUrl: res.data.shortUrl,
        project: { public: res.data.status.project, private: res.data.status.projectAll - res.data.status.project },
        study: { public: res.data.status.study, private: res.data.status.studyAll - res.data.status.study },
        community: res.data.status.community,
        followings: res.data.status.following,
        followers: res.data.status.follower,
        bookmark: res.data.status.bookmark,
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

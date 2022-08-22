/// <reference types="../types/common.d.ts" />
/// <reference types="../types/user.d.ts" />

import { gql, loadQuery } from "../utils.ts";

interface UserConstructor {
  id: string;
  username?: string;
  description?: string;
  profileImage?: string;
  coverImage?: string;
  role?: CommonTypes.Role;
}

export default class User {
  #__rawData?: any;

  public id: string;

  #__username?: string;
  #__description?: string;
  #__profileImage?: string;
  #__coverImage?: string;
  #__role?: CommonTypes.Role;

  constructor(info: UserConstructor) {
    this.id = info.id;

    this.#__username = info.username;
    this.#__description = info.description;
    this.#__profileImage = info.profileImage;
    this.#__coverImage = info.coverImage;
    this.#__role = info.role;
  }

  public get username() {
    return (async () => {
      if (!this.#__rawData) await this.#getRawData();

      return this.#__username;
    })();
  }

  public get description() {
    return (async () => {
      if (!this.#__rawData) await this.#getRawData();

      return this.#__description;
    })();
  }

  public get profileImage() {
    return (async () => {
      if (!this.#__rawData) await this.#getRawData();

      return this.#__profileImage;
    })();
  }

  public get coverImage() {
    return (async () => {
      if (!this.#__rawData) await this.#getRawData();

      return this.#__coverImage;
    })();
  }

  public get role() {
    return (async () => {
      if (!this.#__rawData) await this.#getRawData();

      return this.#__role;
    })();
  }

  async #getRawData() {
    const res = await gql<UserTypes.UserInfo>(
      await loadQuery("./src/queries/user/getUserInfo.gql"),
      { id: this.id }
    );
    if (!res.success) return;

    this.#__username = res.data.username;
    this.#__description = res.data.description;
    this.#__profileImage = res.data.profileImage.id
      ? `https://playentry.org/uploads/${res.data.profileImage.id.slice(
          0,
          2
        )}/${res.data.profileImage.id.slice(2, 4)}/${res.data.profileImage.id}`
      : `https://playentry.org/img/DefaultCardUserThmb.svg`;
    this.#__coverImage = res.data.coverImage.id
      ? `https://playentry.org/uploads/${res.data.coverImage.id.slice(
          0,
          2
        )}/${res.data.coverImage.id.slice(2, 4)}/${res.data.coverImage.id}`
      : `https://playentry.org/img/EmptyImage.svg`;
    this.#__role = res.data.role;
  }

  public async toJSON(): Promise<UserConstructor> {
    return (async () => {
      if (!this.#__rawData) await this.#getRawData();

      return {
        id: this.id,
        username: this.#__username,
        description: this.#__description,
        profileImage: this.#__profileImage,
        coverImage: this.#__coverImage,
        role: this.#__role,
      };
    })();
  }
}

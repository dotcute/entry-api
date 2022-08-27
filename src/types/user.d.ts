declare namespace UserTypes {
  export interface UserStatus {
    id: string;
    nickname: string;
    username: string;
    description: string;
    shortUrl: string;
    profileImage: CommonTypes.Image | null;
    coverImage: CommonTypes.Image | null;
    role: CommonTypes.Role;
    studentTerm: boolean;
    status: {
      project: number;
      projectAll: number;
      study: number;
      studyAll: number;
      community: {
        qna: number;
        tips: number;
        free: number;
      };
      following: number;
      follower: number;
      bookmark: {
        project: number;
        study: number;
      };
      userStatus: "USE";
    };
  }

  export interface User {
    id: string;
    nickname: string;
    username: string;
    role: CommonTypes.Role;
    isEmailAuth: boolean;
    isSnsAuth: boolean;
    isPhoneAuth: boolean;
    studentTerm: boolean;
    status: { userStatus: "USE" };
    profileImage: CommonTypes.Image | null;
    banned: any | null;
  }
}

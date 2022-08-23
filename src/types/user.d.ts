declare namespace UserTypes {
  export interface UserInfo {
    id: string;
    nickname: string;
    username: string;
    description: string;
    shortUrl: string;
    profileImage: CommonTypes.Image;
    coverImage: CommonTypes.Image;
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
}

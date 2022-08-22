declare namespace CommonTypes {
  export interface Label {
    ko: string | null;
    en: string | null;
    ja: string | null;
    vn: string | null;
  }

  export interface Dimension {
    width: number | null;
    height: number | null;
  }

  export interface Image {
    id: string;
    name: string;
    label: Label;
    filename: string;
    imageType: string;
    dimension: Dimension;
    trimmed: {
      filename: string | null;
      width: number | null;
      height: number | null;
    };
  }

  export type Role = 'student' | 'teacher' | 'admin';
}

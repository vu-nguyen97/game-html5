export interface Game {
  id: string;
  collection: string;
  url: string;
  game: GameDetail;
  code: string;
  like: number;
  disLike: number;
}

export interface GameDetail {
  Title: string;
  Url: string;
  Description: string;
  Instructions: string;
  Company: string;
  Asset: string[];
  Category: string[];
  Type: string;
  SubType: string;
  Tag: string[];
  Mobile: boolean;
  Height: number;
  Width: number;
}

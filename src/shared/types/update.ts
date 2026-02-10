type Platforms = Record<
  string,
  {
    signature: string;
    url: string;
  }
>;

export interface LatestData {
  version: string;
  major: boolean;
  platforms: Platforms;
}

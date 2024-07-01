export interface Metadata {
  [key: string]: unknown;
}

export interface EpubManifestItem {
  '@_id': string;
  '@_href': string;
  '@_media-type': string;
}

export interface ManifestItem {
  id: string;
  href: string;
  mediaType: string;
}

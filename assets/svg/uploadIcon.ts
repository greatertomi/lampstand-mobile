type UploadIconType = {
  color: string;
  size: number;
};
/* eslint-disable max-len */
export const uploadIcon = ({
  color,
  size
}: UploadIconType) => `<svg width="${size}" height="${size}" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5 8.75033V1.16699M6.5 1.16699L8.25 3.20866M6.5 1.16699L4.75 3.20866" stroke="${color}" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.16602 12.8333H8.83268C10.4826 12.8333 11.3075 12.8333 11.8201 12.3207C12.3327 11.8082 12.3327 10.9832 12.3327 9.33329V8.74996C12.3327 7.10006 12.3327 6.27511 11.8201 5.76253C11.3719 5.3143 10.6848 5.25804 9.41602 5.25098M3.58268 5.25098C2.31391 5.25804 1.6268 5.3143 1.17858 5.76252C0.666016 6.27511 0.666016 7.10006 0.666016 8.74996V9.33329C0.666016 10.9832 0.666016 11.8082 1.17858 12.3207C1.35346 12.4956 1.56471 12.6108 1.83268 12.6868"
stroke="${color}"
stroke-linecap="round"/>
</svg>`;

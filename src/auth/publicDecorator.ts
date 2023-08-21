import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const REFRESH_KEY = 'refreshing';
export const Refresh = () => SetMetadata(REFRESH_KEY, true);

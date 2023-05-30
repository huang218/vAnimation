import { createPinia } from "pinia";
export * from "./modules/route";
export * from './modules/settings';
export * from './modules/tagView';

export const pinia = createPinia();
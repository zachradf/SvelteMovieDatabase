import {writable} from 'svelte/store';
import type { MovieCards } from '../types/types';

export const movieArray = writable([])
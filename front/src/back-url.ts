import { environment } from './environments/environment';

export const url = environment.production ? '/api' : 'http://localhost:3000/api'

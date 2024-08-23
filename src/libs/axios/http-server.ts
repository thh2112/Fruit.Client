import axios from 'axios';
import https from 'https';
import { ENV } from '@/environment';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const httpServer = axios.create({
  baseURL: ENV.API_URL,
  httpsAgent,
});

export { httpServer };

import FormData from 'form-data';
import { OutgoingHttpHeaders } from 'http2';
import { request, RequestOptions } from 'https';

export interface ReqOptions extends RequestOptions {
  host: string;
  path: string;
  method: string;
  data?: FormData;
  headers?: OutgoingHttpHeaders;
}

const defaultOptions: ReqOptions = {
  host: 'tradernet.com',
  path: '/api',
  method: 'GET',
};

const makeRequest = async (options = defaultOptions): Promise<any> =>
  new Promise((resolve, reject) => {
    const req = request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('close', () => {
        try {
          const response = JSON.parse(data);

          if (response.error || response.errMsg) {
            return reject(response);
          }

          resolve(response);
        } catch (error) {
          reject(data);
        }
      });
    });

    if (options.data && options.data instanceof FormData) {
      options.data.pipe(req);
    }

    req.end();

    req.on('error', reject);
  });

export default makeRequest;

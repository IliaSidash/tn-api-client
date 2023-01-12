import FormData from 'form-data';
import request from './request';

interface ClientOptions {
  host: string;
  path: string;
  sid?: string;
}

const defaultOptions: ClientOptions = {
  host: 'tradernet.com',
  path: '/api',
};

const create = (options: ClientOptions = defaultOptions) => {
  let SID: string = options.sid ?? '';

  return {
    setSID(sid: string): void {
      SID = sid;
    },
    get(cmd: string, params: object = {}): Promise<any> {
      const searchParams = new URLSearchParams({
        q: JSON.stringify({ cmd, SID, params }),
      });

      const path = [options.path, searchParams.toString()].join('?');

      return request({ ...options, path, method: 'GET' });
    },
    post(cmd: string, params: object = {}): Promise<any> {
      const fd = new FormData();

      fd.append('q', JSON.stringify({ cmd, SID, params }));

      return request({
        ...options,
        method: 'POST',
        headers: { ...fd.getHeaders() },
        data: fd,
      });
    },
  };
};

export default create;

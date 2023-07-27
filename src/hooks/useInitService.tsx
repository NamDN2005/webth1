import axios from '@/utils/axios';
import { ip3 } from '@/utils/ip';

const useInitService = (url: string, ip?: string) => {
  const finalIp = ip ?? ip3;

  const getService = (
    payload: { page: number; limit: number; condition?: any },
    path?: string,
    isAbsolutePath?: boolean,
  ) => {
    const finalPath = isAbsolutePath ? `${finalIp}/${path}` : `${finalIp}/${url}/${path ?? ''}`;
    return axios.get(finalPath, { params: payload });
  };

  const postService = (payload: any) => {
    return axios.post(`${finalIp}/${url}`, payload);
  };

  const putService = (id: string | number, payload: any) => {
    return axios.put(`${finalIp}/${url}/${id}`, payload);
  };

  const deleteService = (id: string | number) => {
    return axios.delete(`${finalIp}/${url}/${id}`);
  };

  const getAllService = (payload?: { condition?: any; sort?: any }, path?: string) => {
    return axios.get(`${finalIp}/${url}/${path || 'many'}`, { params: payload });
  };

  const getByIdService = (id: string | number) => {
    return axios.get(`${finalIp}/${url}/${id}`);
  };

  const getImportHeaders = () => {
    return axios.get(`${finalIp}/${url}/import/definition`, { data: { silent: true } });
  };

  const getImportTemplate = () => {
    return axios.get(`${finalIp}/${url}/import/template/xlsx`, {
      responseType: 'arraybuffer',
    });
  };

  const postValidateImport = (payload: any) => {
    return axios.post(`${finalIp}/${url}/import/validate`, payload);
  };

  const postExecuteImport = (payload: any) => {
    return axios.post(`${finalIp}/${url}/import/insert`, payload);
  };

  return {
    getService,
    getByIdService,
    postService,
    putService,
    deleteService,
    getAllService,
    getImportHeaders,
    getImportTemplate,
    postValidateImport,
    postExecuteImport,
  };
};

export default useInitService;

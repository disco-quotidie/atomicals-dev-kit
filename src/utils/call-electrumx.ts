import axios from 'axios';

export const callElectrumx = async (method: string, params: any, usePost = true) => {
  
  const endpoints = [
    "https://ep.wizz.cash/proxy",
    "https://ep.atomicalmarket.com/proxy"
  ]

  for (const baseUrl of endpoints) {
    try {
      const url = `${baseUrl}/${method}`;
      const options = {
          method: usePost ? 'post' : 'get',
          url: url,
          ...(usePost ? { data: { params } } : { params: params })
      };

      const response = await axios(options);
      return response.data.response;
    } catch (error) {
        console.log(`Error using endpoint ${baseUrl}:`, error);
    }
  }

  throw new Error('All endpoints failed');
}
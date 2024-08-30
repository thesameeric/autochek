import axios from 'axios';

export const vinLookup = async (vin: string) => {
  const options = {
    method: 'GET',
    url: 'https://vin-lookup2.p.rapidapi.com/vehicle-lookup',
    params: {
      vin,
    },
    headers: {
      'x-rapidapi-key': 'ddd87e2697mshb37a4cb5bb99830p1f39bdjsn7937a2a199f2',
      'x-rapidapi-host': 'vin-lookup2.p.rapidapi.com',
    },
  };
  const response = await axios.request(options);
  return response?.data;
};

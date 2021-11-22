import React, {useState, useCallback} from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // fetch data from server 
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url,{
      method: requestConfig.method ? requestConfig.method : 'GET',
      headers: requestConfig.headers ? requestConfig.headers: {},
      body: requestConfig.body ? JSON.stringify(requestConfig.body): null
    });
    const data = await response.json();
    console.log('Request Data: ', JSON.stringify(data))
    applyData(data);
    } catch (err) {
      setError('Error getting data');
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    sendRequest
  }
}
export default useHttp;
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from '../api/axios';

// export const useAuth = ({ middleware } = {}) => {
export const useAuth = ({ middleware }: any = {}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data: user,
    error,
    mutate,
  } = useSWR('api/user', () =>
    axios
      .get('api/user')
      .then((response) => response)
      .catch((error) => {
        if (error.response.status !== 401 || error.response.status != 500)
          throw error;
      }),
  );

  //   const csrf =
  const register = async (setErrors: any, ...props: any) => {
    //{}
    setErrors([]);
    axios.post('/api/register', props).then(
      async () =>
        (await mutate()) &&
        router.push('/').catch((error) => {
          if (error.response.status != 422 || error.response.status != 500) {
            throw error;
          }
          setErrors(Object.values(error.response.message));
        }),
    );
  };

  const login = async ({ setErrors, ...props }: any) => {
    //{}
    setErrors([]);
    axios.post('/api/login', props).then(
      async () =>
        (await mutate()) &&
        router.push('/').catch((error) => {
          if (
            error.response.status != 401 ||
            error.response.status != 422 ||
            error.response.status != 500
          ) {
            throw error;
          }
          setErrors(Object.values(error.response.message));
        }),
    );
  };

  const logout = async () => {
    await axios.post('api/user/logout');
    // mutate(null);
    router.push('/');
  };

  useEffect(() => {
    if (user || error) setIsLoading(false);
    // if(middleware=="guest"&&error) router.push("/");
    if (middleware == 'auth' && error) router.push('/');
  }, []);

  return {
    user,
    isLoading,
    register,
    login,
    logout,
  };
};

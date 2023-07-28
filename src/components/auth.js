
export const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };
  
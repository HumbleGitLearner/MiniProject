interface Config {
  [key: string]: string;
}

export const config: Config = {
  // apiUrl: 'http://localhost:8080/api',
  // adminUrl: 'http://localhost:8080/api/admin',
  // //  authUrl: 'http://localhost:8080/api/auth',
  // usersUrl: 'http://localhost:8080/api/users',
  // expensesUrl: 'http://localhost:8080/api/expenses',

  apiUrl: '/api',
  adminUrl: '/api/admin',
  //  authUrl: 'http://localhost:8080/api/auth',
  usersUrl: '/api/users',
  expensesUrl: '/api/expenses',
};

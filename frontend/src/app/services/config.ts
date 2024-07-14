interface Config {
  [key: string]: string;
}

export const config: Config = {
  // apiUrl: 'http://localhost:8080/api',
  // usersUrl: 'http://localhost:8080/api/users',
  // expensesUrl: 'http://localhost:8080/api/expenses',
  // reportsUrl: 'http://localhost:8080/api/reports',
  apiUrl: '/api',
  usersUrl: '/api/users',
  expensesUrl: '/api/expenses',
  reportsUrl: '/api/reports',
};

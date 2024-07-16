interface Config {
  [key: string]: string;
}

export const config: Config = {
  // usersUrl: 'http://localhost:8080/api/users',
  // expensesUrl: 'http://localhost:8080/api/expenses',
  // reportsUrl: 'http://localhost:8080/api/reports',
  usersUrl: '/api/users',
  expensesUrl: '/api/expenses',
  reportsUrl: '/api/reports',
};

const server = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:3000'
  : 'https://ilyakirsanov-react-chat-app.herokuapp.com';

export default server;

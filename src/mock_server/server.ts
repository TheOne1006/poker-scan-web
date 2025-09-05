import { createServer } from 'miragejs';


// 创建一个mock server
createServer({
  routes() {
    this.timing = 1000;

    this.get('/api/users', () => [
        { id: 1, name: '张三' }
    ]);
  },
});


// fetch("/api/users").then((response) => response.json()).then(console.log)
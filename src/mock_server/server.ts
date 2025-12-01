import { createServer } from 'miragejs';


// 创建一个mock server
createServer({
  routes() {
    this.timing = 1000;

    this.get('/api/users', () => [
        { uid: "111", name: '张三' }
    ]);



    // post api/feedback
    this.post('/api/feedback', (_, request) => {

      const images = [];
      let description = '';
      let type = '';

      if ((request.requestBody as unknown as FormData) instanceof FormData) {
        // 获取所有表单字段（包括文件）
        const formDataEntries = (request.requestBody as unknown as FormData).entries();
        for (const [key, value] of formDataEntries) {
          // 区分普通字段和文件字段
          if (value instanceof File) {
            images.push(value.name);
            // console.log('上传的文件信息:');
            // console.log('字段名:', key);
            // console.log('文件名:', value.name);
            // console.log('文件类型:', value.type);
            // console.log('文件大小:', value.size, '字节');
          } else {
            console.log('普通表单字段:', key, '->', value);
            if (key === 'description') {
              description = value;
            }
            if (key === 'type') {
              type = value;
            }
          }
        }
      } else {
        // 如果不是FormData格式，直接打印请求体
        console.log('请求体内容:', request.requestBody);
      }


      const randomId = Math.floor(Math.random() * 1000000000);
      const randomId2 = Math.floor(Math.random() * 1000000000);


      return [
        {
          "text": "应用在某些情况下会崩溃",
          "type": "feedback",
          "sender": "user",
          "status": "completed",
          "relation": {
            "description": description,
            "type": type,
            "images": [
              "feedback-80ad072b-d30a-4459-992b-99c9bc42bdc9-r_m.png"
            ],
            "userid": "68b942ef21dce5113920f4df",
            "createdAt": "2025-09-07T03:53:32.589Z",
            "updatedAt": "2025-09-07T03:53:32.589Z",
            "id": 1
          },
          "supportId": "68bd01bc90ed2201c4a762e9",
          "userId": "68b942ef21dce5113920f4df",
          "id": randomId,
          "createdAt": "2025-09-07T02:39:41.823Z",
          "updatedAt": "2025-09-07T02:39:41.823Z"
        },
        {
          "text": "感谢您的反馈，我们会尽快处理",
          "type": "text",
          "sender": "auto_reply",
          "status": "completed",
          "attachments": [],
          "supportId": "",
          "userId": "68b942ef21dce5113920f4df",
          "id": randomId2,
          "createdAt": "2025-09-07T02:39:41.835Z",
          "updatedAt": "2025-09-07T02:39:41.835Z"
        }
      ]
    })

    this.get('/api/chats/current', () => {
      return {
        "logs": [
          {
            "updatedAt": "2025-09-07T03:53:32.690Z",
            "id": Math.floor(Math.random() * 1000000000),
            "createdAt": "2025-09-07T03:53:32.690Z",
            "type": "feedback",
            "status": "completed",
            "sender": "user",
            "supportId": "68bd01bc90ed2201c4a762e9",
            "userId": "68b942ef21dce5113920f4df",
            "relation": {
              "description": "应用在某些情况下会崩溃",
              "type": "bug",
              "images": [
                "feedback-80ad072b-d30a-4459-992b-99c9bc42bdc9-r_m.png"
              ],
              "userid": "68b942ef21dce5113920f4df",
              "createdAt": "2025-09-07T03:53:32.589Z",
              "updatedAt": "2025-09-07T03:53:32.589Z",
              "id": Math.floor(Math.random() * 1000000000)
            },
            "text": "应用在某些情况下会崩溃"
          },
          {
            "updatedAt": "2025-09-07T03:53:32.701Z",
            "id": Math.floor(Math.random() * 1000000000),
            "createdAt": "2025-09-07T03:53:32.701Z",
            "type": "text",
            "status": "completed",
            "sender": "auto_reply",
            "supportId": "",
            "userId": "68b942ef21dce5113920f4df",
            "relation": {},
            "text": "感谢您的反馈，我们会尽快处理"
          }
        ],
        "logStartAt": "2025-09-07T03:53:32.446Z",
        "userId": "68b942ef21dce5113920f4df",
        "id": Math.floor(Math.random() * 1000000000),
        "createdAt": "2025-09-07T03:53:32.738Z",
        "updatedAt": "2025-09-07T03:53:32.738Z"
      }
    })

    this.post('/api/chats', () => {
      return {
        "updatedAt": "2025-09-07T03:53:32.701Z",
        "id": Math.floor(Math.random() * 1000000000),
        "createdAt": "2025-09-07T03:53:32.701Z",
        "type": "text",
        "status": "pending",
        "sender": "auto_reply",
        "supportId": "",
        "userId": "68b942ef21dce5113920f4df",
        "relation": {},
        "text": "等待回复"
      }
    })

    this.get('/api/chats/logs/:id', (_, request) => {
      // 随机生成一段文字
      const text = Math.random().toString(36).substring(2, 15);
      return {
        "type": "text",
        "status": "completed",
        "sender": "auto_reply",
        "supportId": "",
        "userId": "68b942ef21dce5113920f4df",
        "relation": {},
        "text": text,
        "id": parseInt(request.params.id),
        "createdAt": "2025-09-07T03:53:32.701Z",
        "updatedAt": "2025-09-07T03:53:32.701Z"
      }
    })

    this.post('/api/chats/clearHistory', () => {
      return {
        "message": "清空聊天记录成功"
      }
    })
  },
});


// fetch("/api/users").then((response) => response.json()).then(console.log)

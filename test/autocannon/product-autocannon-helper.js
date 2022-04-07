const autocannon = require('autocannon')
const url = 'http://localhost:8080'

const productEntryOptions = {
  url,
  connections: 10, //default
  pipelining: 1, // default
  duration: 10, // default
  requests: [
    {
      method: 'POST',
      path: '/mock/product',
      headers: {
        'Content-Type': 'application/json',
      },
      // body:JSON.stringify(getFakeItem()),
      // onResponse: (status, body, context) => {
      //     console.log(status, 'products', body);
      // }
    },
    // {
    //     method: 'POST',
    //     path: '/customers',
    //     // onResponse: (status, body, context) => {
    //     //     console.log(status, 'customers', body);
    //     // }
    // 3
  ]
}

const finishedBench = (err, result) => {
  console.log(result)
}

// autocannon(options, finishedBench);
let count = 0;
setInterval(() => {
  console.log('starting benchmark', count);
  autocannon(productEntryOptions, finishedBench);
  console.log('finished benchmark', count++);
  if (count === 20) {
    process.exit(0)
  }
}, 12000);
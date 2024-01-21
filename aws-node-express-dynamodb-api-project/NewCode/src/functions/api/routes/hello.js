import { withMultiValidation } from '../../utils/validation'

const hello = async (req, res) => {
  res.status(200).send({
    code: 200,
    message: 'hello',
  })
}

// The following code snippet is an example for caller, need to use aws4 to genrate headers.

/*
import axios from 'axios';
import aws4 from 'aws4';
import URL from 'url';

const CallerToHello = async (req, res) => {
  const url = URL.parse('https://api.qingyouapp.me/boilerplate/hello');

  const opts = {
    host: url.hostname,
    path: url.pathname,
    service: 'execute-api', 
    region: 'us-east-1'
  };
  
  aws4.sign(opts);

  axios.get('https://api.qingyouapp.me/boilerplate/hello', {
    headers: opts.headers,
  })
  .then(response => {
    console.log(response.data)
    res.status(200).send({
      code: 200,
      message: 'hello',
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).send({
      code: 500,
      message: 'hello',
    });
  });
}; 
 */

export default withMultiValidation(hello, {})
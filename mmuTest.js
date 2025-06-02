import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 500,
  duration: '20s',
};

export default function () {
    http.get('http://localhost:5000/api/getmedicines');
    http.post('http://localhost:5000/api/login', { username: 'prueba', password: '1234' });
    http.post('http://localhost:5000/api/getBenefitInfo', { username: 'prueba' });
    http.get('http://localhost:5000/api/get-all-invoice');
    sleep(1);
}

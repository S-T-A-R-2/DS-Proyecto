import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 20, 						// number of simultaneous users
  duration: '20s', 					// test duration
};

export default function () {
  const login_url = 'http://localhost:5000/api/login';
  const filter_invoice_url = 'http://localhost:5000/api/filter-invoices';
  const set_invoice_state_url = 'http://localhost:5000/api/set-invoice-state';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
/*************************login test****************************/
  const login_payload = JSON.stringify({
    username: 'oscarOperativo',
    password: 'oscar',
  });
  const login_res = http.post(login_url, login_payload, params);
  check(login_res, {
    'status is 201': (r) => r.status === 201,
  });
/*********************filter invoices test**********************/
  const filter_invoice_payload = JSON.stringify({
    stateFilter: null,
    dateRangeFilter: null,
    searchInvoiceNumber: '',
    userFilter: 'oscarCliente2',

  });
  const filter_invoice_res = http.get(filter_invoice_url, filter_invoice_payload, params);
  check(filter_invoice_res, {
    'status is 201': (r) => r.status === 201,
  });
/*********************set invoice state test********************/
  const set_invoice_state_payload = JSON.stringify({
    number: 100,
    state: 'Aprobada',
    username: 'oscarCliente2',
    medicineId: 'Omeprazol Tabletas 20mg',
    quantity: 1,
    _id: 232,
  });
  const set_invoice_state_res = http.post(set_invoice_state_url, set_invoice_state_payload, params);
  check(set_invoice_state_res, {
    'status is 201': (r) => r.status === 201
  });
  sleep(1);
}

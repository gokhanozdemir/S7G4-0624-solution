import { beforeEach, expect, test } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import App from '../App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { server } from '../mocks/server';
import 'mutationobserver-shim';
import fs from 'fs';
import path from 'path';

const loginPage = fs
  .readFileSync(path.resolve(__dirname, '../components/Login.jsx'), 'utf8')
  .replaceAll(/(?:\r\n|\r|\n| )/g, '');

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  document.body.innerHTML = '';
});
beforeEach(() => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

test("Login componentinde reactstrap'ten FormFeedback kullanılmış", () => {
  expect(loginPage.includes('<FormFeedback')).toBe(true);
});

test("Login componentinde errors ve isValid state'leri tanımlanmış", () => {
  expect(loginPage.includes('[errors,setErrors]')).toBe(true);
  expect(loginPage.includes('[isValid,setIsValid]')).toBe(true);
});

test("Login componentinde isValid başlangıç değeri false yapılmış", () => {
  expect(loginPage.includes('const[isValid,setIsValid]=useState(false)')).toBe(
    true
  );
});

test("Login componentinde useEffect kullanılmış tanımlanmış", () => {
  expect(loginPage.includes('useEffect(')).toBe(true);
});

test("handleSubmit'de isValid kontrolü yapılmış", () => {
  const part = loginPage.split('handleSubmit')[1];
  expect(part.includes('isValid')).toBe(true);
});

test('Sign In butonu disabled olarak başlıyor', async () => {
  const loginButton = screen.getByText('Sign In');
  expect(loginButton).toBeDisabled();
});

test('Form doğru bilgiler ile doldurulunca buton enabled oluyor', async () => {
  const user = userEvent.setup();

  const login = screen.getByText('Login');
  await user.click(login);

  const email = screen.getByPlaceholderText(/Enter your email/i);
  const password = screen.getByPlaceholderText(/Enter your password/i);
  const terms = screen.getByLabelText(/I agree to/i);
  const loginButton = screen.getByText('Sign In');
  expect(loginButton).toBeDisabled();
  await user.type(email, 'erdem@wit.com.tr');
  await user.type(password, '9fxIH0GXesEwH_I');
  await user.click(terms);
  expect(loginButton).not.toBeDisabled();
});

test('Email yanlış doldurulunca hata mesajı görünüyor', async () => {
  const user = userEvent.setup();

  const login = screen.getByText('Login');
  await user.click(login);

  const email = screen.getByPlaceholderText(/Enter your email/i);

  await user.type(email, 'erdem@wit');
  await screen.findByText('Please enter a valid email address');
});

test('Email doğru doldurulunca hata mesajı ortadan kalkıyor', async () => {
  const user = userEvent.setup();

  const login = screen.getByText('Login');
  await user.click(login);

  const email = screen.getByPlaceholderText(/Enter your email/i);

  await user.type(email, 'erdem@wit');
  const error = await screen.findByText('Please enter a valid email address');
  await user.type(email, '.com.tr');
  expect(error).not.toBeInTheDocument();
});

test('Password yanlış doldurulunca hata mesajı görünüyor', async () => {
  const user = userEvent.setup();

  const login = screen.getByText('Login');
  await user.click(login);

  const password = screen.getByPlaceholderText(/Enter your password/i);

  await user.type(password, '123');
  await screen.findByText('Password must be at least 4 characters long');
});

test('Password doğru doldurulunca hata mesajı ortadan kalkıyor', async () => {
  const user = userEvent.setup();

  const login = screen.getByText('Login');
  await user.click(login);

  const password = screen.getByPlaceholderText(/Enter your password/i);

  await user.type(password, '123');
  const error = await screen.findByText(
    'Password must be at least 4 characters long'
  );
  await user.type(password, '1234');
  expect(error).not.toBeInTheDocument();
});

test('Form doğru bilgiler ile doldurulunca form submit oluyor', async () => {
  const user = userEvent.setup();

  const login = screen.getByText('Login');
  await user.click(login);

  const email = screen.getByPlaceholderText(/Enter your email/i);
  const password = screen.getByPlaceholderText(/Enter your password/i);
  const terms = screen.getByLabelText(/I agree to/i);
  const loginButton = screen.getByText('Sign In');
  expect(loginButton).toBeDisabled();
  await user.type(email, 'erdem.guntay@wit.com.tr');
  await user.type(password, '9fxIH0GXesEwH_I');
  await user.click(terms);
  expect(loginButton).not.toBeDisabled();
  await user.click(loginButton);
  await screen.findByText('/main');
});
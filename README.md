# Todo App Frontend

This application allows authenticated users to manage their to-do tasks within a friendly and easy-to-use Dashboard.

### Tech

- React
- Vite
- Typescript
- Zustand
- Tailwind

## Installation

First, clone the repository with:

```
git clone https://github.com/JeanVittory/todo-frontend.git
cd todo-frontend
npm install
```

## Environment Variables

Before running the project, you must configure the corresponding environment variables, which you'll find in the `.env.example` file. Ensure that `VITE_PUBLIC_JWT_KEY` is of type **RSA-PKCS8** with a length of **2048 bits**. You can generate it [here](https://acte.ltd/utils/openssl).

If generated correctly, your key should look like this:

```
"-----BEGIN PUBLIC KEY-----
    ...your API_KEY
-----END PUBLIC KEY-----"
```

For the `VITE_BACKEND_URL`, we recommend using port **3333** as this is the default port for the backend. If you choose to use a different port in the backend, make sure to specify it in this variable.

That's all now you can run `npm run dev`.

To authenticate, please use the following credentials:

- Email: admin@byyuto.com
- Password: password1234

## Test

Please use `npm run test` to execute the tests into the project.

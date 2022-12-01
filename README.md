This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

If you are on the MAIN branch then use the env value called "DATABASE_URL" otherwise use "DEV_DATABASE_URL" for the DEVELOP branch.

First, npm i or yarn install

Second,

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

# Running the database instance

pscale connect <db> <branch> --port 3306

pscale connect spudify dev --port 3306

# Useful planetscale commands

https://planetscale.com/docs/reference/shell.  
pscale shell <DATABASE_NAME> <BRANCH_NAME> <FLAG>

# Prisma Studio is a GUI for the database ORM

npx prisma studio --port 5555

# Useful prisma commands

## Formats the prisma schema file:

npx prisma format

## Generates the prisma client

npx prisma generate

## Migrate the database schema into Planetscale database

npx prisma db push

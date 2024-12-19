---
title: Next.js 启航
icon: rocket
date: 2024-12-16 14:11:36
category:
  - 前端
  - nextjs
tag:
  - nextjs
order: 10
---

## 参考：
- [React 基础教程](https://nextjs.org/learn/react-foundations)
- [React 快速入门](https://zh-hans.react.dev/learn)
- [Next.js 入门教程](https://nextjs.org/learn/dashboard-app)

## React 基础教程
- Next.js 是 React 的 Web 全栈框架，先学习 [React 基础教程](https://nextjs.org/learn/react-foundations)
- Chapter 4: [Getting Started with React](https://nextjs.org/learn/react-foundations/getting-started-with-react)
  - [index.html](https://nextjs.org/learn/react-foundations/getting-started-with-react#adding-babel-to-your-project)
    ```html{4-12} title="index.html"
    <html>
      <body>
        <div id="app"></div>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <!-- Babel Script -->
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script type="text/babel">
          const domNode = document.getElementById('app');
          const root = ReactDOM.createRoot(domNode);
          root.render(<h1>Develop. Preview. Ship.</h1>);
        </script>
      </body>
    </html>
    ```
    - 用浏览器打开 index.html，可以看到结果：Develop. Preview. Ship。
    ![index.html](nextjs-launch-1-index.png =50%x)
- Chapter 9: [安装 Next.js](https://nextjs.org/learn/react-foundations/installation)
  - 创建 package.json，内容为：`{}`
    ```bash
    [ ! -f package.json ] && echo "{}" > package.json
    ```
  - 安装依赖
    ```bash
    pnpm i react@latest react-dom@latest next@latest
    ```

## Next.js 入门教程
- [Next.js 入门教程](https://nextjs.org/learn/dashboard-app)
- [Node 环境搭建](/code/fe/react/react-launch.html#node-%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA)
  - 安装：fnm、Node.js、pnpm
  - IDE：vscode
- 创建入门示例 [nextjs-dashboard](https://github.com/vercel/next-learn/tree/main/dashboard/starter-example)
  ```bash
  pnpx create-next-app@latest nextjs-dashboard --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm
  ```
- 启动入门示例
  ```bash
  # 进入项目目录
  cd nextjs-dashboard
  # 安装依赖
  pnpm i
  # 启动 dev 脚本
  pnpm dev
  ```
  - 访问：[http://localhost:3000/](http://localhost:3000/)
  
    ![pnpm dev](nextjs-launch-2-pm-dev.png =50%x)
- 接下来可以按照 [Next.js 入门教程](https://nextjs.org/learn/dashboard-app/css-styling)开始学习

### Chapter 6 安装数据库
- [Chapter 6 安装数据库](https://nextjs.org/learn/dashboard-app/setting-up-your-database)
  1. 创建 GitHub 仓库，存储代码
  1. 创建 Vercel 账号，创建项目
  1. 配置数据库
  1. 初始化数据
- 创建 GitHub 仓库：[New repository](https://github.com/new)
  - 仓库名直接填：`nextjs-dashboard`
  - 可以选择`私有`或`公开`仓库
  - 其他项保持默认值即可

  ![new repository](nextjs-launch-3-github-new.png =50%x)

- 创建 Vercel 账号
  - 创建账号：[vercel.com/signup](https://vercel.com/signup) 
  - 选择免费计划即可：free "hobby" plan
  - 授权访问 Github 项目即可
- 创建 Vercel 项目：选择 github 项目 `nextjs-dashboard`
  - deploy 如果失败，可以重新进入[vercel.com](https://vercel.com/) 看是不是已经创建了项目

  ![new project](nextjs-launch-3-vercel-new-prj.png =50%x)

- 配置数据库
  - [创建数据库教程](https://nextjs.org/learn/dashboard-app/setting-up-your-database#create-a-postgres-database)
  - 连接数据库
  
    ![connect db](nextjs-launch-4-vercel-db2prj.png =50%x)
  - 重新部署
    
    ![redeploy](nextjs-launch-5-vercel-redeploy.png =50%x)

  - 部署成功

    ![ok](nextjs-launch-6-vercel-ok.png =50%x)

### Chapter 10 部分预渲染
- [Chapter 10 部分预渲染](https://nextjs.org/learn/dashboard-app/partial-prerendering)
  - [PPR](https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering#incremental-adoption-version-15)
  - [Try PPR on Vercel](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model#try-ppr-on-vercel-today)
- next.config.ts
  ```ts{2-4}  title="next.config.ts"
  const nextConfig: NextConfig = {
    experimental: {
      ppr: 'incremental',
    },
  }
  ```
- 在文件顶部添加路由配置：`export const experimental_ppr = true;`
  - 此路由及其子路由都会进行部分预渲染
  - 不要 PPR 的子路由，在文件顶部设置路由配置：`export const experimental_ppr = false;`
  ```tsx{4,5} title="page.tsx"
  import { Suspense } from 'react'
  import { StaticComponent, DynamicComponent, Fallback } from '@/app/ui'
  
  export const experimental_ppr = true
  
  export default function Page() {
    return (
      <>
        <StaticComponent />
        <Suspense fallback={<Fallback />}>
          <DynamicComponent />
        </Suspense>
      </>
    )
  }
  ```
- 启用 ppr 问题：
  ```
  CanaryOnlyError: The experimental feature "experimental.ppr" can only be enabled when using the latest canary version of Next.js.
  ```
  - 解决方法：`pnpm i next@canary`

### Chapter 13 错误处理
- [Chapter 13 错误处理](https://nextjs.org/learn/dashboard-app/error-handling)
- 删除异常
  - 之前的删除操作写在 button 的 onClick 中，当 deleteInvoice 发生异常时不是 form 操作，所以无法进入 error.tsx 页
    ```tsx{5} title="buttons.tsx"
    export function DeleteInvoice({ id }: { id: string }) {
      const delInvoiceWithId = deleteInvoice.bind(null, id);
      return (
        <>
          <button className="rounded-md border p-2 hover:bg-gray-100" onClick={delInvoiceWithId}>
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5" />
          </button>
        </>
      );
    }
    ```
  - 修改后：
    ```tsx{4-5,9} title="buttons.tsx"
    export function DeleteInvoice({ id }: { id: string }) {
      const delInvoiceWithId = deleteInvoice.bind(null, id);
      return (
        <form action={delInvoiceWithId}>
          <button className="rounded-md border p-2 hover:bg-gray-100">
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5" />
          </button>
        </form>
      );
    }
    ```

## 总结

### 知识点
- [page.tsx 可选参数](https://nextjs.org/docs/app/api-reference/file-conventions/page)：`params`、`searchParams`
  ```tsx title="page.tsx"
  export default function Page({
    params,
    searchParams,
  }: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
    const slug = (await params).slug
    const { page = '1', sort = 'asc', query = '' } = await searchParams
    return <h1>My Page</h1>
  }
  ```
- search 防抖工具：[use-debounce](https://www.npmjs.com/package/use-debounce)
- [Zod](https://zod.dev/?id=requirements): TypeScript 验证库
  - tsconfig.json
    ```json{5,} title="tsconfig.json"
    {
      // ...
      "compilerOptions": {
        // ...
        "strict": true
      }
    }
    ```
  - 安装：`pnpm add zod`
- 错误处理
  - [Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
  - [error.js](https://nextjs.org/docs/app/api-reference/file-conventions/error)
  - [notFound()](https://nextjs.org/docs/app/api-reference/functions/not-found)
  - [note-found.tsx](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
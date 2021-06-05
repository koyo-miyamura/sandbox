import Head from 'next/head'

export default function Home() {
  const LinkCard = (props) => (
    <a
      href={props.href}
      className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
    >
      <h3 className="text-2xl font-bold">{props.title}</h3>
      <p className="mt-4 text-xl">
        {props.text}
      </p>
    </a>
  )

  const linkCards = [
    {
      href: "https://nextjs.org/docs",
      title: (
        <>
        Documentation &rarr;
        </>
      ),
      text: (
        <>
        Find in-depth information about Next.js features and API.
        </>
      ),
    },
    {
      href: "https://github.com/vercel/next.js/tree/master/examples",
      title: (
        <>
        Examples &rarr;
        </>
      ),
      text: (
        <>
        Discover and deploy boilerplate example Next.js projects.
        </>
      )
    },
    {
      href: "https://nextjs.org/learn",
      title: (
        <>
        Learn &rarr;
        </>
      ),
      text: (
        <>
        Learn about Next.js in an interactive course with quizzes!
        </>
      )
    },
    {
      href: "https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
      title: (
        <>
        Deploy &rarr;
        </>
      ),
      text: (
        <>
        Instantly deploy your Next.js site to a public URL with Vercel.
        </>
      )
    }
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by editing{' '}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            pages/index.js
          </code>
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {
            linkCards.map((linkCard, i) => (
              <LinkCard href={LinkCard.href} title={linkCard.title} text={linkCard.text} key={String(i)} />
            ))
          }
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}

import Layout from 'components/Layout'
import type { NextPage } from 'next'

const Terms: NextPage = () => {
  return (
    <Layout navbar={{}}>
      <header className="col-span-full mb-12 mt-[66px] px-4 md:mt-40 lg:px-0">
        <h1 className="reservoir-h1 text-center dark:text-white">Terms</h1>
      </header>
      <main className='col-span-full mx-auto flex flex-col max-w-4xl w-full px-6 '>
        <p>Terms content</p>
      </main>
    </Layout>
  )
}

export default Terms
export async function getStaticProps(context: { locale: string }) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`@/messages/${context.locale}.json`)).default
    }
  };
}

export default function NotFound() {
  return (
    <div className="flex h-full min-h-screen flex-col items-center pb-20sm:px-10 home-background">
      <div className="hero h-[600px]">
        <div className="hero-content text-center">
          <div className="">
            <h1 className="text-5xl font-bold gradient-text">404</h1>
            <p className="my-6">Page not found</p>
          </div>
        </div>
      </div>
    </div>
  )
}
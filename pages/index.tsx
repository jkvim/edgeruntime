import React from 'react';
import HTMLPreview from '@/components/html';

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
export default function HTMLIndexPage() {
  return <HTMLPreview />
}
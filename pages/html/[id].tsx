import { GetServerSidePropsContext } from "next";
import HTMLPreview from "@/components/html";
import { HTMLContent } from "@/types/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getServerSideProps(context: GetServerSidePropsContext<{id: string}>) { // Fetch data from your KV store here
  const { id } = context.params ?? {};
  const data = await fetchDataFromKVStore(id);

  return {
    props: {
      data,
      messages: (await import(`@/messages/${context.locale}.json`)).default
    }, 
  };
}

export default function HTMLIdPage({data}: {data?:  HTMLContent}) {
  return <HTMLPreview data={data} />
}

async function fetchDataFromKVStore(id?: string) {
  if (!id) throw new Error("No ID provided");

  try {
    const res = await fetch(`${baseUrl}/api/html/${id}`); // Adjust the URL as necessary
    if (!res.ok) {
      throw new Error(`Failed to fetch html data: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import '../lib/fontawesome'
//import { Inter, Roboto_Slab } from "next/font/google";
import "@/styles/globals.css";
import { bodyFont, headingFont } from '@/fonts'

// Load Google Fonts
//const headingFont = Roboto_Slab({ subsets: ["latin"], weight: "700" });
//const bodyFont = Inter({ subsets: ["latin"], weight: "400" });

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
       <style jsx global>{`
        :root {
          --font-heading: ${headingFont.style.fontFamily};
          --font-body: ${bodyFont.style.fontFamily};
        }
      `}</style>
      <div className={`${bodyFont.className} font-body`}>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default MyApp;

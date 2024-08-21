import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  title: "Dev Community",
  description:
    "Dev Community est un forum d'échange et de partage des connaissances entre informaticiens, aussi bien débutants qu'experts dans le but d'améliorer les compétences des développeurs. ",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: process.env.NEXT_PUBLIC_URL,
    images: [
      {
        url: process.env.NEXT_PUBLIC_URL + "/images/og-image.jpg",
        width: 1256,
        height: 628,
        alt: "Dev Community",
        type: "image/jpeg",
      },
    ],
    siteName: "Dev Community",
  },
  twitter: {
    handle: "@DevelopersUp",
    site: "Dev Community",
    cardType: "summary_large_image",
  },
};

export default config;

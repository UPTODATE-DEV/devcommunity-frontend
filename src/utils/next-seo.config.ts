import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  title: "Updev Community",
  description:
    "Updev Community est un forum d'échange et de partage des connaissances entre informaticiens, aussi bien débutants qu'experts dans le but d'améliorer les compétences des développeurs. ",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: process.env.NEXT_PUBLIC_URL,
    images: [
      {
        url: process.env.NEXT_PUBLIC_URL + "/images/og-image.jpg",
        width: 1256,
        height: 628,
        alt: "Updev Community",
        type: "image/jpeg",
      },
    ],
    siteName: "Updev Community",
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};

export default config;

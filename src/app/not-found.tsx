"use client";

import Error from "next/error";

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.
type Props = { params: { locale: string } };

export default function NotFound({ params: { locale } }: Props) {
  return (
    <html lang={locale}>
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}

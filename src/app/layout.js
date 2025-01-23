import "../../src/app/page";
import "@/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </head>
      <body>
        <div className="main">
          <div className="gradient"></div>
          <main className="app">{children}</main>
        </div>
      </body>
    </html>
  );
}

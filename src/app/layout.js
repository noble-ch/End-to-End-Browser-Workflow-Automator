//app/lauout.js

import '../../src/app/page'; // Correct the import if necessary

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
          <main className="app">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

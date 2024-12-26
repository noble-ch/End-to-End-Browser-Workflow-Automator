//app/lauout.js

import '../../src/app/page'; 
import '@/styles/globals.css';



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

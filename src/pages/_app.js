import "../styles/globals.css";
import MainLayout from "../components/MainLayout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isLandingPage = router.pathname === "/";
  const isDashboard = router.pathname === "/dashboard";

  return (
    <>
      {isLandingPage || isDashboard ? (
        <Component {...pageProps} />
      ) : (
        <MainLayout>
          <script src="https://accounts.google.com/gsi/client" async defer></script>

          <Component {...pageProps} />
        </MainLayout>
      )}
    </>
  );
}

import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider as AlertProvider } from "react-alert";
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AlertProvider template={AlertTemplate} {...options}>
        <Component {...pageProps} />
      </AlertProvider>
    </SessionProvider>
  );
}

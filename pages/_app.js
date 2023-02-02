import "../styles/globals.css";
import { MapProvider } from "react-map-gl";

export default function App({ Component, pageProps }) {
  return (
    <MapProvider>
      <Component {...pageProps} />
    </MapProvider>
  );
}

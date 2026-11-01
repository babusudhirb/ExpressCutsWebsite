import Script from "next/script";
import { TrackEvents } from "./TrackEvents";

const GTM = process.env.NEXT_PUBLIC_GTM_ID;
const GA = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADS = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const CLARITY = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

/**
 * Every tracking tag, each one only when its ID is set, so a build with no IDs ships
 * no tracking code at all. GTM wins over the direct tags: GA4 and Ads then live in
 * the container, and loading both would count each page view twice. gtag's own page
 * view covers client-side navigation through GA4's enhanced measurement.
 */
export function Analytics() {
  const direct = GTM ? [] : [GA, ADS].filter((id): id is string => Boolean(id));
  if (!GTM && !direct.length && !CLARITY) return null;
  return (
    <>
      {GTM && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(GTM)});`}
        </Script>
      )}
      {direct.length > 0 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${direct[0]}`} strategy="afterInteractive" />
          <Script id="gtag" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${direct
              .map((id) => `gtag('config',${JSON.stringify(id)});`)
              .join("")}`}
          </Script>
        </>
      )}
      {CLARITY && (
        <Script id="clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(CLARITY)});`}
        </Script>
      )}
      {(GTM || direct.length > 0) && <TrackEvents />}
    </>
  );
}

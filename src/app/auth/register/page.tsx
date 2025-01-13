import Script from "next/script";
import Layout from "./Layout";

export default function MyApp() {
  return (
    <>
       <Script src="https://www.google.com/recaptcha/enterprise.js?render=6Ld_cKYqAAAAAIXEwnAbGVqWehzWD9HuJ2XKBAh4" />
      <Layout/>
    </>
  );
}
 
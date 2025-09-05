import { GoogleOAuthProvider } from "@react-oauth/google";
import { VAR_AUTH_GOOGLE_CLIENT_ID } from "@vars";

const Layout = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={VAR_AUTH_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default Layout;

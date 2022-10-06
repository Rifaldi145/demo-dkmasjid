import "@fontsource/scada";
import "@fontsource/inter";
import '../styles/globals.css';
import '../styles/ckeditor.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }) {
    return (
        <div suppressHydrationWarning>
            {typeof window === 'undefined' ? null : <Component {...pageProps} />}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                pauseOnVisibilityChange
                closeOnClick
                pauseOnHover
            />
        </div>
    );
}
export default App;
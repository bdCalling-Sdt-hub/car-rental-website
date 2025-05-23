"use client";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import Navbar from "@/components/Navber";
import { usePathname } from "next/navigation";
// import { Provider } from "react-redux";
// import { store } from "../../utils/store";
import 'react-toastify/dist/ReactToastify.css';
import { ConfigProvider } from "antd";
import AppFooter from "@/components/AppFooter";
import Header from "@/components/Header";
import { AntdRegistry } from "@ant-design/nextjs-registry";



export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');
  return (
    <html lang="en">
      <body
        className={`antialiased`}
        cz-shortcut-listen="true"
      >
         <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#04BF61',
              colorBorder: '#E5E4E2', // Default border color
              colorText: 'rgba(0, 0, 0, 0.88)', // Default text color
              colorTextPlaceholder: '#bfbfbf', // Placeholder color
              colorBgContainer: '#ffffff', // Background color
              controlOutline: 'rgba(232, 80, 91, 0.1)', // Focus outline color (based on your primary color)
            },
            components: {
              // Input: {
              //   activeBorderColor: '#0001FB', // Active border color
              //   // hoverBorderColor: '#0001FB', // Hover border color
              //   activeShadow: '0 0 0 2px rgba(232, 80, 91, 0.1)', // Focus shadow
              // },

              Button: {
                controlHeight: 50,
              },
              Input: {
                controlHeight: 48,
              },
              Select: {
                controlHeight: 48,
              },
              DatePicker: {
                controlHeight: 48,
              },

            },
            Button: {
              colorPrimary: '#0001FB',
            }
          }}
        >
          {/* <Provider store={store}> */}
          {!isAuthPage && <Header />}
          {!isAuthPage && <Navbar />}
          {children}
          {!isAuthPage && <AppFooter />}
          <ToastContainer position="top-center" autoClose={2000} />
          {/* </Provider> */}
        </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

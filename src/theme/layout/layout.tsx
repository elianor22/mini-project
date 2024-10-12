import {ThemeProvider} from "@mui/material";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {FC, ReactNode} from "react";
import {theme} from "..";

type AppLayout = {
    children: ReactNode;
};

const AppLayout: FC<AppLayout> = ({children}) => {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100vh",
                        width: "100%",
                    }}
                >
                    {children}
                </div>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
};
export default AppLayout;

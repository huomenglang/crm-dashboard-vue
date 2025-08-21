// @ts-ignore
const env = import.meta.env

export const AppConfig = {
    APP_NAME: env.VITE_APP_NAME,
    APP_VERSION: env.PACKAGE_VERSION || '1.0.0',
    HEADER_NAME: env.VITE_APP_HEADER_NAME,
    FRONTEND_URL: env.VITE_APP_FRONTEND_URL || '',
    CLIENT_TOKEN_KEY: 'client_token',

    APP_LOGIN_BACKGROUND_URL: env.VITE_APP_LOGIN_BACKGROUND_URL,
    APP_LOGO_URL: env.VITE_APP_LOGIN_LOGO_URL,
    SERVER_URL: env.VITE_APP_SERVER_URL,

    // PACKAGE_VERSION: process.env.PACKAGE_VERSION,
    // BUILD_NUMBER: process.env.BUILD_NUMBER,
    // BUILD_DATE: process.env.BUILD_DATE,
    // COMMIT_ID: process.env.COMMIT_ID,
}

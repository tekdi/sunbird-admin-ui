const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/assets",
            "/search"
        ],
        "target": "https://sunbirdsaas.com",
        "secure": false,
        "logLevel": "debug",
        "changeOrigin": true
    }
]

module.exports = PROXY_CONFIG;
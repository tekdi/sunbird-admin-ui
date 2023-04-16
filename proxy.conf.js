const PROXY_CONFIG = [
    {
        context: [
            "/search"

        ],
        "target": "https://sunbirdsaas.com",
        "secure": false,
        "logLevel": "debug",
        "changeOrigin": true
    }
]

module.exports = PROXY_CONFIG;
const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/assets",
            "/search"
        ],
        "target": "http://localhost:3000",
        "secure": false,
        "logLevel": "debug",
        "changeOrigin": true
    },
    {
        context: "/bulkupload/ops-tool-upload",
        target: "http://localhost:3101",
        secure: false,
        logLevel: "debug",
        changeOrigin: true
        }        
]

module.exports = PROXY_CONFIG;
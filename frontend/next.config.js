/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    env: {
        BACKEND_URL: "http://3.142.199.84:8080",
    }
}

module.exports = nextConfig

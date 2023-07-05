/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.googleusercontent.com'
			}
		]
	},
	experimental: {
		serverActions: true
	},
	typescript: {
		ignoreBuildErrors: true
	}
};

module.exports = nextConfig;

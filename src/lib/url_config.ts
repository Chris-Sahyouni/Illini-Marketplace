

export const config = {
    scheme: process.env.NODE_ENV === 'production' ? 'https' : 'http',
    url: process.env.NODE_ENV === "production" ? 'illinimarketplace.com' : 'localhost:3000'
}


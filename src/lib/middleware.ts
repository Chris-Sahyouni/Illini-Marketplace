export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        // urls of pages that should only be accessed by authenticated users 
    ]
}

/**
    In another file, to protect a route from anybody unathenticated:
        const accessToken = request.headers.get("accessToken");
        if (!accessToken || ! verifyJwt(accessToken)) {
            return new Response(JSON.stringify({
                error: "unathorized"
            }),
            {
                status: 401
            }
            );
        }
*/
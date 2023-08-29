
import { NextRequest, NextResponse } from 'next/server';
import { withAuth} from 'next-auth/middleware';


export const config = {
    matcher: [
        "/admin/:path*"
    ]
}

export default withAuth(
    function middleware(req: any) {
        // can check for different pages with req.nextUrl.pathname.startsWith("");
        if (req.nextauth.token?.isAdmin === false) {
            console.log("not authorized");
            return NextResponse.rewrite(new URL('/', req.url));
        }
    },

    {
        callbacks: {
            authorized: ({token}: any) => !!token
        }
    }
);


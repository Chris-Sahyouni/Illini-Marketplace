

export function extractNetId(email: string): string {
    return email.split('@')[0];
}

export function isValidEmail(email: string): boolean {
    return email.endsWith("@illinois.edu");
}

export interface newUserRequest {
    password: string;
    email: string;
    username: string;
}

// I don't think this function needs to be async, but it might need to
export function sendRegisterRequest(data: newUserRequest) {

    fetch('/api/new_user', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then((res: Response) => {
        if (res.status === 200) {
            return res.json();
        }
    })
}

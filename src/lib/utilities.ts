import { newUserRequest } from "./types/interfaces";

export function extractNetId(email: string): string {
    return email.split('@')[0];
}

export function isValidEmail(email: string): boolean {
    return email.endsWith("@illinois.edu");
}

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

type UserInput = {
    id : string;
    name : string;
    email : string;
    password : string;
    telephoneNumber : string;
    role : string;
    createdAt : Date;
}

export default function userRegister(user: UserInput): Promise<UserInput> {
    return new Promise<UserInput>((resolve, reject) => {
        try {
            fetch('https://presentation-day-1-laeo-tae-loei.vercel.app/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        resolve(data.data);
                    } else {
                        reject(data.message);
                    }
                });
        } catch (error) {
            reject(error);
        }
    });
}
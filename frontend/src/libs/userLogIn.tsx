export default async function userLogIn(userEmail:string, userPassword:string) {
    const response = await fetch('https://presentation-day-1-laeo-tae-loei.vercel.app/api/v1/auth/login', {
    // const response = await fetch('https://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            email: userEmail, 
            password: userPassword 
        }),
    });
    
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Failed to login');
    }
}
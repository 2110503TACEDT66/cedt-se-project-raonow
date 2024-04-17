'use server'

export default async function updateBooking(title:string, desc:string, token:string, id:string, point:number, amount:number) {

    console.log("updating")
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/campaign/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            title: title,
            description: desc,
            point: point,
            totalAmount: amount
        })
    });

    if (!response.ok) {
        throw new Error("Failed to update campaign")
    }

    return await response.json();
}
'use server'

export default async function updateBooking(EbookDate:Date,duration:number, token:string, id:string) {

    console.log("updating")
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/booking/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            bookDate: EbookDate,
            duration: duration
        })
    });

    if (!response.ok) {
        throw new Error("Failed to update booking")
    }

    return await response.json();
}
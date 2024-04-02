export default async function deleteHotel(hid:string, token:string) {

    const response = await fetch(`https://presentation-day-1-laeo-tae-loei.vercel.app/api/v1/hotel/${hid}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to delete hotel');
    }

    return await response.json();
}
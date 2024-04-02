export default async function getHotel(hid:string) {
    const response = await fetch(`https://presentation-day-1-laeo-tae-loei.vercel.app/api/v1/hotel/${hid}`)

    if(!response) throw new Error("Failed to fetch hotel")

    return await response.json()
}


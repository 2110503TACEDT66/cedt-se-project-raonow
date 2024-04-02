export default async function getHotels(query?: { [key: string]: string | string[] | undefined }) {

    // make query work
    const flatQuery: Record<string, string> = {};
    if (query) {
        for (const key in query) {
            const value = query[key];
            if (Array.isArray(value)) {
                flatQuery[key] = value.join(",");
            } else if (value !== undefined) {
                flatQuery[key] = value;
            }
        }
    }

    //remove unused keys
    delete flatQuery.date;
    delete flatQuery.duration;

    const queryString = new URLSearchParams(flatQuery).toString();
    const response = await fetch(`https://presentation-day-1-laeo-tae-loei.vercel.app/api/v1/hotel?${queryString}`)

    if(!response) throw new Error("Failed to fetch hotels")
    
    return await response.json()
}
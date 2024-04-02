const calculateRoomPrice = (basePrice:number, room: string, star:number) => {
    let price = basePrice
    if (room.includes("Suite")) {
        price += 600
        if (room.includes("Executive")) {
            price += 1000
        }
        if (star == 5) price += 400
        return price
    }
    return price
}

export default calculateRoomPrice


export function getPreviousDate(date: string) {
    const [year, month, day] = date.split("-").map(Number);

    const current = new Date(year, month - 1, day);

    current.setDate(current.getDate() - 1);

    return [
        current.getFullYear(),
        String(current.getMonth() + 1).padStart(2, "0"),
        String(current.getDate()).padStart(2, "0"),
    ].join("-");
}

export function calculateCurrentStreak(
    sessionDates: string[],
    today: string
) {
    const uniqueSessionDates = [
        ...new Set(sessionDates)
    ];

    if (uniqueSessionDates.length === 0) {
        return 0;
    }

    const latestDate = uniqueSessionDates[0];
    const yesterday = getPreviousDate(today);

    if (latestDate !== today && latestDate !== yesterday) {
        return 0;
    }

    let currentStreak = 1;
    let currentDate = uniqueSessionDates[0];

    for (let i = 1; i < uniqueSessionDates.length; i++) {
        const previousDate = getPreviousDate(currentDate);

        if (!uniqueSessionDates.includes(previousDate)) {
            break;
        }

        currentStreak++;
        currentDate = previousDate;
    }

    return currentStreak;
}

export function getLocalDate(date: Date) {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}

export function getTodayLocalDate() {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());
}
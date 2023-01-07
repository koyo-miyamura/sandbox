export const formatDate = (dt: Date) => {
    const yyyy = dt.getFullYear();
    const mm = ("00" + (dt.getMonth() + 1)).slice(-2);
    const dd = ("00" + dt.getDate()).slice(-2);
    return `${yyyy}/${mm}/${dd}`;
};

export const formatTime = (dt: Date) => {
    const hh = ("00" + dt.getHours()).slice(-2);
    const mm = ("00" + dt.getMinutes()).slice(-2);

    return `${hh} : ${mm}`;
};

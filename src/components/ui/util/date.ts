export const getDateTime = (offset: { days?: number; months?: number } = {}) => {
    const d = new Date();
    if (offset.days) d.setDate(d.getDate() + offset.days);
    if (offset.months) d.setMonth(d.getMonth() + offset.months);
    return d.toLocaleString('sv-SE', { hour12: false }).replace(' ', 'T').slice(0, 16);
};

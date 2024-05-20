

export class DateTimeHelper {
    static ToDate(dateString: string): Date {
        var date = undefined;
        if (dateString) {
            date = new Date(dateString);
        }

        return date;
    }

    static DiffHours(toDate: Date, fromDate: Date): number {
        var diff = (toDate.getTime() - fromDate.getTime()) / 1000;
        diff /= (60 * 60);
        return Math.abs(Math.round(diff));
    }

    static TimeToDate(time: string): Date {
        var date = new Date().toDateString();

        return new Date(date + " " + time);
    }

    static DateToTime(date: Date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();

        var timeHours = ('0' + hours).slice(-2);
        var timeMinutes = ('0' + minutes).slice(-2);

        return timeHours + ':' + timeMinutes;
    }
}

/** Regex string for a Cron task. Also see {@link CRON_REGEX} */
export const CRON_REGEX_STRING =
	"(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\\d+(ns|us|µs|ms|s|m|h))+)|((((\\d+,)+\\d+|([\\d*]+(\\/|-)\\d+)|\\d+|\\*) ?){5,7})";
/** Regex for a Cron task. Also see {@link CRON_REGEX_STRING} */
export const CRON_REGEX =
	/(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)|((((\d+,)+\d+|([\d\*]+(\/|-)\d+)|\d+|\*) ?){5,7})/;

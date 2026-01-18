import type { TimeInputValue } from '@heroui/react';
import { Time } from '@internationalized/date';

// Check if the current time is within the specified schedule
export function isWithinSchedule(
  scheduleFrom: TimeInputValue,
  scheduleTo: TimeInputValue,
): boolean {
  const now = new Date();
  const currentTime = new Time(now.getHours(), now.getMinutes());
  const scheduleFromTime = new Time(scheduleFrom.hour, scheduleFrom.minute);
  const scheduleToTime = new Time(scheduleTo.hour, scheduleTo.minute);
  if (scheduleToTime.compare(scheduleFromTime) < 0) {
    return currentTime.compare(scheduleFromTime) >= 0 || currentTime.compare(scheduleToTime) < 0;
  }
  return currentTime.compare(scheduleFromTime) >= 0 && currentTime.compare(scheduleToTime) < 0;
}

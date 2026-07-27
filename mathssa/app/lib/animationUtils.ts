
/**
 * @param progress value of lesson progress
 * @param start start time of segment
 * @param end end time of segment
 * @returns value between 0 and 1
 *  portion of segment that needs to be drawn at a particular value of progress
 */
export function segmentProgress(progress: number, start: number, end: number) {
  if (progress < start) return 0
  if (progress > end) return 1
  return (progress - start) / (end - start)
}
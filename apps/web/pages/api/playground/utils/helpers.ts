import { type App } from "./fly";

/**
 * Force a waiting period of n seconds
 * @param n: Milliseconds to wait @default 2500
 */
export const wait = (n: number = 2500) => new Promise<void>((res) => setTimeout(() => res(), n));

/**
 * Check if the given app is expired and return true if it should be truncated.
 * @param app: App
 * @returns boolean
 */
export const isExpired = (app: App): boolean => {
    const dayInMS = 1440 * 1000; // 1440 seconds * 1000 to get milliseconds
    
    const deleteIfOld = app.state === "SUSPENDED" || app.state === 'PENDING';
    const isOld = new Date(app.createdAt).getTime() + dayInMS <= new Date().getTime();

    return deleteIfOld && isOld;
}
//fallback wrapper around navigator.geolocation
//unify success/error callbacks into async/await
export function getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
        if(!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser.'));
        } else {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        }
    });
}
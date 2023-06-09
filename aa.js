/**
 * 浏览器是否支持  audio
 * @returns {boolean}
 */
const is_support_audio = () => {
    try {
        const audio_ctx = window.OfflineAudioContext || window.webkitOfflineAudioContext;

        if (audio_ctx) {
            return true;
        }
    } catch (e) {

    }

    return false;
}

/**
 * 获得音频指纹
 * @param callback
 * @returns {*}
 */
const get_audio_fingerprint = (callback) => {
    try {
        const audio_ctx = window.OfflineAudioContext || window.webkitOfflineAudioContext;

        if (!audio_ctx) {
            return callback(false);
        }

        const offline_ctx = new audio_ctx(1, 5000, 44100);
        const oscillator = offline_ctx.createOscillator();

        oscillator.type = "triangle";
        oscillator.frequency.value = 10000;

        const compressor = offline_ctx.createDynamicsCompressor();
        compressor.threshold.value = -50;
        compressor.knee.value = 40;
        compressor.ratio.value = 12;
        compressor.attack.value = 0;
        compressor.release.value = 0.25;

        oscillator.connect(compressor);
        compressor.connect(offline_ctx.destination);
        oscillator.start(0);
        render_audio(offline_ctx, callback);
    } catch (e) {
        // console.log(e)
    }

    return callback(false);
}

/**
 * render
 *
 * @param offline_ctx
 * @param callback
 */
const render_audio = (offline_ctx, callback) => {
    offline_ctx.startRendering();
    let status = false;

    offline_ctx.oncomplete = function (offline_ctx) {
        if (status) {
            return;
        }

        const buffer = offline_ctx.renderedBuffer;
        const result = hash(buffer.getChannelData(0).subarray(4500));
        status = true;
        callback(result);
    };

    setTimeout(function () {
        if (status) {
            return;
        }
    }, 300);
}

/**
 * hash
 * @param arr
 * @returns {number}
 */
const hash = (arr) => {
    let result = 0;

    console.log(arr)

    for (let i = 0; i < arr.length; ++i) {
        console.log(arr[265])
        result += Math.abs(arr[i]);
    }
    console.log(result)
}


get_audio_fingerprint((value) => {
    console.log(value)
})

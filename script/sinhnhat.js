/* ========================================
   LẤY ELEMENT
======================================== */

const openGift =
    document.getElementById("openGift");

const intro =
    document.getElementById("intro");

const giftLid =
    document.querySelector(".gift-lid");

const giftBox =
    document.querySelector(".gift-box");

const birthdayContent =
    document.getElementById("birthdayContent");

const birthdayPopup =
    document.getElementById("birthdayPopup");

const popupClose =
    document.getElementById("popupClose");

const popupOverlay =
    document.querySelector(".popup-overlay");

const photos =
    document.querySelectorAll(".memory-photo");


/* ========================================
   POPUP + THANH KÉO
======================================== */

const slideHandle =
    document.getElementById("slideHandle");

const slideArea =
    document.getElementById("slideArea");

const slideTrack =
    slideHandle
        ? slideHandle.parentElement
        : null;

const page1 =
    document.querySelector(".page-1");

const page2 =
    document.querySelector(".page-2");


/* ========================================
   COUNTDOWN + BÁNH
======================================== */

const startBtn =
    document.getElementById("startBtn");

const countdownScreen =
    document.getElementById(
        "countdownScreen"
    );

const countdownNumber =
    document.getElementById(
        "countdownNumber"
    );

const cakeScreen =
    document.getElementById(
        "cakeScreen"
    );

const candle =
    document.getElementById(
        "candle"
    );


/* ========================================
   POPUP ƯỚC
======================================== */

const wishPopup =
    document.getElementById(
        "wishPopup"
    );

const blowCandleBtn =
    document.getElementById(
        "blowCandleBtn"
    );


/* ========================================
   POPUP HỎI XEM KỶ NIỆM
======================================== */

const memoryQuestionPopup =
    document.getElementById(
        "memoryQuestionPopup"
    );

const memoryYesBtn =
    document.getElementById(
        "memoryYesBtn"
    );

const memoryNoBtn =
    document.getElementById(
        "memoryNoBtn"
    );


/* ========================================
   MÀN HÌNH KHÉP
======================================== */

const screenClose =
    document.getElementById(
        "screenClose"
    );


/* ========================================
   TRANG KỶ NIỆM
======================================== */

const memoryPage =
    document.getElementById(
        "memoryPage"
    );


/* ========================================
   VIEWER ẢNH / VIDEO
======================================== */

const memoryViewer =
    document.getElementById(
        "memoryViewer"
    );

const memoryViewerContent =
    document.getElementById(
        "memoryViewerContent"
    );

const memoryViewerClose =
    document.getElementById(
        "memoryViewerClose"
    );

const memoryViewerOverlay =
    document.getElementById(
        "memoryViewerOverlay"
    );


/* ========================================
   ẢNH CUỐI XONG → HIỆN POPUP
======================================== */

const lastPhoto =
    photos.length > 0
        ? photos[photos.length - 1]
        : null;

let popupHasOpened = false;


if (lastPhoto) {

    lastPhoto.addEventListener(
        "animationend",
        function (event) {

            if (
                event.animationName !==
                "photoPop"
            ) {
                return;
            }

            if (popupHasOpened) {
                return;
            }

            popupHasOpened = true;


            setTimeout(function () {

                if (birthdayPopup) {

                    birthdayPopup
                        .classList
                        .add("show");

                }

            }, 700);

        }
    );

}


/* ========================================
   BẤM NÚT MỞ QUÀ
======================================== */

if (
    openGift &&
    intro &&
    giftLid &&
    giftBox &&
    birthdayContent
) {

    openGift.addEventListener(
        "click",
        function () {


            /* chống bấm nhiều lần */

            if (
                intro.classList.contains(
                    "zoom-gift"
                )
            ) {
                return;
            }


            /* zoom hộp quà */

            intro.classList.add(
                "zoom-gift"
            );


            /* đợi hộp quà mở */

            setTimeout(function () {


                const lidRect =
                    giftLid
                        .getBoundingClientRect();


                const boxRect =
                    giftBox
                        .getBoundingClientRect();


                /* tâm khe giữa */

                const gapX =
                    (
                        boxRect.left +
                        boxRect.right
                    ) / 2;


                const gapY =
                    (
                        lidRect.bottom +
                        boxRect.top
                    ) / 2;


                intro.style.setProperty(
                    "--gap-x",
                    gapX + "px"
                );


                intro.style.setProperty(
                    "--gap-y",
                    gapY + "px"
                );


                /* camera zoom */

                intro.classList.add(
                    "camera-zoom"
                );


                /* hiện 10 ảnh */

                setTimeout(function () {


                    birthdayContent
                        .classList
                        .add("show");


                    setTimeout(function () {

                        intro.style.display =
                            "none";

                    }, 300);


                }, 1100);


            }, 2800);

        }
    );

}


/* ========================================
   ĐÓNG POPUP LỜI CHÚC
======================================== */

if (
    popupClose &&
    birthdayPopup
) {

    popupClose.addEventListener(
        "click",
        function () {

            birthdayPopup
                .classList
                .remove("show");

        }
    );

}


if (
    popupOverlay &&
    birthdayPopup
) {

    popupOverlay.addEventListener(
        "click",
        function () {

            birthdayPopup
                .classList
                .remove("show");

        }
    );

}


/* ========================================
   KÉO QUA ĐỂ XEM NỘI DUNG 2
======================================== */

let isDragging = false;

let startX = 0;

let currentX = 0;

let switchedPage = false;


if (
    slideHandle &&
    slideTrack
) {


    /* bắt đầu kéo */

    slideHandle.addEventListener(
        "pointerdown",
        function (event) {


            if (switchedPage) {
                return;
            }


            isDragging = true;


            startX =
                event.clientX -
                currentX;


            slideHandle
                .setPointerCapture(
                    event.pointerId
                );

        }
    );


    /* đang kéo */

    slideHandle.addEventListener(
        "pointermove",
        function (event) {


            if (
                !isDragging ||
                switchedPage
            ) {
                return;
            }


            const trackWidth =
                slideTrack.clientWidth;


            const handleWidth =
                slideHandle.offsetWidth;


            const maxX =
                trackWidth -
                handleWidth -
                10;


            currentX =
                event.clientX -
                startX;


            currentX =
                Math.max(
                    0,
                    Math.min(
                        currentX,
                        maxX
                    )
                );


            slideHandle
                .style
                .transform =
                `translateX(${currentX}px)`;


            /* kéo đủ 75% */

            if (
                currentX >=
                maxX * 0.75
            ) {

                showPageTwo(maxX);

            }

        }
    );


    slideHandle.addEventListener(
        "pointerup",
        resetSlider
    );


    slideHandle.addEventListener(
        "pointercancel",
        resetSlider
    );

}


/* ========================================
   CHUYỂN SANG TRANG 2 POPUP
======================================== */

function showPageTwo(maxX) {


    if (switchedPage) {
        return;
    }


    switchedPage = true;

    isDragging = false;


    slideHandle.style.transition =
        "transform 0.25s ease";


    slideHandle.style.transform =
        `translateX(${maxX}px)`;


    setTimeout(function () {


        if (page1) {

            page1.style.display =
                "none";

        }


        if (page2) {

            page2.classList.add(
                "active"
            );

        }


        if (slideArea) {

            slideArea.style.display =
                "none";

        }


    }, 250);

}


/* ========================================
   KÉO CHƯA ĐỦ → QUAY VỀ
======================================== */

function resetSlider() {


    if (
        switchedPage ||
        !isDragging
    ) {
        return;
    }


    isDragging = false;

    currentX = 0;


    slideHandle.style.transition =
        "transform 0.3s ease";


    slideHandle.style.transform =
        "translateX(0)";


    setTimeout(function () {

        slideHandle.style.transition =
            "";

    }, 300);

}


/* ========================================
   BẮT ĐẦU
   3 → 2 → 1
   → BÁNH
   → CẮM NẾN
======================================== */

let birthdayStarted = false;


if (
    startBtn &&
    countdownScreen &&
    countdownNumber &&
    cakeScreen &&
    candle
) {

    startBtn.addEventListener(
        "click",
        function () {


            if (birthdayStarted) {
                return;
            }


            birthdayStarted = true;


            /* ẩn popup lời chúc */

            if (birthdayPopup) {

                birthdayPopup
                    .classList
                    .remove("show");

            }


            /* reset bánh */

            cakeScreen
                .classList
                .remove("show");


            /* reset nến */

            candle
                .classList
                .remove("insert");

            candle
                .classList
                .remove("lit");


            /* hiện countdown */

            countdownScreen
                .classList
                .add("show");


            let count = 3;


            showNumber(count);


            const countdownInterval =
                setInterval(
                    function () {


                        count--;


                        if (
                            count > 0
                        ) {

                            showNumber(
                                count
                            );

                        }

                        else {


                            clearInterval(
                                countdownInterval
                            );


                            /* đợi số 1 xong */

                            setTimeout(
                                function () {


                                    /* ẩn countdown */

                                    countdownScreen
                                        .classList
                                        .remove(
                                            "show"
                                        );


                                    /* hiện bánh */

                                    cakeScreen
                                        .classList
                                        .add(
                                            "show"
                                        );


                                    /* đợi bánh hiện → cắm nến */

                                    setTimeout(
                                        function () {

                                            candle
                                                .classList
                                                .add(
                                                    "insert"
                                                );

                                        },
                                        1100
                                    );


                                },
                                800
                            );

                        }


                    },
                    900
                );

        }
    );

}


/* ========================================
   NẾN CẮM XONG
   → BẬT LỬA
   → POPUP ƯỚC
======================================== */

if (candle) {

    candle.addEventListener(
        "animationend",
        function (event) {


            if (
                event.animationName !==
                "candleInsert"
            ) {
                return;
            }


            /* bật lửa */

            candle
                .classList
                .add("lit");


            /* sau 1 giây hiện popup */

            setTimeout(
                function () {


                    if (wishPopup) {

                        wishPopup
                            .classList
                            .add("show");

                    }


                },
                1000
            );

        }
    );

}


/* ========================================
   HÀM HIỆN SỐ 3 2 1
======================================== */

function showNumber(number) {


    if (!countdownNumber) {
        return;
    }


    countdownNumber.textContent =
        number;


    countdownNumber
        .classList
        .remove("animate");


    void countdownNumber.offsetWidth;


    countdownNumber
        .classList
        .add("animate");

}


/* ========================================
   THỔI NẾN
======================================== */

if (
    blowCandleBtn &&
    candle
) {

    blowCandleBtn.addEventListener(
        "click",
        function () {


            /* đóng popup */

            if (wishPopup) {

                wishPopup
                    .classList
                    .remove("show");

            }


            /* tắt lửa */

            candle
                .classList
                .remove("lit");


            /* tạo khói */

            const wicks =
                candle
                    .querySelectorAll(
                        ".wick"
                    );


            wicks.forEach(
                function (wick) {


                    const smoke =
                        document
                            .createElement(
                                "span"
                            );


                    smoke
                        .classList
                        .add(
                            "smoke-puff"
                        );


                    wick.appendChild(
                        smoke
                    );


                    setTimeout(
                        function () {

                            smoke.remove();

                        },
                        1800
                    );


                }
            );


            /* hiện popup hỏi */

            setTimeout(
                function () {


                    if (
                        memoryQuestionPopup
                    ) {

                        memoryQuestionPopup
                            .classList
                            .add(
                                "show"
                            );

                    }


                },
                1000
            );

        }
    );

}


/* ========================================
   BẤM KHÔNG
======================================== */

if (
    memoryNoBtn &&
    memoryQuestionPopup
) {

    memoryNoBtn.addEventListener(
        "click",
        function () {


            memoryQuestionPopup
                .classList
                .remove("show");


            setTimeout(
                function () {


                    if (screenClose) {

                        screenClose
                            .classList
                            .add(
                                "close-now"
                            );

                    }


                },
                300
            );

        }
    );

}


/* ========================================
   BẤM CÓ
   → MỞ TRANG KỶ NIỆM
======================================== */

if (
    memoryYesBtn &&
    memoryPage
) {

    memoryYesBtn.addEventListener(
        "click",
        function () {


            /* đóng popup hỏi */

            if (
                memoryQuestionPopup
            ) {

                memoryQuestionPopup
                    .classList
                    .remove("show");

            }


            /* ẩn bánh */

            if (cakeScreen) {

                cakeScreen
                    .classList
                    .remove("show");

            }


            /* ẩn 10 ảnh đầu */

            if (birthdayContent) {

                birthdayContent
                    .classList
                    .remove("show");

            }


            /* ẩn popup cũ */

            if (birthdayPopup) {

                birthdayPopup
                    .classList
                    .remove("show");

            }


            /* reset tab */

            document
                .querySelectorAll(
                    ".memory-tab-btn"
                )
                .forEach(
                    function (btn) {

                        btn
                            .classList
                            .remove(
                                "active"
                            );

                    }
                );


            document
                .querySelectorAll(
                    ".memory-tab-content"
                )
                .forEach(
                    function (tab) {

                        tab
                            .classList
                            .remove(
                                "active"
                            );

                    }
                );


            const photoButton =
                document.querySelector(
                    '.memory-tab-btn[data-tab="photoTab"]'
                );


            const photoTab =
                document.getElementById(
                    "photoTab"
                );


            if (photoButton) {

                photoButton
                    .classList
                    .add("active");

            }


            if (photoTab) {

                photoTab
                    .classList
                    .add("active");

            }


            /* hiện trang */

            setTimeout(
                function () {

                    memoryPage
                        .classList
                        .add("show");

                },
                400
            );

        }
    );

}


/* ========================================
   CHUYỂN TAB ẢNH / VIDEO
======================================== */

document.addEventListener(
    "click",
    function (event) {


        const button =
            event.target.closest(
                ".memory-tab-btn"
            );


        if (!button) {
            return;
        }


        const tabId =
            button.dataset.tab;


        if (!tabId) {

            console.error(
                "Nút tab thiếu data-tab."
            );

            return;

        }


        const targetTab =
            document.getElementById(
                tabId
            );


        if (!targetTab) {

            console.error(
                "Không tìm thấy tab:",
                tabId
            );

            return;

        }


        /* bỏ active nút cũ */

        document
            .querySelectorAll(
                ".memory-tab-btn"
            )
            .forEach(
                function (btn) {

                    btn
                        .classList
                        .remove(
                            "active"
                        );

                }
            );


        /* ẩn tab cũ */

        document
            .querySelectorAll(
                ".memory-tab-content"
            )
            .forEach(
                function (tab) {

                    tab
                        .classList
                        .remove(
                            "active"
                        );

                }
            );


        /* bật tab mới */

        button
            .classList
            .add("active");


        targetTab
            .classList
            .add("active");

    }
);


/* ========================================
   BẤM ẢNH / VIDEO → MỞ VIEWER
======================================== */

document.addEventListener(
    "click",
    function (event) {


        const item =
            event.target.closest(
                ".memory-item"
            );


        if (!item) {
            return;
        }


        const type =
            item.dataset.type;


        const src =
            item.dataset.src;


        /* kiểm tra src */

        if (!src) {

            console.error(
                "Memory item thiếu data-src."
            );

            return;

        }


        /* kiểm tra viewer */

        if (
            !memoryViewer ||
            !memoryViewerContent
        ) {

            console.error(
                "Thiếu memoryViewer trong HTML."
            );

            return;

        }


        /* xóa nội dung cũ */

        memoryViewerContent.innerHTML =
            "";


        /* =========================
           NẾU LÀ ẢNH
        ========================= */

        if (
            type === "image"
        ) {


            const image =
                document
                    .createElement(
                        "img"
                    );


            image.src =
                src;


            image.alt =
                "Kỷ niệm";


            memoryViewerContent
                .appendChild(
                    image
                );

        }


        /* =========================
           NẾU LÀ VIDEO
        ========================= */

        else if (type === "video") {

    /* lấy video thumbnail hiện tại */
    const previewVideo =
        item.querySelector("video");


    /* ưu tiên lấy đúng src đang chạy */
    let videoSrc = src;

    if (previewVideo) {

        videoSrc =
            previewVideo.currentSrc ||
            previewVideo.src ||
            src;

    }


    const video =
        document.createElement(
            "video"
        );


    video.src = videoSrc;

    video.controls = true;

    video.playsInline = true;

    video.preload = "auto";

    video.volume = 1;


    /* để video rộng hơn */
    video.style.width = "100%";

    video.style.maxWidth = "900px";


    memoryViewerContent
        .appendChild(video);


    /* hiện viewer trước */
    memoryViewer
        .classList
        .add("show");


    /* load video */
    video.load();


    /* khi load được metadata */
    video.addEventListener(
        "loadedmetadata",
        function () {

            console.log(
                "Video load OK:",
                video.duration
            );

        }
    );


    /* khi video phát được */
    video.addEventListener(
        "canplay",
        function () {

            video.play()
                .catch(function () {

                    console.log(
                        "Bấm nút Play để phát video"
                    );

                });

        },
        {
            once: true
        }
    );


    /* báo lỗi nếu video không load được */
    video.addEventListener(
        "error",
        function () {

            console.error(
                "Không load được video:",
                videoSrc
            );

        }
    );

}

        else {

            console.error(
                'data-type phải là "image" hoặc "video".'
            );

            return;

        }


        /* mở viewer */

        memoryViewer
            .classList
            .add("show");

    }
);


/* ========================================
   ĐÓNG VIEWER
======================================== */

function closeMemoryViewer() {


    if (
        !memoryViewer ||
        !memoryViewerContent
    ) {
        return;
    }


    /* tìm video */

    const video =
        memoryViewerContent
            .querySelector(
                "video"
            );


    /* dừng video */

    if (video) {

        video.pause();

        video.currentTime =
            0;

    }


    /* đóng viewer */

    memoryViewer
        .classList
        .remove("show");


    /* xóa nội dung */

    setTimeout(
        function () {

            memoryViewerContent
                .innerHTML = "";

        },
        350
    );

}


/* ========================================
   NÚT X VIEWER
======================================== */

if (memoryViewerClose) {

    memoryViewerClose
        .addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                closeMemoryViewer();

            }
        );

}


/* ========================================
   BẤM NỀN TỐI → ĐÓNG
======================================== */

if (memoryViewerOverlay) {

    memoryViewerOverlay
        .addEventListener(
            "click",
            closeMemoryViewer
        );

}


/* ========================================
   ESC → ĐÓNG VIEWER
======================================== */

document.addEventListener(
    "keydown",
    function (event) {


        if (
            event.key ===
            "Escape"
        ) {

            closeMemoryViewer();

        }

    }
);
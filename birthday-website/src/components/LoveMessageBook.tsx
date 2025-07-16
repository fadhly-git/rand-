import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./LoveMessageBook.module.css";

export default function LoveMessageBook() {
    const [flipped, setFlipped] = useState(false);

    return (
        <section className={styles.wrapper}>
            <img className={styles.floatingImgLeft} src="/imgs/14.jpg" alt="Floating Left" />
            <div className={styles.cardCenter}>
                <div
                    className={`${styles.card} ${flipped ? styles.flipped : ""}`}
                    tabIndex={0}
                    onClick={() => setFlipped((f) => !f)}
                    aria-label="flipped birthday card"
                    role="button"
                >
                    <div className={styles.outside}>
                        <div className={styles.front}>
                            <p>Happy Birthday</p>
                            <div className={styles.cake}>
                                <div className={styles["top-layer"]}></div>
                                <div className={styles["middle-layer"]}></div>
                                <div className={styles["bottom-layer"]}></div>
                                <div className={styles.candle}></div>
                            </div>
                        </div>
                        <div className={styles.back}>
                            <div className={styles.leftPage}>
                                <p className="text-sm md:text-base text-[#5b3a1d] leading-relaxed px-2">
                                    "Selamat ulang tahun untuk jiwa yang telah mengubah hidupku menjadi kisah cinta terindah yang pernah ada."
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.inside}>
                        <div>
                            <motion.p
                                className="text-xs md:text-base text-[#5b3a1d] leading-relaxed mb-2 px-2 pt-3"
                                style={{
                                    fontWeight: 900,
                                    letterSpacing: "0.03em",
                                    textAlign: "justify",
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={flipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ delay: 1.5, duration: 0.8 }}
                            >
                                Selamat ulang tahun, sayang. Terima kasih ya, sudah menjadi alasan banyak senyum dan tawa di hidupku selama ini. Bersamamu, semuanya terasa lebih ringan dan berwarna. Semoga di usiamu yang baru ini, kamu selalu diberi kesehatan, kebahagiaan yang melimpah, dan kemudahan dalam setiap langkah. Aku di sini untuk menemanimu.
                            </motion.p>
                            <motion.p
                                className="text-base md:text-lg text-[#6f4224] font-bold"
                                style={{
                                    fontFamily: "'Pacifico', 'Dancing Script', cursive",
                                    textAlign: "center",
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={flipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ delay: 1.8, duration: 0.8 }}
                            >
                                Happy Birthday, my greatest adventure. <br /> I will love you, always. ❤️
                            </motion.p>
                        </div>
                        <motion.h1
                            role="img"
                            aria-label="gift"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={flipped ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                            transition={{ delay: 2.1, duration: 0.6 }}
                        >
                            🎁
                        </motion.h1>
                    </div>
                </div>
                <div className={styles.instruction}>
                    {flipped ? "Klik kartu untuk menutup" : "Klik kartu untuk membuka"}
                </div>
            </div>
            <img className={styles.floatingImgRight} src="/imgs/17.jpg" alt="Floating Right" />
        </section>
    );
}
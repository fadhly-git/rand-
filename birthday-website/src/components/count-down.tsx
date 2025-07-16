import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

// Format dua digit
const fmt = (n: number) => n.toString().padStart(2, "0");

// Hitung countdown
function getCountdown(targetDate: Date) {
    const now = new Date();
    const diffMs = targetDate.getTime() - now.getTime();
    if (diffMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);
    return { days, hours, minutes, seconds, finished: false };
}

export const CountdownRolodex = ({
    targetDate = new Date("2025-08-01T00:00:00"),
    onFinish,
}: { targetDate?: Date; onFinish?: () => void }) => {
    const [countdown, setCountdown] = useState(getCountdown(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            const newCountdown = getCountdown(targetDate);
            setCountdown(newCountdown);
            if (newCountdown.finished && onFinish) {
                onFinish();
                clearInterval(timer);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate, onFinish]);

    if (countdown.finished) {
        return (
            <section className="flex flex-col items-center py-24 gap-10 ">
                <span className="text-3xl font-bold text-pink-500">Waktu telah tiba!</span>
            </section>
        );
    }

    return (
        <section className="flex flex-col md:flex-row items-center justify-center gap-12 bg-neutral-950 rounded-xl px-4 py-24">
            <DivOrigamiRolodex label="Hari" value={fmt(countdown.days)} color="bg-orange-300 text-neutral-900" />
            <DivOrigamiRolodex label="Jam" value={fmt(countdown.hours)} color="bg-blue-300 text-neutral-900" />
            <DivOrigamiRolodex label="Menit" value={fmt(countdown.minutes)} color="bg-green-300 text-neutral-900" />
            <DivOrigamiRolodex label="Detik" value={fmt(countdown.seconds)} color="bg-pink-300 text-neutral-900" />
        </section>
    );
};

// ===== ANIMASI ROLODEX MIRIP =====
const TRANSITION_DURATION_IN_SECS = 0.5;

const DivOrigamiRolodex = ({
    label,
    value,
    color,
}: {
    label: string;
    value: string;
    color?: string;
}) => {
    // Untuk flip animasi, kita simpan value sebelumnya
    const [index, setIndex] = useState(0);
    const prevValue = useRef(value);

    useEffect(() => {
        if (prevValue.current !== value) {
            setIndex((prev) => prev + 1);
            prevValue.current = value;
        }
    }, [value]);

    return (
        <div className="flex flex-col items-center gap-2">
            <div
                style={{
                    transform: "rotateY(-20deg)",
                    transformStyle: "preserve-3d",
                }}
                className="relative z-0 h-44 w-60 shrink-0 rounded-xl border border-neutral-700 bg-neutral-800"
            >
                <AnimatePresence mode="sync">
                    <motion.div
                        style={{
                            y: "-50%",
                            x: "-50%",
                            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                            zIndex: -index,
                            backfaceVisibility: "hidden",
                        }}
                        key={index}
                        transition={{
                            duration: TRANSITION_DURATION_IN_SECS,
                            ease: "easeInOut",
                        }}
                        initial={{ rotateX: "0deg" }}
                        animate={{ rotateX: "0deg" }}
                        exit={{ rotateX: "-180deg" }}
                        className="absolute left-1/2 top-1/2"
                    >
                        <CountdownItem className={color}>{value}</CountdownItem>
                    </motion.div>
                    <motion.div
                        style={{
                            y: "-50%",
                            x: "-50%",
                            clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                            zIndex: index,
                            backfaceVisibility: "hidden",
                        }}
                        key={(index + 1) * 2}
                        initial={{ rotateX: "180deg" }}
                        animate={{ rotateX: "0deg" }}
                        exit={{ rotateX: "0deg" }}
                        transition={{
                            duration: TRANSITION_DURATION_IN_SECS,
                            ease: "easeInOut",
                        }}
                        className="absolute left-1/2 top-1/2"
                    >
                        <CountdownItem className={color}>{value}</CountdownItem>
                    </motion.div>
                </AnimatePresence>
                <hr
                    style={{
                        transform: "translateZ(1px)",
                    }}
                    className="absolute left-0 right-0 top-1/2 z-[999999999] -translate-y-1/2 border-t-2 border-neutral-800"
                />
            </div>
            <span className="mt-2 font-semibold text-neutral-200 tracking-wide text-lg drop-shadow">{label}</span>
        </div>
    );
};

const CountdownItem = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={twMerge(
            "grid h-36 w-52 place-content-center rounded-lg bg-neutral-700 text-6xl text-neutral-50 font-mono",
            className
        )}
    >
        {children}
    </div>
);
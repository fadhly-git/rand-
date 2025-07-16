import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import "./floating-galery.module.css";

// ====== RANDOM IMAGE DATA ======
const imageUrls = [
    "/imgs/1.JPG",
    "/imgs/2.jpg",
    "/imgs/3.jpg",
    "/imgs/4.jpg",
    "/imgs/5.jpg",
    "/imgs/10.jpg",
    "/imgs/11.jpg",
    "/imgs/12.jpg",
    "/imgs/13.jpg",
    "/imgs/14.jpg",
    "/imgs/15.jpg",
    "/imgs/16.jpg",
    "/imgs/17.jpg",
    "/imgs/18.jpg",
    "/imgs/19.jpg",
    "/imgs/20.jpg",
    "/imgs/21.jpg",
    "/imgs/22.jpg",
    "/imgs/23.jpg",
    "/imgs/24.jpg",
    "/imgs/25.jpg",
    "/imgs/26.jpg",
];

const altTexts = [
    "Balon warna-warni di udara",
    "Bunga cantik yang sedang mekar",
    "Kue ulang tahun dengan lilin",
    "Kado terbungkus rapi",
    "Pemandangan alam yang indah",
    "Kursi kayu di taman",
    "Hutan hijau yang rimbun",
    "Langit biru cerah",
    "Pantai dengan pasir putih",
    "Gunung tinggi dengan salju",
    "Dekorasi perayaan ulang tahun",
    "Lilin menyala di atas meja",
    "Hadiah spesial untuk seseorang",
    "Taman penuh bunga warna-warni",
    "Lampu gantung yang elegan",
    "Meja makan dengan dekorasi",
    "Pohon besar di tengah hutan",
    "Sungai yang mengalir tenang",
    "Kota dengan gedung tinggi",
    "Langit malam penuh bintang",
    "Senja dengan warna oranye",
    "Pelangi setelah hujan",
    "Air terjun yang megah",
    "Daun hijau yang segar",
];

// Random helper
function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFromArray<T>(arr: T[]): T {
    return arr[randomInt(0, arr.length - 1)];
}

// Random positions for absolute Tailwind
const positions = [
    "left-8 top-20",
    "right-10 top-16",
    "left-1/4 top-1/4",
    "right-4 top-1/3",
    "left-1/2 top-3/4 -translate-x-1/2",
    "right-1/4 top-1/2 -translate-y-1/2",
    "left-14 top-56",
    "right-20 top-44",
    "left-1/3 top-3/4 -translate-x-1/2",
    "right-8 top-32",
    "left-1/4 top-2/3",
    "right-1/3 top-1/4",
    "left-10 top-10",
    "right-12 top-12",
    "left-1/5 top-1/5",
    "right-1/5 top-1/5",
    "left-1/6 top-1/6",
    "right-1/6 top-1/6",
    "left-1/7 top-1/7",
    "right-1/7 top-1/7",
];

const sizes = [
    "w-32",
    "w-36",
    "w-44",
    "w-52",
    "w-28",
    "w-48",
    "w-56",
    "w-40",
];

// ===== FLOATING IMAGES TYPE =====
type FloatingImageData = {
    url: string;
    alt: string;
    start: number;
    end: number;
    style: string;
};

// Generate random images only once per mount
function useRandomFloatingImages(count: number = 12): FloatingImageData[] {
    return useMemo(() => {
        return Array.from({ length: count }).map((_, idx) => {
            const url = randomFromArray(imageUrls);
            const alt = randomFromArray(altTexts);
            const start = randomInt(-180, 160);
            const end = randomInt(60, 320);
            const size = randomFromArray(sizes);
            const pos = positions[idx % positions.length];
            return {
                url,
                alt,
                start,
                end,
                style: `${size} xl:${size.replace("w-", "w-")} absolute ${pos} drop-shadow-2xl`,
            };
        });
    }, [count]);
}

// ===== COMPONENT =====
export const FloatingElements = ({ count = 12 }: { count?: number }) => {
    const floatingImages = useRandomFloatingImages(count);

    return (
        <div className="pointer-events-none select-none mx-auto max-w-7xl px-4 pt-[60px] relative h-[800px] md:h-[1200px] z-10">
            {floatingImages.map((item, idx) => (
                <FloatingImage key={idx} {...item} />
            ))}
        </div>
    );
};

const FloatingImage = ({
    url,
    alt,
    start,
    end,
    style,
}: FloatingImageData) => {
    const ref = useRef<HTMLImageElement | null>(null);

    // Scroll Animation (preserved)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`${start}px end`, `end ${end * -1}px`],
    });
    const y = useTransform(scrollYProgress, [0, 1], [start, end]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.17, 1]);

    return (
        <motion.img
            src={url}
            alt={alt}
            ref={ref}
            className={style}
            style={{
                y,
                scale,
                filter: "drop-shadow(0 8px 40px #f6d6b9cc)",
            }}
            draggable={false}
            loading="lazy" // Lazy loading
        />
    );
};
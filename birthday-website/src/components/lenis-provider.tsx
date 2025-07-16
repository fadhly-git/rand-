import { useEffect, useRef } from "react";
import Lenis from "lenis";

type LenisProviderProps = {
    children: React.ReactNode;
    options?: ConstructorParameters<typeof Lenis>[0];
};

export function LenisProvider({ children, options }: LenisProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis(options);
        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{children}</>;
}
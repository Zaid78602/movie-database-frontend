import React from 'react';
import Image from 'next/image';

export const WaveFooter = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none z-[-1]">
            <div className="relative w-full h-[120px] sm:h-[160px] md:h-[220px]">
                {/* Back Wave */}
                <div className="absolute inset-0">
                    <Image
                        src="/wave_bottom_2.png"
                        alt="Back Wave"
                        fill
                        className="object-cover object-bottom opacity-70"
                        priority
                        unoptimized
                    />
                </div>
                {/* Front Wave */}
                <div className="absolute inset-0">
                    <Image
                        src="/wave_bottom_1.png"
                        alt="Front Wave"
                        fill
                        className="object-cover object-bottom"
                        priority
                        unoptimized
                    />
                </div>
            </div>
        </div>
    );
};

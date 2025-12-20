"use client";

import { Tweet } from "react-tweet";

export function ClientTweetCard({ id, className }: { id: string; className?: string }) {
    return (
        <div className={className}>
            <Tweet id={id} />
        </div>
    );
}

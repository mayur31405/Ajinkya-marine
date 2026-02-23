"use client";

import { Suspense } from "react";
import RFQForm from "./RFQForm";

export default function RFQPage() {
    return (
        <Suspense fallback={<div className="py-20 text-center text-navy">Loading...</div>}>
            <RFQForm />
        </Suspense>
    );
}

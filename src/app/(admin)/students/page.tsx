'use client';

import { useState } from "react";
import Button from "@/components/ui/util/button";
import AddStudent from "@/components/student/addStudent";

export default function StudentPage() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="">
                <div className="flex justify-end">
                    <Button className="px-4 py-2 mb-4" onClick={() => setShowModal(true)}>
                        + New Student
                    </Button>
                </div>
                <AddStudent open={showModal} onClose={() => setShowModal(false)} />
            </div>
        </div>
    );
}

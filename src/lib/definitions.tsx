export type Location = {
    path: string;
    name: string;
    icon?: React.ReactNode
}

export type LocationGroup = {
    group: string;
    locations: Location[];
};

export type Nav = (Location | LocationGroup);

export type NoticeType = {
    id: number;
    title: string;
    description: string;
    document_url: string;
    target_timestamp: string;
    expiry_date: string;
    type: string;
    is_urgent: boolean;
    tag: string;
};

export type TestimonialType = {
    id: number;
    message: string;
    image: string;
    name: string;
}

export type User = {
    id: number;
    name: string;
    user_name?: string | null;
    email: string;
    ph_number?: string;
    password?: string;
    email_verified_at?: string | null;
    role: "user" | "alumni" | "admin";
};

export type Batch = {
    id: number;
    course_id: number;
    seq: number | null;
    name: string;
    active: number;
    student_count: number;
};

export type Course = {
    id: number;
    name: string;
    active: number;
    batches: Batch[];
    student_count: number;
};

export type Student = {
    id: number;
    name: string;
    college: string;
    subject: string;
    batches: string;
    has_active: number;
};

export type OrderMapKeys = 'admission' | 'name' | 'college' | 'subject' | 'passout' | 'active';

export type Search = {
    search?: string;
    college?: string;
    subject?: string;
};

export type Filter = {
    course_id?: number;
    batch_id?: number;
    status?: 'Active' | 'Completed' | 'Dropped';
    passout?: {
        from?: number;
        to?: number;
    };
    has_active?: number;
    order_by: [OrderMapKeys, 1 | 0][];
    limit: number;
};

export type Query = Search & Filter & { page?: number };

export type StudentBatch = {
    course_id: number;
    batch_id: number;
    batch_name: string;
    status: string;
};

export type StudentInfo = {
    id: number;
    college: string;
    subject: string;
    photo: string | null;
    address: string | null;
    date_of_birth: string | null;
    facebook_profile: string | null;
    guardian_name: string | null;
    guardian_number: string | null;
    date_of_admission: string | null;
    isAlumni: number;
    date_of_passout: string | null;
    name: string;
    email: string;
    user_name: string;
    ph_number: string;
    batches: StudentBatch[];
};

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { StudentInfo } from '@/lib/definitions';
import NeonFloatInput from '@/components/ui/form/input/neonFloatInput';
import NeonButton from '@/components/ui/util/neonButton';
import { LuSave, LuX } from 'react-icons/lu';
import Portal from '../ui/util/portal';

interface ProfileFormProps {
    profile: StudentInfo;
    onSubmit: (formData: FormData) => Promise<void>;
    setError: (s: string) => void;
    visitor: boolean;
}

const ProfileForm = ({ profile, onSubmit, setError,visitor }: ProfileFormProps) => {
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        address: profile.address ?? '',
        date_of_birth: profile.date_of_birth?.split('T')[0] ?? '',
        facebook_profile: profile.facebook_profile ?? '',
        guardian_name: profile.guardian_name ?? '',
        guardian_number: profile.guardian_number ?? ''
    });
    const fileRef = useRef<HTMLInputElement>(null);
    const onCancel = () => setOpen(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.currentTarget);

        try {
            await onSubmit(form);
            if (fileRef.current) fileRef.current.value = '';
        } catch {
            setError("Unable to ubdate profile");
        } finally {
            setLoading(false);
            onCancel();
        }
    };

    return (
        <Portal open={open && !visitor && !profile?.isUpdated}>
            <form onSubmit={handleSubmit} className="space-y-4 p-5 bg-primary-dark/50 rounded-lg max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <NeonFloatInput
                        id="address"
                        label="Address"
                        name="address"
                        value={formData?.address}
                        onChange={handleChange}
                    />

                    <NeonFloatInput
                        id="date_of_birth"
                        type="date"
                        label="Date of Birth"
                        name="date_of_birth"
                        value={formData?.date_of_birth}
                        onChange={handleChange}
                    />

                    <NeonFloatInput
                        id="facebook_profile"
                        label="Facebook Profile"
                        name="facebook_profile"
                        value={formData?.facebook_profile}
                        onChange={handleChange}
                    />

                    <NeonFloatInput
                        id="guardian_name"
                        label="Guardian Name"
                        name="guardian_name"
                        value={formData?.guardian_name}
                        onChange={handleChange}
                    />

                    <NeonFloatInput
                        id="guardian_number"
                        type='number'
                        label="Guardian Number"
                        name="guardian_number"
                        value={formData?.guardian_number}
                        onChange={handleChange}
                    />

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            Profile Photo
                        </label>
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            ref={fileRef}
                            className="block w-full text-sm
                            file:hidden
                            py-2 px-4 rounded-full
                            bg-white/10 text-primary-fade
                            hover:bg-primary/30"
                        />
                    </div>
                </div>

                <input type="hidden" name="user_name" value={profile?.user_name} />

                <div className="flex justify-end gap-4">
                    <NeonButton
                        type="button"
                        color="danger"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        <LuX /> Cancel
                    </NeonButton>

                    <NeonButton
                        type="submit"
                        color="success"
                        disabled={loading}
                    >
                        <LuSave /> {loading ? 'Saving...' : 'Save Changes'}
                    </NeonButton>
                </div>
            </form>
        </Portal>
    );
};

export default ProfileForm;
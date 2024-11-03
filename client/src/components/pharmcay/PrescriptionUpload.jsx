
import { useState } from 'react';

const PrescriptionUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('prescriptionImage', file);
        await fetch('/api/prescriptions', { method: 'POST', body: formData });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload Prescription</button>
        </form>
    );
};
export default PrescriptionUpload;

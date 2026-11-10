type Doctor = {
    id: string,
    userId: string,
    licenseNumber: number,
    licenseExpiry: string,
    school: string,
    hospital: string,
    education: null,
    status: "APPROVED" | "PENDING" | "REJECTED",
    reviewedAt: null,
    createdAt: string
}

export interface DoctorData {
  doctors: Doctor[];
}
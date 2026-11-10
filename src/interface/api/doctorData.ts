import type { UserData } from "./userData";

type Expertise = {
  id: string,
  name: string,
  description: string
}

export type Doctor = {
    id: string,
    userId: string,
    licenseNumber: number,
    licenseExpiry: string,
    school: string,
    hospital: string,
    education: null,
    status: "APPROVED" | "PENDING" | "REJECTED",
    reviewedAt: null,
    createdAt: string,
    user: UserData,
    expertise: Expertise[]
}

export interface DoctorData {
  data: Doctor[];
}
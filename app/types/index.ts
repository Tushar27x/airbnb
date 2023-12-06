import { Listing, Reservations, User } from "@prisma/client";

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string;
}
export type SafeReservation = Omit<Reservations, "createdAt" | "endDate" | "startDate" | "listing"> & {
    createdAt: string;
    endDate: string;
    startDate: string;
    listing: SafeListing;
}
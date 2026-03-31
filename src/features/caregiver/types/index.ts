// src/features/caregiver/types/index.ts

export interface SitterStats {
  pendingRequests: number;
  confirmedBookings: number;
  monthlyEarnings: number;
  averageRating: number;
}

export interface BookingRequest {
  id: string;
  petName: string;
  ownerName: string;
  dates: string;
  serviceType: string;
  earnings: number;
  petAvatar: string;
}

export interface UpcomingAppointment {
  id: string;
  petName: string;
  service: string;
  time: string;
  petAvatar: string;
}

export interface CaretakerService {
  id: string;
  title: string;
  price: string;
  icon: React.ElementType;
}

export interface CaretakerDashboardData {
  stats: SitterStats;
  requests: BookingRequest[];
  appointments: UpcomingAppointment[];
  services: CaretakerService[];
}
